import { Box, Flex, Image, Text } from '@chakra-ui/react'
import PopoverEditProfile from 'components/button/PopOverEditProfile'
import UseAccountStore from 'components/store/UseAccountStore'
import { UseFollowStore } from 'components/store/UseFollowStore'
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
    const { account } = UseAccountStore();
    const { following } = UseFollowStore();
  return (
    <div>
      <Box>
        <Box p="20px">
            <Box backgroundColor="#262626" borderRadius="5px" display={display}>
            <Box p="5">
      <Text textAlign="left" fontSize="24px" fontWeight="bold">My Profile</Text>
      <Box position="relative" mt="3">
        {/* Gambar Banner */}
        <Image
          height="100px"
          w="full"
          borderRadius="7px"
          src={account?.bannerImage || "https://cdn-green.katadata.co.id/media/images/2023/ilustrasi_aurora_2024_05_16_01_32_36.jpg"} // Gunakan bannerImage dari store jika ada
        />
        {/* Gambar Profil */}
        <Image
          src={account?.profileImage || "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"} // Gunakan profileImage dari store jika ada
          boxSize="80px"
          borderRadius="full"
          fit="cover"
          alt="Profile Image"
          position="absolute"
          top="57px"
          left="10px"
          border="4px solid"
          borderColor="whiteAlpha.900"
        />
        {/* Tombol Edit Profile */}
        <Box textAlign="right">
          <PopoverEditProfile transform="translate(-115%, -41%)" />
        </Box>
      </Box>

      <Box mt="5">
        {/* Nama Pengguna */}
        <Text textAlign="left" fontSize="20px" fontWeight="bold">
          {account?.fullName || "Your Name"}
        </Text>
        {/* Username */}
        <Text textAlign="left" fontSize="12px" color="gray.400">
          @{account?.username || "username"} {/* Menggunakan username dari store */}
        </Text>
        {/* Bio */}
        <Text textAlign="left" fontSize="14px">
          {account?.bio || "Your bio here..."} {/* Menggunakan bio dari store */}
        </Text>

        {/* Statistika Pengguna */}
        <Flex mt="4" gap="3">
          <Text fontWeight="bold" fontSize="14px">
          {account?.following || 0}
            <span className="font-normal text-gray-400 ms-1">Following</span>
          </Text>
          <Text fontWeight="bold" fontSize="14px">
            {account?.followers || 0}
            <span className="font-normal text-gray-400 ms-1">Followers</span>
          </Text>
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
