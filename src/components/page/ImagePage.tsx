import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Flex, Grid, Image, Input, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import FileAddIcon from 'components/icons/FileAddIcon';
import { getReplies, createReply, deleteReply } from 'features/dashboard/services/reply.services'; // Import untuk reply
import { getThreadById } from 'features/dashboard/services/thread.service'; // Import untuk thread
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useProfileStore } from 'store/use.profile.store';
import LikeButton from 'components/button/LikeAndReplyButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PopoverCreateReply from 'components/button/PopOverCreateReply';

dayjs.extend(relativeTime);

dayjs.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'A few seconds',
    m: 'A minute',
    mm: '%d minutes',
    h: 'An hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: 'A month',
    MM: '%d months',
    y: 'A year',
    yy: '%d years',
  },
});


export interface Author {
  username: string;
  profile: {
    fullname?: string;
    bio?: string;
    username?: string;
    bannerImage?: string;
    profileImage?: string;
  }[];
}

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
  image: string;
}

const ImageGrid: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
 const { id } = useParams<{ id: string }>();
   const { profile, retrieveUserProfile } = useProfileStore();
   const [thread, setThread] = useState<any>(null);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [replies, setReplies] = useState<{ [threadId: number]: Reply[] }>({});
   const [newReply, setNewReply] = useState<string>("");
   const [, setRepliesCount] = useState<number>(0);

  const navigate = useNavigate()
    

  const token = Cookies.get('token');
  useEffect(() => {
    const fetchThread = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token tidak tersedia. User mungkin belum login.");
        }

        if (!id || isNaN(Number(id))) {
          throw new Error("Invalid Thread ID");
        }

        setIsLoading(true);
        const data = await getThreadById(token, Number(id));
        console.log("Fetched Thread:", data);
        setThread(data);
      } catch (error: any) {
        console.error("Error fetching thread:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat data thread.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchThread();
  }, [id]);

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        if (!id || isNaN(Number(id))) {
          throw new Error("Invalid Thread ID");
        }

        const data = await getReplies(Number(id));
        console.log("Fetched Replies:", data);

        setReplies((prevReplies) => ({
          ...prevReplies,
          [Number(id)]: data,
        }));
      } catch (error: any) {
        console.error("Error fetching replies:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat data replies.",
        });
      }
    };

    if (id) fetchReplies();
  }, [id]);

  const handleDeleteReply = async (replyId:number) => {
    try {
      if (!token) throw new Error("Token tidak tersedia. User mungkin belum login.");
      await deleteReply(replyId); //api
      setReplies((prevReplies) => {
        const updatedReplies = { ...prevReplies };
        updatedReplies[thread.id] = updatedReplies[thread.id].filter(
          (reply) => reply.id !== replyId
        );
        return updatedReplies;
      });

      toast.success("Reply successfully deleted!");
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("Failed to delete reply.");
    }
  };

  const handleReplySubmit = useCallback(async () => {
    try {
        if (!thread?.id) throw new Error("Thread ID tidak ditemukan.");
        if (!newReply.trim()) {
            toast.error('Reply cannot be empty!');
            return;
        }

        const formData = new FormData();
        formData.append("content", newReply);

        const reply = await createReply(thread.id, formData); //api
        setReplies((prevReplies) => ({
            ...prevReplies,
            [thread.id]: [reply, ...(prevReplies[thread.id] || [])],
        }));
        setNewReply("");
        toast.success('Reply successfully created!');
        setRepliesCount((prevCount) => prevCount + 1);
    } catch (error: any) {
        console.error("Error creating reply:", error.message);
        toast.error('Reply not created!');
    }
}, [thread?.id, newReply]);


  useEffect(() => {
    if (!profile) retrieveUserProfile();
  }, [profile, retrieveUserProfile]);

  if (isLoading) return <Text>Loading...</Text>;
  if (!thread) return <Text>Thread not found</Text>;

  return (
    <Grid templateColumns={isOpen ? '1fr' : '2fr 1fr'} gap={4} height="100vh">
      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        borderRadius="md"
        overflow="hidden"
      >
       <Box position="absolute" top={4} left={4}>
        <Button
          onClick={() => navigate(-1)}
          background="none"
          rounded="50%"
          border="1px solid"
          borderColor="white"
          color={'white'}
          p={0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Box>

        <Image
          src={thread?.image || "https://via.placeholder.com/150"}
          alt="Drink"
          objectFit="cover"
          width="70%"
          height={isOpen ? '90%' : 'auto'}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        color='white'
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M3.22 3.22a.75.75 0 0 1 1.06 0l3.97 3.97V4.5a.75.75 0 0 1 1.5 0V9a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1 0-1.5h2.69L3.22 4.28a.75.75 0 0 1 0-1.06Zm17.56 0a.75.75 0 0 1 0 1.06l-3.97 3.97h2.69a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75V4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0ZM3.75 15a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-2.69l-3.97 3.97a.75.75 0 0 1-1.06-1.06l3.97-3.97H4.5a.75.75 0 0 1-.75-.75Zm10.5 0a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-2.69l3.97 3.97a.75.75 0 1 1-1.06 1.06l-3.97-3.97v2.69a.75.75 0 0 1-1.5 0V15Z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        color='white'
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    )}

        </Button>
      </Flex>

      {/* Comments Area */}
      {!isOpen && (
        <Box borderLeft="1px solid" borderColor="gray.400" overflowY="auto">
          <Flex px="20px" py="20px" textAlign={'left'} borderBottom="1px solid" borderColor="gray.400">
            <Image
              src={thread.profile?.profileImage || "https://via.placeholder.com/40"}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alt={thread.author?.username || "User"}
            />
            <Box ml="2">
              <Box display="flex" gap="2">
                  <Text className="font-semibold">
                    {thread.profile?.fullname || 'Unknown User'}
                  </Text>
                  <Text color="gray.400">
                    @{thread.author?.username || 'unknown'}{' '}
                    <span>• {dayjs(thread.createdAt).fromNow()}</span>
                  </Text>
                </Box>
              <Box>
                <Text fontSize="14px" marginTop="2">{thread.content}</Text>
                {/* {thread.image && <img src={thread.image} alt="Thread" className="rounded-lg w-6/12 my-2" />} */}
              </Box>
              <Box marginTop="2" display="flex" alignItems="center" gap="3">
                <LikeButton threadId={thread.id} />
              </Box>
            </Box>
          </Flex>
          
          <Box p="20px" display="flex" alignItems="center" borderBottom="1px solid" borderColor="gray.400">
            <Image
              src={profile?.profile?.[0]?.profileImage}
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alt="User"
            />
            <Input
              placeholder="What is happening?"
              outline="none"
              border="none"
              fontSize="14px"
              marginLeft="10px"
              width="50%"
              p="0"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
            />
            <Box display="flex" alignItems="center" gap="2">
            <Box>
              <PopoverCreateReply
                transform="translate(-110%, -50%)"
                parentThreadId={thread.id}
                onNewReply={(newReply) => {
                setReplies((prevReplies) => ({
                      ...prevReplies,
                      [thread.id]: [newReply, ...(prevReplies[thread.id] || [])],
                      }));
                  }}
              />
            </Box>
              <Button type="submit" rounded="50px" backgroundColor="#04A51E" width='72%' color="#FFFF" _hover={{
                backgroundColor: "#006811"}} onClick={handleReplySubmit}>Reply</Button>
            </Box>
          </Box>
         <Box>
                 {(replies[thread?.id] || []).map((reply) => (
                   <Box key={reply.id} p="20px" borderBottom="1px solid" borderColor="gray.400" textAlign={'left'}>
                     <Flex gap="3">
                       <Image
                         src={reply.author.profile?.[0]?.profileImage || "https://via.placeholder.com/40"}
                         boxSize="40px"
                         borderRadius="full"
                         fit="cover"
                         alt={reply.author.username || "User"}
                       />
                       <Box width={'100vw'}>
                         <Box display={"flex"} justifyContent={"space-between"} width={'full'}>
                           <Box >
                             <Text fontSize="14px" fontWeight="semibold">{reply.author.profile?.[0]?.fullname || "Anonymous"}
                               <span className='font-normal text-gray-400'> • {dayjs(reply.createdAt).fromNow()}</span>
                             </Text>
                             <Text fontSize="12px" color="gray.400">@{reply.author?.username || "unknown"}</Text>
                           </Box>
         
                           {/* menu delete */}
                           {reply.author.username === profile?.username && (
                             <Box style={{ position: 'relative' }}>
                               <MenuRoot>
                                 <MenuTrigger asChild>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 cursor-pointer">
                                     <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                   </svg>
                                 </MenuTrigger>
                                 <MenuContent style={{ position: 'absolute', top: '75%', left: '-114px', backgroundColor:'#1d1d1d' }}>
                                   <MenuItem
                                     cursor={'pointer'}
                                     colorScheme="red"
                                       onClick={() => handleDeleteReply(reply.id)}
                                       value="delete"
                                       color="fg.error"
                                       _hover={{ bg: "bg.error", color: "fg.error" }}
                                     >
                                       Delete...
                                   </MenuItem>
                                 </MenuContent>
                               </MenuRoot>
                             </Box>
                           )}
                           {/* menu delete */}
                         </Box>
                         
                         {/* content reply */}
                         <Text fontSize="14px" mt="2">{reply.content}</Text>
                         {reply.image && (
                             <Image
                               src={reply.image}
                               alt="Thread Image"
                               className="rounded-lg w-10/12 my-2"
                             />
                         )}
                         {/* content reply */}
                       </Box>
                     </Flex>
                   </Box>
                 ))}
               </Box>
        </Box>
      )}
    </Grid>
  );
};

export default ImageGrid;
