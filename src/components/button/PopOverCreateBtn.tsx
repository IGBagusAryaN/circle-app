import { Box, Button, Flex, Image, Input } from '@chakra-ui/react';
import FileAddIcon from 'components/icons/FileAddIcon';
import UseAccountStore from 'components/store/UseAccountStore';
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'components/ui/popover';

interface Transform {
  transform: string;
}

const PopoverCreateBtn: React.FC<Transform> = ({ transform }) => {
  const { account } = UseAccountStore();
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          type="submit"
          rounded="50px"
          backgroundColor="#04A51E"
          width="full"
          color="#FFFF"
          _hover={{
            backgroundColor: '#006811',
          }}
        >
          Created Post
        </Button>
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
            <Box position="relative">
              <Flex borderBottom="1px solid" borderColor="gray.300" pb="50px">
                <Image
                  src={
                    account?.profileImage ||
                    'https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg'
                  }
                  boxSize="40px"
                  borderRadius="full"
                  fit="cover"
                  alt=""
                />
                <Input
                  placeholder="What is Happening?"
                  outline="none"
                  border="none"
                  fontSize="18px"
                  marginLeft="10px"
                  width="67%"
                />
              </Flex>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box cursor="pointer">
              <FileAddIcon />
            </Box>
            <Button
              rounded="50px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: '#006811' }}
            >
              Post
            </Button>
          </Box>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverCreateBtn;
