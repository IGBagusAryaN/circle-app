import { Box, Image, Text } from "@chakra-ui/react"
import ButtonPrimary from "components/button/Button"
import PopoverCreatePost from "components/button/PopOverCreatePost"
import CommentIcon from "components/icons/CommentIcon"
import FileAddIcon from "components/icons/FileAddIcon"
import HeartIcon from "components/icons/HeartIcon"
import { Link } from "react-router-dom"


const user = [
    {
        id: 1,
        profile: "https://media.tenor.com/cAGJcxxxeycAAAAe/lindbergh-lindbergh-one-piece.png",
        name: "Lindhberg",
        account: "@lindhbergrevolutioner",
        comment:"ASL trio in their chibi prime: Luffy looking confused, Ace ready to fight, and Sabo pretending he's the brains of the group😂",
        picture:"https://i.pinimg.com/originals/28/09/80/28098079205e97162501ec377292bb48.jpg"
    },
    {
        id: 2,
        profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0w8Fb0eL5EB7kNviLUOUTxXfFtUxnVNHfA&s",
        name: "Luffy",
        account: "@mugiwaranoluffy",
        comment:"I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!"
    },
    {
        id: 3,
        profile: "https://www.clipartmax.com/png/middle/203-2032723_one-piece-clipart-franky-franky-one-piece-png.png",
        name: "Franky",
        account: "@frankycolala",
        comment:"Wow, this looks stunning! The details and composition are just perfect. 👏✨",
        picture: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/24/2389002419.jpg"
    },
    {
        id: 4,
        profile: "https://images.alphacoders.com/138/thumb-1920-1381546.png",
        name: "Brook",
        account: "@brook_",
        comment:"Yohohoho! Let the soul-stirring melody sail through the seas! 🎶☠️ Brook’s music hits the heart, even without one!🎻🎤",
    },
    {
        id: 5,
        profile: "https://cdn.idntimes.com/content-images/community/2022/06/roronoza-zoro-statue-in-japan-cropped-56965fbaa68adf470a17cc45ea5d328d-0817f04bc75ff0168ca600323d03770c_600x400.jpg",
        name: "Zoro",
        account: "@roronoazoro",
        comment:"This painting is sharp and precise... almost as sharp as my blades. Impressive work!🗡️🎨",
        picture: "https://jabarupdate.id/wp-content/uploads/2024/01/IMG-20240129-WA0002.jpg"
    },
]

function HomeMiddleBar() {
  return (
    <div>
        <Box borderBottom="1px solid" borderColor="gray.400">
            <Box px="20px">
                <Text fontSize="18px" fontWeight="semibold">Home</Text>
                <Box py="20px" display="flex" alignItems="center" >
                <Image
                    src="https://images8.alphacoders.com/129/1290002.png"
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                    alt=""
                />
                {/* <Input placeholder="What is Happening?" outline="none" border="none" fontSize="18px" marginLeft="10px" width="67%"/> */}
                <PopoverCreatePost transform="translate(-42%, 0%)"/>
                <Box display="flex" alignItems="center" gap="3" >
                    <Box cursor="pointer">
                     <FileAddIcon/>
                    </Box>                 
                    <ButtonPrimary text="Post"/>
                </Box>
                </Box>
            </Box>
        </Box>
        {user.map((user)=>{
         return(
        <Box borderBottom="1px solid" borderColor="#Ffff"key={user.id}>
            <Box p="20px">
                <Box display="flex" alignItems="start" gap="3" >
                    <Image
                        src={user.profile}
                        boxSize="40px"
                        borderRadius="full"
                        fit="cover"
                        alt=""
                    />
                    <Box display="flex" flexDirection="column">
                        <Box display="flex" gap="2">
                            <Link to={`/profile/${user.id}`} className="font-semibold">{user.name}</Link>
                            <Text color="gray.400">{user.account}<span> • 17d</span></Text>
                        </Box>
                        <Link to={`/comment/${user.id}`}>
                            <Text fontSize="14px" marginTop="2">
                                {user.comment}
                            </Text>
                            {user.picture &&  <img src={user.picture} alt="" className="rounded-lg w-6/12 my-2"/>}
                        </Link>
                        <Box>
                            <Box marginTop="2" display="flex" alignItems="center" gap="3">
                                <Text display="flex" alignItems="center" gap="1">
                                <HeartIcon hover="text-[#ff4040] hover:"/>
                                <span className="text-[12px]">36 Likes</span>
                                </Text>
                                <Link to={`/comment/${user.id}`} className="flex items-center gap-1 hover:text-[#817b7b]">
                                    <CommentIcon/>
                                    <span className="text-[12px] ">10 Replies</span>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        )
        })
        }
    </div>
  )
}

export default HomeMiddleBar
