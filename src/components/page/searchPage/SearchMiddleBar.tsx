import { Box, Flex, HStack, Image, Input, Text } from "@chakra-ui/react"
import { InputGroup } from "components/ui/input-group"
import { LuSearch } from "react-icons/lu"


function SearchMiddleBar() {
  return (
    <div>
        <HStack gap="10" width="full" px="5" pt="2">
            <InputGroup
                flex="1"
                startElement={<LuSearch />}
            >
                <Input placeholder="Search contacts" background="#3F3F3F"  borderRadius="20px"/>
            </InputGroup>
            </HStack>

            <Flex mt="3" justify="space-between" px="5">
                        <Flex>
                                <Image
                                    src="https://static.wikia.nocookie.net/4250fa57-11d4-44b6-87cd-d454c37cb0a0/scale-to-width/755"
                                    boxSize="40px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Naruto Uzumaki"
                                />
                                <Box ml="2">
                                    <Text textAlign="left" fontSize="14px" fontWeight="semibold">Cavendish</Text>
                                    <Text textAlign="left" fontSize="12px" color="gray.400">@cavendishakuba</Text>
                                </Box>
                        </Flex>
                            <button className="border border-[#FFFF] px-3 rounded-[20px] cursor-pointer text-[#FFFF] bg-none text-[12px] font-semibold hover:bg-[#FFFF] hover:text-black ">Follow</button>
                        </Flex>
    </div>
  )
}

export default SearchMiddleBar
