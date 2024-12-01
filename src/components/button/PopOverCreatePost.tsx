import { Box, Button, Flex, Image, Input} from "@chakra-ui/react"
import FileAddIcon from "components/icons/FileAddIcon"
import { PopoverBody, PopoverCloseTrigger, PopoverContent, PopoverRoot, PopoverTrigger } from "components/ui/popover"

interface Transform {
  transform:string
}

const PopoverCreatePost: React.FC<Transform> = ({transform}) => {
  return (
    <PopoverRoot >
      <PopoverTrigger asChild>
        <Box textAlign="left" width="69%">
          <Button  textAlign="left"  background="none" borderRadius="20px" cursor="text" color="gray.300" fontWeight="normal" fontSize="18px" width="full" justifyContent="flex-start" >What is happening?</Button>
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
              <Box position="relative">
                <Flex borderBottom="1px solid" borderColor="gray.300" pb="50px">
                  <Image
                      src="https://images8.alphacoders.com/129/1290002.png"
                      boxSize="40px"
                      borderRadius="full"
                      fit="cover"
                      alt=""
                  />
                  <Input placeholder="What is Happening?" outline="none" border="none" fontSize="18px" marginLeft="10px" width="67%"/> 
                </Flex>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box cursor="pointer">
                <FileAddIcon/>
              </Box>  
              <Button rounded="50px" backgroundColor="#04A51E" color="#FFFF" _hover={{backgroundColor: "#006811"}}>Post</Button>
            </Box> 
          </PopoverBody>
          <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}

export default PopoverCreatePost


