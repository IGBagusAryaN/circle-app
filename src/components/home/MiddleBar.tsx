import { Box, Image, Input, Text } from "@chakra-ui/react"
import ButtonPrimary from "components/button/Button"


const user = [
    {
        profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0w8Fb0eL5EB7kNviLUOUTxXfFtUxnVNHfA&s",
        name: "Luffy",
        account: "@mugiwaranoluffy",
        comment:"I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!"
    },
    {
        profile: "https://www.clipartmax.com/png/middle/203-2032723_one-piece-clipart-franky-franky-one-piece-png.png",
        name: "Franky",
        account: "@frankycolala",
        comment:"Wow, this looks stunning! The details and composition are just perfect. 👏✨",
        picture: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/24/2389002419.jpg"
    },
    {
        profile: "https://images.alphacoders.com/138/thumb-1920-1381546.png",
        name: "Brook",
        account: "@brook_",
        comment:"Yohohoho! Let the soul-stirring melody sail through the seas! 🎶☠️ Brook’s music hits the heart, even without one!🎻🎤",
    },
    {
        profile: "https://cdn.idntimes.com/content-images/community/2022/06/roronoza-zoro-statue-in-japan-cropped-56965fbaa68adf470a17cc45ea5d328d-0817f04bc75ff0168ca600323d03770c_600x400.jpg",
        name: "Zoro",
        account: "@roronoazoro",
        comment:"This painting is sharp and precise... almost as sharp as my blades. Impressive work!🗡️🎨",
        picture: "https://jabarupdate.id/wp-content/uploads/2024/01/IMG-20240129-WA0002.jpg"
    },
]

function MiddleBar() {
  return (
    <div>
      <Box borderBottom="1px solid" borderColor="gray.400">
                <Box px="20px">
                    <Text fontSize="18px" fontWeight="semibold">Home</Text>
                    {/* Typing section */}
                    <Box py="20px" display="flex" alignItems="center" >
                    <Image
                        src="https://images8.alphacoders.com/129/1290002.png"
                        boxSize="40px"
                        borderRadius="full"
                        fit="cover"
                        alt=""
                    />
                    <Input placeholder="What is Happening?" outline="none" border="none" fontSize="18px" marginLeft="10px" width="67%"/>
                    <Box display="flex" alignItems="center" gap="4" >
                        <Box>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer hover:text-[#60d774]">
                            <path fillRule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z" clipRule="evenodd" />
                        </svg>   
                        </Box>
                                          
                        <ButtonPrimary text="Post"/>
                    </Box>
                    </Box>

                    {/* Props typing */}
                </Box>
            </Box>
                {user.map((user)=>{
                        return(
                            <Box borderBottom="1px solid" borderColor="#Ffff">
                <Box p="20px">
                        <Box display="flex" alignItems="start" gap="3">
                            <Image
                                src={user.profile}
                                boxSize="40px"
                                borderRadius="full"
                                fit="cover"
                                alt=""
                            />
                            <Box display="flex" flexDirection="column">
                                <Box display="flex" gap="2">
                                    <Text fontWeight="semibold">{user.name}</Text>
                                    <Text color="gray.400">{user.account}<span> • 17d</span></Text>
                                </Box>
                                <Box>
                                    <Text fontSize="14px" marginTop="2">
                                        {user.comment}
                                    </Text>
                                    {user.picture &&  <img src={user.picture} alt="" className="rounded-lg w-6/12 my-2"/>}
                                </Box>
                                <Box>
                                    <Box marginTop="2" display="flex" gap="3">
                                        <Text display="flex" alignItems="center" gap="1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 cursor-pointer hover:text-[#ff4040]">
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                        </svg>
                                        <span className="text-[12px]">36</span>
                                        </Text>
                                        <Text display="flex" alignItems="center" gap="1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 cursor-pointer hover:text-[#514d4d]">
                                            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[12px]">36</span>
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        </Box>
                        </Box>
                        )
                    })}
    </div>
  )
}

export default MiddleBar
