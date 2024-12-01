import { Box, Button, Image, Input, Text, Textarea } from "@chakra-ui/react"
import { Field } from "components/ui/field"
import { PopoverBody, PopoverCloseTrigger, PopoverContent, PopoverRoot, PopoverTrigger } from "components/ui/popover"

interface Transform {
  transform:string
}

const PopoverEditProfile: React.FC<Transform> = ({transform}) => {
  return (
    <PopoverRoot >
      <PopoverTrigger asChild>
        <Button right="0" mt="3" border="1px solid" borderColor="#FFFF" background="none" color="#FFFF" borderRadius="20px" _hover={{background:"#FFFF", color:"black"}}>Edit Profile</Button>
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
            <Text fontSize="18px">Edit Profile</Text>
            <Box my="20px">
              <Box position="relative">
              <Image
                height="120px"
                w="full"
                borderRadius="7px"
                src="https://www.superherotoystore.com/cdn/shop/articles/Whitebeard.Pirates.full.1766119_1280x.jpg?v=1712676177"
              />
              <Image
                src="https://images8.alphacoders.com/129/1290002.png"
                boxSize="80px"
                borderRadius="full"
                fit="cover"
                alt=""
                position="absolute"
                top="77px"
                left="10px"
                border="4px solid"
                borderColor="whiteAlpha.900"
              />
              </Box>
              <Box>
                <Field label="Name" mt="70px">
                  <Input placeholder="Change your name" />
                </Field>
                <Field label="Username" mt="10px">
                  <Input placeholder="Change your username" />
                </Field>
                <Field label="Bio" mt="10px">
                  <Textarea placeholder="Change your bio" />
                </Field>
              </Box>  
            </Box>
            <Box textAlign="right">
            <Button rounded="50px" backgroundColor="#04A51E" color="#FFFF" _hover={{backgroundColor: "#006811"}}>Save</Button>
            </Box>
          </PopoverBody>
          <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}

export default PopoverEditProfile

