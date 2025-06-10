import { Box, Button, Input, Image, Text, Spinner } from '@chakra-ui/react';
import FileAddIcon from 'components/icons/FileAddIcon';

interface PostInputBoxProps {
  content: string;
  setContent: (value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePost: () => void;
  isLoading: boolean;
  previewImage: string | null;
  profileImage?: string | null; // Tambahkan props untuk profile image
}

const PostInputBox: React.FC<PostInputBoxProps> = ({
  content,
  setContent,
  handleFileChange,
  handlePost,
  isLoading,
  previewImage,
  profileImage, // Terima profile image
}) => {
  return (
    <Box>
      <Box>
          <Text fontSize="18px" fontWeight="semibold">Home</Text>
          <Box py="20px" display="flex" alignItems="center" gap="4">
            {profileImage ? (
              <Image
                src={profileImage}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="User Profile"
              />
            ) : (
              <Image
                src="/default-profile.jpg"
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="Default Profile"
              />
            )}
       
            <Box textAlign="left" width="69%">
              <Input
                placeholder="What is happening?"
                outline="none"
                border="none"
                fontSize="18px"
                p={0}
                width="full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Box>
            <Box display="flex" alignItems="center" gap="3">
              <Box position="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  opacity="0"
                  cursor="pointer"
                />
                <FileAddIcon cursor="pointer" />
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
          </Box>
          {previewImage && (
            <Box mt="10px" textAlign="center">
              <Image
                src={previewImage}
                alt="Preview"
                borderRadius="10px"
                width={400}
                height={200}
                ml={'55px'}
                objectFit="cover"
                mb={10}
              />
            </Box>
          )}
      
        </Box>
    </Box>
  );
};

export default PostInputBox;
