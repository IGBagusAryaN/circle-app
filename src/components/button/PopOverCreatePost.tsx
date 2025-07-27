import { Box, Button, Flex, Image, Input, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import FileAddIcon from 'components/icons/FileAddIcon';
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'components/ui/popover';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { apiURL } from 'utils/baseurl';
import { ThreadTypes } from 'types/threads.types';
import { useProfileStore } from 'store/use.profile.store';
import Swal from 'sweetalert2';
import useThreadStore from 'store/use.thread.store';

interface Transform {
  transform: string;
  trigger: React.ReactNode;
}

const PopoverCreateBtn: React.FC<Transform> = ({ transform, trigger }) => {
  const [content, setContent] = useState(''); 
  const [file, setFile] = useState<File | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const { profile, retrieveUserProfile } = useProfileStore(); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { addThread } = useThreadStore();

  useEffect(() => {
    retrieveUserProfile(); 
  }, [retrieveUserProfile]);

 const handlePost = async () => {
    if (!content.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'Konten tidak boleh kosong.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('content', content);
    if (file) {
      formData.append('image', file);
    }

    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Pengguna tidak terautentikasi.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiURL}thread`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const threadData = response.data.thread;

      const newThread: ThreadTypes = {
        id: threadData.id,
        content: threadData.content,
        createdAt: new Date(threadData.createdAt),
        updateAt: new Date(threadData.updatedAt),
        userId: threadData.userId || 0,
        authorId: threadData.authorId || 0,
        image: threadData.image || '',
        profile: threadData.profile, 
        author: threadData.author, 
      };

      if (!threadData.profile || typeof threadData.profile !== 'object') {
        console.error('Data profile tidak valid:', threadData.profile);
      }

      if (!threadData.author || typeof threadData.author !== 'object') {
        console.error('Data author tidak valid:', threadData.author);
      }

      addThread(newThread); // Tambahkan thread baru ke state

      setContent('');
      setFile(null);

      Swal.fire({
        title: 'Success!',
        text: 'Thread Post Successfully.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Gagal membuat thread.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFile(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        overflowY="auto"
        width="80vh"
        maxHeight="90vh"
        position="fixed"
        top="50%"
        left="50%"
        transform={transform}
        zIndex="1000"
        borderRadius="10px"
        boxShadow="lg"
        background="#1D1D1D"
      >
        <PopoverBody>
          <Box my="20px">
            <Flex borderBottom="1px solid" borderColor="gray.300" pb="30px">
              {profile ? (
                <Image
                  src={profile.profile?.[0]?.profileImage || '/default-profile.jpg'}
                  boxSize="40px"
                  borderRadius="full"
                  fit="cover"
                  alt={profile.profile?.[0]?.fullname || 'Foto Profil'}
                />
              ) : (
                <Box />
              )}
              <Input
                placeholder="What is happening?"
                outline="none"
                border="none"
                fontSize="18px"
                marginLeft="10px"
                width="full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Flex>
          </Box>
          {previewImage && (
            <Box my="13px">
              <Image
                src={previewImage}
                alt="Preview"
                boxSize="150px"
                objectFit="cover"
                borderRadius="10px"
                width={200}
                h={120}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Input
                type="file"
                display="none"
                id="file-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button as="span" border="none" background="none" size="lg" p={0}>
                  <FileAddIcon />
                </Button>
              </label>
            </Box>
            <Button
              rounded="50px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: '#006811' }}
              onClick={handlePost}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : 'Post'}
            </Button>
          </Box>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverCreateBtn;
