import { Box, Flex, Image, Text } from '@chakra-ui/react'
import PopoverEditProfile from 'components/button/PopOverEditProfile'
import React from 'react'

const user = [
    {
        profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0w8Fb0eL5EB7kNviLUOUTxXfFtUxnVNHfA&s",
        name:"Luffy",
        account:"@mugiwaranoluffy",
        status:"Following"
    },
    {
        profile:"https://i.pinimg.com/736x/74/82/54/74825475af446f8bc36fd2aa4051d885.jpg",
        name:"Karasu",
        account:"@karasiuuu",
        status:"Follow"
    },
    {
        profile:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b50bcbd4-0fbe-4176-9ebb-8dbb14d56509/dgpqjih-698c68c5-f9c6-4ba9-8e18-537f7b4aafe4.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2I1MGJjYmQ0LTBmYmUtNDE3Ni05ZWJiLThkYmIxNGQ1NjUwOVwvZGdwcWppaC02OThjNjhjNS1mOWM2LTRiYTktOGUxOC01MzdmN2I0YWFmZTQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wBLqfH_-z5vwlGePzxmCO6uFVpf2L60gkp0kK07HeM0",
        name:"Sanji",
        account:"@kuroashinosanji",
        status:"Follow"
    },

]

interface DisplaySideBar {
    display: string
}

const SideBarRight: React.FC<DisplaySideBar> =({display}) => {
  return (
    <div>
      <Box>
            <Box p="20px">
                <Box backgroundColor="#262626" borderRadius="5px" display={display}>
                    <Box p="5">
                        <Text textAlign="left">My Profile</Text>
                        <Box position="relative" mt="3">
                        <Image
                            height="100px" w="full" borderRadius="7px"
                            src="https://www.superherotoystore.com/cdn/shop/articles/Whitebeard.Pirates.full.1766119_1280x.jpg?v=1712676177"
                            />
                        <Image
                            src="https://images8.alphacoders.com/129/1290002.png"
                            boxSize="80px"
                            borderRadius="full"
                            fit="cover"
                            alt=""
                            position="absolute"
                            top="57px"
                            left="10px"
                            border="4px solid"
                            borderColor="whiteAlpha.900"
                        />
                        <Box textAlign="right">
                            <PopoverEditProfile transform="translate(-115%, -41%)"/>
                        </Box>
                        </Box>
                        <Box>
                            <Text textAlign="left" mt="2" fontSize="20px" fontWeight="bold">Bagus Arya</Text>
                            <Text textAlign="left" fontSize="12px" color="gray.400">@bagusarya87</Text>
                            <Text textAlign="left" fontSize="14px">Lorem ipsum dolor sit amet consec </Text>
                            <Flex mt="4" gap="3">
                                <Text fontWeight="bold" fontSize="14px">291<span className="font-normal text-gray-400 ms-1">Following</span></Text>
                                <Text fontWeight="bold" fontSize="14px">29<span className="font-normal text-gray-400 ms-1">Followers</span></Text>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
                <Box backgroundColor="#262626" borderRadius="5px" mt="2">
                    <Box p="5">
                    <Text textAlign="left">Suggested For you</Text>
                    {user.map((user, i)=>{
                        return(
                        <Flex mt="3" justify="space-between" key={i}>
                        <Flex>
                                <Image
                                    src={user.profile}
                                    boxSize="40px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Naruto Uzumaki"
                                />
                                <Box ml="2">
                                    <Text textAlign="left" fontSize="14px" fontWeight="semibold">{user.name}</Text>
                                    <Text textAlign="left" fontSize="12px" color="gray.400">{user.account}</Text>
                                </Box>
                        </Flex>
                            <button className={`border border-[#FFFF] px-3 rounded-[20px] cursor-pointer text-[#FFFF] bg-none text-[12px] font-semibold  hover:text-black ${user.status === 'Following' ? 'border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-[#FFFF]' : 'text-[#FFFF] border-[#FFFF] hover:bg-[#FFFF]'}` }> {user.status}</button>
                        </Flex>)
                    })}

                    </Box>
                </Box>
                <Box backgroundColor="#262626" borderRadius="5px" mt="2">
                    <Box p="5">
                    <Text textAlign="left" fontSize="14px">Developed By <span className="font-bold">Bagus Arya👋</span></Text>
                    <Text textAlign="left" fontSize="10px">Powered by Dumbways Indonesia • #1 Coding Bootcamp</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default SideBarRight
