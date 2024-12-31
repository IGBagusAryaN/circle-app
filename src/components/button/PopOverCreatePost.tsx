import { Box, Button, Flex, Image, Input, Spinner } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
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


interface PopoverCreatePostProps {
  transform: string; // Properti untuk posisi transform
  onNewThread?: (newThread: ThreadTypes) => void; // Callback saat thread baru dibuat
}

const PopoverCreatePost: React.FC<PopoverCreatePostProps> = ({ transform, onNewThread }) => {
  const [content, setContent] = useState(''); // State untuk konten postingan
  const [file, setFile] = useState<File | null>(null); // State untuk file yang diunggah
  const [isLoading, setIsLoading] = useState(false); // State untuk indikator loading
  const { profile, retrieveUserProfile } = useProfileStore(); // Ambil data profil pengguna

  useEffect(() => {
    retrieveUserProfile(); // Ambil profil pengguna saat komponen dimuat
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

    setIsLoading(true); // Tampilkan loading

    const formData = new FormData();
    formData.append('content', content); // Tambahkan konten ke form data
    if (file) {
      formData.append('image', file); // Tambahkan file jika ada
    }

    const token = Cookies.get('token'); // Ambil token pengguna
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

      const newThread: ThreadTypes = {
        id: response.data.thread.id,
        content: response.data.thread.content,
        createdAt: new Date(response.data.thread.createdAt),
        updateAt: new Date(response.data.thread.updatedAt),
        userId: response.data.thread.userId || 0,
        authorId: response.data.thread.authorId || 0,
        image: response.data.thread.image || '',
        profile: {
          id: response.data.thread.profile?.[0]?.id || 0,
          fullname: response.data.thread.profile?.[0]?.fullname || 'Pengguna Tidak Diketahui',
          profileImage:
            response.data.profile?.profileImage || '/default-profile.jpg',
        },
        author: {
          id: response.data.author?.id || 0,
          username: response.data.author?.username || 'unknown',
        },
      };

      if (onNewThread) {
        onNewThread(newThread); // Panggil callback jika ada
      }

      setContent(''); // Reset input
      setFile(null);

      Swal.fire({
        title: 'Berhasil!',
        text: 'Thread Anda telah diposting.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Gagal membuat thread:', error.response?.data?.message);
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message || 'Gagal membuat thread.',
          icon: 'error',
          confirmButtonColor: '#E53E3E',
          background: '#1D1D1D',
          color: '#fff',
        });
      } else if (error instanceof Error) {
        console.error('Gagal membuat thread:', error.message);
        Swal.fire({
          title: 'Error',
          text: error.message || 'Gagal membuat thread.',
          icon: 'error',
          confirmButtonColor: '#E53E3E',
          background: '#1D1D1D',
          color: '#fff',
        });
      }
    } finally {
      setIsLoading(false); // Sembunyikan loading
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Box textAlign="left" width="64%">
          <Button
            textAlign="left"
            background="none"
            borderRadius="20px"
            cursor="text"
            color="gray.300"
            fontWeight="normal"
            fontSize="18px"
            justifyContent="flex-start"
            width={'full'}
            px={0}
          >
            Apa yang sedang terjadi?
          </Button>
        </Box>
      </PopoverTrigger>
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
            <Flex borderBottom="1px solid" borderColor="gray.300" pb="50px">
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
                placeholder="Apa yang sedang terjadi?"
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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Input
                type="file"
                display="none"
                id="file-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
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

export default PopoverCreatePost;
