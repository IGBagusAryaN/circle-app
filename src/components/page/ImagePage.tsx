import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Image, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HeartIcon from "components/icons/HeartIcon";
import CommentIcon from "components/icons/CommentIcon";
import FileAddIcon from "components/icons/FileAddIcon";
import ButtonPrimary from "components/button/Button";

const ImageGrid: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Grid
      templateColumns={isOpen ? "1fr" : "2fr 1fr"}
      gap={4}
      height="100vh"
    >
      {/* Area Gambar */}
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        borderRadius="md"
        overflow="hidden"
      >
        <Box position="absolute" top={4} left={4} >
        <Link to="/" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>
        </Link>
        </Box>

        <Image
          src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/24/2389002419.jpg" // Ganti dengan URL gambar Anda
          alt="Drink"
          objectFit="cover"
          width="60%"
          height={isOpen ? "90%" : "auto"}
        />
        <Button
          position="absolute"
          top={4}
          right={4}
          onClick={() => setIsOpen(!isOpen)} // Toggle state isOpen
          background="none"
          rounded="50%"
          border="1px solid"
          borderColor="white"
          size="sm"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={0}
        >
          {isOpen ? (
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-white">
           <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
         </svg>
         
          ) : (
            // SVG untuk state tertutup
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
             className="size-4 text-white"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>
      </Flex>

      {/* Area Komentar */}
      {!isOpen && (
        <Box borderLeft="1px solid" borderColor="gray.400" overflowY="auto">
            <Box p="20px"  borderBottom="1px solid" borderColor="gray.400">
        <Box display="flex" alignItems="start" gap="3" >
            <Image
                src="https://www.clipartmax.com/png/middle/203-2032723_one-piece-clipart-franky-franky-one-piece-png.png"
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt=""
            />
            <Box display="flex" flexDirection="column">
                <Box display="flex" gap="2">
                    <Link to="/"className="font-semibold">Franky</Link>
                    <Text color="gray.400">@frankycolala<span> • 17d</span></Text>
                </Box>
                <Link to="/" >
                    <Text fontSize="14px" marginTop="2" textAlign={"left"}>
                      Wow, this looks stunning! The details and composition are just perfect. 👏✨
                    </Text> 
                </Link>
                <Box>
                    <Box marginTop="2" display="flex" alignItems="center" gap="3">
                        <Text display="flex" alignItems="center" gap="1">
                        <HeartIcon hover="text-[#ff4040] hover:"/>
                        <span className="text-[12px]">36 Likes</span>
                        </Text>
                        <Link to="/" className="flex items-center gap-1 hover:text-[#817b7b]">
                            <CommentIcon/>
                            <span className="text-[12px] ">10 Replies</span>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
            </Box>
                <Box p="20px" display="flex" alignItems="center" borderBottom="1px solid" borderColor="gray.400">
                <Image
                    src="https://images8.alphacoders.com/129/1290002.png"
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                    alt=""
                />
                <Input placeholder="What is Happening?" outline="none" border="none" fontSize="14px" marginLeft="10px" width="50%" p="0"/>
                <Box display="flex" alignItems="center" gap="2" >
                    <Box>
                    <FileAddIcon/>
                    </Box>                 
                    <ButtonPrimary text="Reply" />
                </Box>
            </Box>
            <Box borderBottom="1px solid" borderColor="gray.400">
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
                                <Text fontSize="14px" marginTop="2" textAlign="left">
                                Why do I look like I'm about to solve a big problem, when we were probably just fighting over Luffy's leftovers? 😂
                                </Text>
                            </Box>
                            <Box>
                                <Box marginTop="2" display="flex" alignItems="center" gap="3">
                                    <Text display="flex" alignItems="center" gap="1">
                                    <HeartIcon hover="text-[#ff4040] hover:"/>
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
        </Box>
        
      )}
    </Grid>
  );
};

export default ImageGrid;
