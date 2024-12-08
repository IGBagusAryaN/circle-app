import { Box, Flex, Image, Input, Text } from "@chakra-ui/react"
import ButtonPrimary from "components/button/Button"
import CommentIcon from "components/icons/CommentIcon"
import FileAddIcon from "components/icons/FileAddIcon"
import HeartIcon from "components/icons/HeartIcon"
import UseAccountStore from "components/store/UseAccountStore"
import { Link, useParams } from "react-router-dom"

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

function CommentMiddleBar() {
    const { id } = useParams<{ id: string }>();
    const comment = user.find((item) => item.id === parseInt(id || "", 10));
    const { account } = UseAccountStore();
    return (
        <div>
            <Box borderBottom="1px solid" borderColor="gray.400">
                <Box px="20px">
                    <Flex gap="3" align="center">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </Link>
                    <Text fontSize="18px" fontWeight="semibold">Comments</Text>  
                    </Flex>
                    {comment && (
                    <Flex py="20px">
                        <Image
                            src={comment.profile}
                            boxSize="40px"
                            borderRadius="full"
                            fit="cover"
                            alt="Naruto Uzumaki"
                        />
                        <Box ml="2">
                            <Text textAlign="left" fontSize="14px" fontWeight="semibold">{comment.name}</Text>
                            <Text textAlign="left" fontSize="12px" color="gray.400">{comment.account}</Text>
                            <Box>
                                <Text fontSize="14px" marginTop="2">
                                    {comment.comment}
                                </Text>
                                <Link to="/image">
                                {comment.picture &&  <img src={comment.picture} alt="" className="rounded-lg w-6/12 my-2"/>}
                                </Link>
                                <Text fontSize="12px" marginTop="2" color="gray.400" >
                                    11:32 PM • Jul 24, 2023
                                </Text>
                            </Box>
                            <Box marginTop="2" display="flex" alignItems="center" gap="3">
                                <Text display="flex" alignItems="center" gap="1">
                                <HeartIcon />
                                <span className="text-[12px]">36 Likes</span>
                                </Text>
                                <Link to="/" className="flex items-center gap-1 hover:text-[#817b7b]">
                                    <CommentIcon/>
                                    <span className="text-[12px] ">10 Replies</span>
                                </Link>
                            </Box>
                        </Box>
                    </Flex>
                    )}   
                </Box>
            </Box>
            <Box p="20px" display="flex" alignItems="center" borderBottom="1px solid" borderColor="gray.400">
                <Image
                     src={account?.profileImage || "https://static.vecteezy.com/system/resources/previews/027/448/973/non_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"} // Gunakan profileImage dari store jika ada
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                    alt=""
                />
                <Input placeholder="What is Happening?" outline="none" border="none" fontSize="18px" marginLeft="10px" width="67%" p="0"/>
                <Box display="flex" alignItems="center" gap="2" >
                    <Box>
                    <FileAddIcon/>
                    </Box>                 
                    <ButtonPrimary text="Reply" />
                </Box>
            </Box>
            <Box borderBottom="1px solid" borderColor="#Ffff">
                <Box p="20px">
                    <Box display="flex" alignItems="start" gap="3">
                        <Image
                            src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/09/2023/09/15/IMG_20230915_112059-3974255865.jpg"
                            boxSize="40px"
                            borderRadius="full"
                            fit="cover"
                            alt=""
                        />
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" gap="2">
                                <Text fontWeight="semibold">Ace</Text>
                                <Text color="gray.400">@portgasdace<span> • 17d</span></Text>
                            </Box>
                            <Box>
                                <Text fontSize="14px" marginTop="2">
                                Why do I look like I'm about to solve a big problem, when we were probably just fighting over Luffy's leftovers? 😂
                                </Text>
                            </Box>
                            <Box>
                                <Box marginTop="2" display="flex" alignItems="center" gap="3">
                                    <Text display="flex" alignItems="center" gap="1">
                                    <HeartIcon />
                                    <span className="text-[12px]">36 Likes</span>
                                    </Text>
                                    <Link to="/comment" className="flex items-center gap-1 hover:text-[#817b7b]">
                                        <CommentIcon/>
                                        <span className="text-[12px] ">10 Replies</span>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default CommentMiddleBar
