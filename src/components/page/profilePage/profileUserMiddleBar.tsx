import { Box, Button, Flex, Grid, Image, Tabs, Text } from '@chakra-ui/react'
import CommentIcon from 'components/icons/CommentIcon'
import HeartIcon from 'components/icons/HeartIcon'
import { UseFollowStore } from 'components/store/UseFollowStore'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const user = [
    {
        id: 1,
        profile: "https://media.tenor.com/cAGJcxxxeycAAAAe/lindbergh-lindbergh-one-piece.png",
        banner:"https://c4.wallpaperflare.com/wallpaper/342/700/1020/anime-one-piece-belo-betty-karasu-one-piece-wallpaper-preview.jpg",
        name: "Lindhberg",
        account: "@lindhbergrevolutioner",
        bio:"ASL trio in their chibi prime: Luffy looking confused",
        following: 130,
        followers: 57,
        status:[
            {
                comment:"ASL trio in their chibi prime: Luffy looking confused, Ace ready to fight, and Sabo pretending he's the brains of the group😂",
                picture:"https://i.pinimg.com/originals/28/09/80/28098079205e97162501ec377292bb48.jpg"
            },
            {
                comment:"I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!",
                picture: "https://www.opfanpage.com/wp-content/uploads/2018/05/revolutionnary_army_by_aetaluta-dcbm6gs.jpg"
            }
        ],
        imagepost:[
            {
                image:"https://static.zerochan.net/ONE.PIECE.full.1788208.jpg"
            },
            {
                image:"https://www.destructoid.com/wp-content/uploads/2024/09/Lindbergh-of-the-Revolutionary-Army-in-One-Piece.jpg?w=640&resize=1200%2C675"
            },
        ]
    },
    {
        id: 2,
        profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0w8Fb0eL5EB7kNviLUOUTxXfFtUxnVNHfA&s",
        banner:"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cc4e0904-0734-45c5-8a50-70786a77af11/dgparcr-3a24b5cd-b0dc-4adf-b83a-9acc53497399.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NjNGUwOTA0LTA3MzQtNDVjNS04YTUwLTcwNzg2YTc3YWYxMVwvZGdwYXJjci0zYTI0YjVjZC1iMGRjLTRhZGYtYjgzYS05YWNjNTM0OTczOTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-PP5cQlutFWIQ8hB7_Gntnj4d8Hpqf02P8Lo1fLiyF0",
        name: "Monkey D. Luffy",
        account: "@mugiwaranoluffy",
        bio:"I’m gonna be King of the Pirates! 🌊",
        following: 220,
        followers: 15.378,
        status:[
            {
                comment:"I’m gonna be King of the Pirates! 🌊☠️ The journey is tough, but my dreams are unstoppable!",
            },
            {
                comment:"Lets go Partyyy",
                picture: "https://www.greenscene.co.id/wp-content/uploads/2020/03/Straw_Hat_Pirates_Grand_Fleet_Celebrates.png"
            }
        ],
        imagepost:[
            {
                image:"https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/133/2023/12/18/Screenshot_20231218-222607_1-628681558.png"
            },
            {
                image:"https://facts.net/wp-content/uploads/2023/09/11-facts-about-monkey-d-luffy-one-piece-1693613904.jpg"
            },
            {
                image:"https://comicbook.com/wp-content/uploads/sites/4/2022/08/3e7ac2f4-0c92-44a7-ac4f-c13055d42539.jpg"
            },
        ]
        
    },
    {
        id: 3,
        profile: "https://www.clipartmax.com/png/middle/203-2032723_one-piece-clipart-franky-franky-one-piece-png.png",
        banner:"https://e1.pxfuel.com/desktop-wallpaper/241/602/desktop-wallpaper-pemandangan-one-piece-thousand-sunny-sunny-go.jpg",
        name: "Franky",
        account: "@frankycolala",
        bio:"Wow, this looks stunning! The details and composition are just perfect. 👏✨",
        following: 234,
        followers: 228,
        status:[
            {
                comment:"Wow, this looks stunning! The details and composition are just perfect. 👏✨",
                picture: "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/24/2389002419.jpg"
            },
        ],
        imagepost:[
            {
                image:"https://cdn.oneesports.gg/cdn-data/2023/06/Anime_OnePiece_Wallpaper_StrawHatPirates_Complete.jpg"
            },
            {
                image:"https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/100/2024/07/25/Snapinstaapp_373002473_18349295893079492_8560437794993033233_n_1080-1167972525.jpg"
            },
            {
                image:"https://cdn.oneesports.id/cdn-data/sites/2/2024/02/BF-38-General-Franky-1024x576.jpg"
            },
        ]
    },
    {
        id: 4,
        profile: "https://images.alphacoders.com/138/thumb-1920-1381546.png",
        banner:"https://images3.alphacoders.com/863/863299.jpg",
        name: "Brook",
        account: "@brook_",
        bio:"Yohohoho!🎻🎤",
        following: 782,
        followers: 22.858,
        status:[
            {
                comment:"Yohohoho! Let the soul-stirring melody sail through the seas! 🎶☠️ Brook’s music hits the heart, even without one!🎻🎤"
            },
        ],
        imagepost:[
            {
                image:"https://www.greenscene.co.id/wp-content/uploads/2021/06/Brooks-696x497.jpg"
            },
            {
                image:"https://static1.cbrimages.com/wordpress/wp-content/uploads/2024/07/10-ways-is-brook-different-than-the-rest-of-the-straw-hats.jpg"
            },
            {
                image:"https://cdn.idntimes.com/content-images/duniaku/post/20210410/brook-one-piece-haki-4da12aedf0fd4c2dfd47a19334e96760.jpg"
            },
            {
                image:"https://www.greenscene.co.id/wp-content/uploads/2021/03/One-Piece-4.jpg"
            },
            {
                image:"https://asset-2.tstatic.net/tribunnewswiki/foto/bank/images/Gamb5ar-via-Eiichiro-OdaShueisha-One-Piece.jpg"
            },
        ]
    },
    {
        id: 5,
        profile: "https://cdn.idntimes.com/content-images/community/2022/06/roronoza-zoro-statue-in-japan-cropped-56965fbaa68adf470a17cc45ea5d328d-0817f04bc75ff0168ca600323d03770c_600x400.jpg",
        banner:"https://i.pinimg.com/originals/11/5b/b6/115bb6ef73e122ae3b149a00a43b38f1.jpg",
        name: "Zoro",
        account: "@roronoazoro",
        bio:"This painting is sharp and precise... almost as sharp as my blades. Impressive work!🗡️🎨",
        following: 9,
        followers: 5.308,
        status:[
            {
                comment:"This painting is sharp and precise... almost as sharp as my blades. Impressive work!🗡️🎨",
                picture: "https://jabarupdate.id/wp-content/uploads/2024/01/IMG-20240129-WA0002.jpg"
            },
        ],
        imagepost:[
            {
                image:"https://cdn.oneesports.id/cdn-data/sites/2/2024/05/Anime_OnePiece_Zoro_Sword_Attack-1024x576-1.jpg"
            },
            {
                image:"https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/682/2023/12/20/ab7218834a8b3227c75c695e68d0f617-3994612550.jpg"
            },
            {
                image:"https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/854/2024/11/05/Roronoa-Zoro-Black-Blade-1991694337.jpg"
            },
        ]
    },
]

interface FollowButtonProps {
    userId: number;
}

function ProfileUserMiddleBar({userId}: FollowButtonProps) {
    const [value, setValue] = useState<string | null>("first")
    const { id } = useParams<{ id: string }>();
    const profile = user.find((item) => item.id === parseInt(id || "", 10));
    const { following, toggleFollow } = UseFollowStore();

    const isFollowing = Array.isArray(following) && following.includes(userId);

    return (
        <div>
            {profile && (
            <Box>
                <Box py="2" px="5">
                    <Flex gap="3" align="center">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        </Link>
                        <Text fontSize="18px" fontWeight="semibold">{profile.name}</Text>  
                    </Flex>
                    <Box>
                    <Box position="relative" mt="3">
                        <Box position="relative">
                            <Image
                                height="120px" w="full" borderRadius="7px"
                                src={profile.banner}
                                />
                            <Image
                                src={profile.profile}
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
                        <Button
                    onClick={() => toggleFollow(userId)} // Toggle follow berdasarkan userId
                    right="0"
                    mt="3"
                    border="1px solid"
                    bg={'none'}
                    borderColor="#FFFF"  color="#FFFF" 
                    borderRadius="20px"
                    colorScheme={isFollowing ? "red" : "blue"}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                        </Box>
                    </Box>
                    <Box>
                        <Text textAlign="left" mt="2" fontSize="20px" fontWeight="bold">{profile.name}</Text>
                        <Text textAlign="left" fontSize="14px" color="gray.400">{profile.account}</Text>
                        <Text textAlign="left" fontSize="14px">{profile.bio}</Text>
                        <Flex mt="2" gap="3">
                            <Text fontWeight="bold" fontSize="14px">{profile.following}<span className="font-normal text-gray-400 ms-1">Following</span></Text>
                            <Text fontWeight="bold" fontSize="14px">{profile.followers}<span className="font-normal text-gray-400 ms-1">Followers</span></Text>
                        </Flex>
                    </Box>
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
                    {profile.status ? (
                        profile.status.map((status, index) => (
                        <Box borderBottom="1px solid" borderColor="gray.300" key={index}>
                            <Box p="20px">
                                <Flex alignItems="start" gap="3">
                                    <Image
                                    src={profile.profile}
                                    boxSize="40px"
                                    borderRadius="full"
                                    fit="cover"
                                    alt="Profile"
                                    />
                                    <Box flex="1">
                                        <Flex alignItems="center" gap="2">
                                            <Text fontWeight="semibold">{profile.name}</Text>
                                            <Text color="gray.400">
                                            {profile.account}
                                            <span> • 17d</span>
                                            </Text>
                                        </Flex>
                                        {status.comment && (
                                        <Link to={`/comment/${index}`} className="block mt-2">
                                            <Text fontSize="14px">{status.comment}</Text>
                                            {status.picture && (
                                            <Image
                                                src={status.picture}
                                                alt="Attached"
                                                className="rounded-lg w-6/12 my-2"
                                            />
                                            )}
                                        </Link>
                                        )}
                                        <Flex mt="2" alignItems="center" gap="3">
                                        <Flex alignItems="center" gap="1">
                                            <HeartIcon/>
                                            <Text fontSize="12px">36 Likes</Text>
                                        </Flex>
                                        <Link
                                            to={`/comment/${index}`}
                                            className="flex items-center gap-1 hover:text-gray-500"
                                        >
                                            <CommentIcon />
                                            <Text fontSize="12px">10 Replies</Text>
                                        </Link>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                        ))
                        ) : (
                        <Text px="5">Status Not Found</Text>
                    )}
                    </Tabs.Content>
                    <Tabs.Content value="second" py="1">
                        <Grid templateColumns="repeat(3, 1fr)" gap="1" >
                        {profile.imagepost ? (
                            profile.imagepost.map((imagepost, index) => (
                            <Box border="1px solid" borderColor="transparent" h="180px" w="full" className="overflow-hidden" rounded="5px" key={index}>
                                {imagepost.image && (
                                <img
                                    src={imagepost.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                                )}
                            </Box>
                            ))
                            ) : (
                            <Text p="5">Media Not Found</Text>
                            )}
                        </Grid>
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
            )}
        </div>
    )
}

export default ProfileUserMiddleBar
