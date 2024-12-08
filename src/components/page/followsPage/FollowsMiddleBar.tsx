import { Box, Flex, Image, Tabs, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"


function FollowsMiddleBar() {
    return (
        <div>
            <Box py="2" px="5">
                <Text fontSize="18px" fontWeight="semibold">Follows</Text>  
                <Tabs.Root mt="2">
                    <Box width="100%">
                        <Tabs.List display="flex" justifyContent="center" width="100%">
                        <Box width="full" textAlign="center">
                            <Tabs.Trigger
                            value="first"
                            style={{
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "40px"
                                
                            }}
                            >
                            Followers
                            </Tabs.Trigger>
                        </Box>
                        <Box width="full" textAlign="center">
                            <Tabs.Trigger
                            value="second"
                            style={{
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "40px"
                            }}
                            
                            >
                            Following
                            </Tabs.Trigger>
                        </Box>
                        </Tabs.List>
                    </Box>
                    <Tabs.Content value="first">
                    <Box>
                        <Box py="2">
                        <Flex mt="3" justify="space-between">
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
                        </Box>
                    </Box>
                    </Tabs.Content>
                    <Tabs.Content value="second">
                    <Box>
                        <Box py="2">
                        <Flex mt="3" justify="space-between">
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
                            <button className="border border-[#FFFF] px-3 rounded-[20px] cursor-pointer text-[#FFFF] bg-none text-[12px] font-semibold hover:bg-[#FFFF] hover:text-black ">Following</button>
            </Flex>
                        </Box>
                    </Box>
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </div>
    )
}

export default FollowsMiddleBar