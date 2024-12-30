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
  onNewThread?: (newThread: ThreadTypes) => void;
  transform: string;
}

const PopoverCreatePost: React.FC<PopoverCreatePostProps> = ({
  onNewThread,
  transform,
}) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { profile, retrieveUserProfile } = useProfileStore();

  useEffect(() => {
    retrieveUserProfile();
  }, []);

  const handlePost = async () => {
    if (!content.trim()) {
      alert('Content is required');
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
      alert('User is not authenticated');
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

      console.log('API Response (Create Thread):', response.data);

      const newThread: ThreadTypes = {
        id: response.data.id,
        content: response.data.content,
        createdAt: new Date(response.data.createdAt),
        updateAt: new Date(response.data.updatedAt),
        userId: response.data.userId,
        authorId: response.data.authorId,
        image: response.data.image,
        profile: {
          id: response.data.profile?.id || 0,
          fullname: response.data.profile?.fullname || 'Unknown User',
          profileImage:
            response.data.profile?.profileImage || 'default-profile.jpg',
        },
        author: {
          id: response.data.author?.id || 0,
          username: response.data.author?.username || 'unknown',
        },
      };

      if (onNewThread) {
        console.log('New Thread Data:', newThread);
        onNewThread(newThread);
      }

      setContent('');
      setFile(null);

      Swal.fire({
        title: 'Success!',
        text: 'Your thread has been posted.',
        icon: 'success',
        confirmButtonColor: '#04A51E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error creating thread:', error.response?.data?.message);
        alert(error.response?.data?.message || 'Failed to create thread');
      } else if (error instanceof Error) {
        console.error('Error creating thread:', error.message);
        alert(error.message || 'Failed to create thread');
      }
      setIsLoading(false);
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
          >
            What is happening?
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
                  src={`${apiURL}/uploads/${profile.profile?.[0]?.profileImage}`}
                  boxSize="40px"
                  borderRadius="full"
                  fit="cover"
                  alt="Profile Image"
                />
              ) : (
                <Box />
              )}
              <Input
                placeholder="What is Happening?"
                outline="none"
                border="none"
                fontSize="18px"
                marginLeft="10px"
                width="67%"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Flex>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Input
                type="file"
                display="none"
                id="file-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="file-upload">
                <Button
                  as="span"
                  border="none"
                  background="none"
                  size="lg"
                  p={0}
                >
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
