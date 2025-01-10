import { Box, Button, Flex, Image, Input, Spinner } from "@chakra-ui/react";
import FileAddIcon from "components/icons/FileAddIcon";
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "components/ui/popover";
import { createReply } from "features/dashboard/services/reply.services";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProfileStore } from "store/use.profile.store";


interface PopoverCreateReplyProps {
  transform: string; 
  parentThreadId: number; 
  onNewReply?: (newReply: any) => void; 
}

const PopoverCreateReply: React.FC<PopoverCreateReplyProps> = ({
  transform,
  parentThreadId,
  onNewReply,
}) => {
  const [content, setContent] = useState(""); 
  const [file, setFile] = useState<File | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const { profile } = useProfileStore(); 
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleReply = async () => {
    if (!content.trim()) {
      toast.error('Content must be filled')
      return;
    }

    setIsLoading(true); 

    const formData = new FormData();
    formData.append("content", content); 
    if (file) {
      formData.append("image", file); 
    }

    try {
      const newReply = await createReply(parentThreadId, formData); //api
      if (onNewReply) {
        onNewReply(newReply); 
      }

      setContent(""); 
      setFile(null);
      setPreviewImage(null);

      toast.success('Reply successfully created!');
    } catch (error: any) {
      toast.error('Reply failed to create!');
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
      <PopoverTrigger asChild>
        <Box textAlign="left" width="64%">
          <Button
            textAlign="left"
            background="none"
            borderRadius="20px"
            cursor="pointer"
            color="gray.300"
            fontWeight="normal"
            fontSize="18px"
            justifyContent="flex-start"
            width={"full"}
            px={0}
          >
            <FileAddIcon />
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
            <Flex borderBottom="1px solid" borderColor="gray.300" pb="30px">
              {profile ? (
                <Image
                  src={profile.profile?.[0]?.profileImage || "/default-profile.jpg"}
                  boxSize="40px"
                  borderRadius="full"
                  fit="cover"
                  alt={profile.profile?.[0]?.fullname || "Foto Profil"}
                />
              ) : (
                <Box />
              )}
              <Input
                placeholder="Write your reply..."
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
                width={400}
                h={200}
              />
            </Box>
          )}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Input
                type="file"
                display="none"
                id="file-upload-reply"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload-reply">
                <Button as="span" border="none" background="none" size="lg" p={0}>
                  <FileAddIcon />
                </Button>
              </label>
            </Box>
            <Button
              rounded="50px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: "#006811" }}
              onClick={handleReply}
              disabled={isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Reply"}
            </Button>
          </Box>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverCreateReply;
