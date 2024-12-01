import { Box, Flex, Grid, Image, Tabs, Text} from '@chakra-ui/react'
import PopoverEditProfile from 'components/button/PopOverEditProfile'
import CommentIcon from 'components/icons/CommentIcon'
import HeartIcon from 'components/icons/HeartIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const user = [
    {
        id: 1,
        profile: "https://images8.alphacoders.com/129/1290002.png",
        name: "Bagus Arya",
        account: "@bagusarya87",
        comment:"ASL trio in their chibi prime: Luffy looking confused, Ace ready to fight, and Sabo pretending he's the brains of the group😂"
    },
    {
        id: 2,
        profile: "https://images8.alphacoders.com/129/1290002.png",
        name: "Bagus Arya",
        account: "@bagusarya87",
        comment:"I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!",
        picture: "https://i.namu.wiki/i/jhxMH9-DQnQ0esQAmVB9Tk71ywcYBFnds5NIwhx1x2QE-Akx8x8sS7pTb_DI7TZeNrc6JlxSZdRMeFWeWgM53g.webp"
    }
]

const imageDummy =[ 
    {
        id:1,
        image:"https://www.opfanpage.com/wp-content/uploads/2020/05/Marco_vs_Kizaru-1024x639.png"
    },
    {
        id:2,
        image:"https://cdna.artstation.com/p/assets/images/images/045/875/538/large/pablo-eduardo-nunes-araujo-marco.jpg?1643747834"
    },
    {
        id:3,
        image:"https://static.zerochan.net/Marco.%28ONE.PIECE%29.full.2971607.jpg"
    },
    {
        id:4,
        image:"https://images2.alphacoders.com/943/thumb-1920-943342.png"
    },
    {
        id:5,
        image:"https://images8.alphacoders.com/976/976356.jpg"
    },
    {
        id:6,
        image:"https://i.pinimg.com/736x/80/9e/d7/809ed726816a360bff675126679c7694.jpg"
    },
]
function ProfileMiddleBar() {
    const [value, setValue] = useState<string | null>("first")
    return (
        <div>
        <Box py="2" px="5">
            <Flex gap="3" align="center">
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                    </svg>
                </Link>
                <Text fontSize="18px" fontWeight="semibold">Bagus Arya</Text>  
            </Flex>
            <Box position="relative" mt="3">
                <Box position="relative">
                <Image
                    height="120px" w="full" borderRadius="7px"
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
                <Box textAlign="right">
                    <PopoverEditProfile transform="translate(-103%, -46%)"/>
                </Box>
            </Box>
            <Box>
                <Text textAlign="left" mt="2" fontSize="20px" fontWeight="bold">Bagus Arya</Text>
                <Text textAlign="left" fontSize="14px" color="gray.400">@bagusarya87</Text>
                <Text textAlign="left" fontSize="14px">Lorem ipsum dolor sit amet consec </Text>
                <Flex mt="2" gap="3">
                    <Text fontWeight="bold" fontSize="14px">291<span className="font-normal text-gray-400 ms-1">Following</span></Text>
                    <Text fontWeight="bold" fontSize="14px">29<span className="font-normal text-gray-400 ms-1">Followers</span></Text>
                </Flex>
            </Box>
        </Box>
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} mt="2">
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
                    All Post
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
                    Media
                    </Tabs.Trigger>
                </Box>
                </Tabs.List>
            </Box>

            <Tabs.Content value="first">
            {user.map((user)=>{
            return(
            <Box borderBottom="1px solid" borderColor="gray.300"key={user.id}>
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
                                <Text fontWeight="semibold">{user.name}</Text>
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
            </Tabs.Content>
            <Tabs.Content value="second" py="1">
            <Grid templateColumns="repeat(3, 1fr)" gap="1" >
                {imageDummy.map((image)=>{
                    return (
                        <Box border="1px solid" borderColor="transparent" h="180px" w="full" className="overflow-hidden" rounded="5px">
                        <img
                            src={image.image}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        </Box>
                    )
                }
                )} 
            </Grid>
            </Tabs.Content>
        </Tabs.Root>
        </div>
    )
}

export default ProfileMiddleBar
