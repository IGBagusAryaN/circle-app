import {
  Box,
  Flex,
  Image,
  Input,
  Text,
  Button,
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useProfileStore } from 'store/use.profile.store';
import LikeButton from 'components/button/LikeAndReplyButton';

import { getThreadById } from 'features/dashboard/services/thread.service';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import dayjs from 'dayjs';
// import PopoverCreateReply from 'components/button/PopOverCreateReply';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LottieAnimation } from 'components/lottie';
import { createReply, deleteReply, getReplies } from 'features/dashboard/services/reply.service';

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

function CommentMiddleBar() {
  const { id } = useParams<{ id: string }>();
  const { profile, retrieveUserProfile } = useProfileStore();
  const [thread, setThread] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [replies, setReplies] = useState<{ [threadId: number]: Reply[] }>({});
  const [newReply, setNewReply] = useState<string>('');
  const [, setRepliesCount] = useState<number>(0);

  const token = Cookies.get('token');
  useEffect(() => {
    const fetchThread = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('Token tidak tersedia. User mungkin belum login.');
        }

        if (!id || isNaN(Number(id))) {
          throw new Error('Invalid Thread ID');
        }

        setIsLoading(true);
        const data = await getThreadById(token, Number(id));
        console.log('Fetched Thread:', data);
        setThread(data);
      } catch (error: any) {
        console.error('Error fetching thread:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal memuat data thread.',
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
          throw new Error('Invalid Thread ID');
        }

        const data = await getReplies(Number(id));
        console.log('Fetched Replies:', data);

        setReplies((prevReplies) => ({
          ...prevReplies,
          [Number(id)]: data,
        }));
      } catch (error: any) {
        console.error('Error fetching replies:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal memuat data replies.',
        });
      }
    };

    if (id) fetchReplies();
  }, [id]);

  const handleDeleteReply = async (replyId: number) => {
    try {
      if (!token)
        throw new Error('Token tidak tersedia. User mungkin belum login.');
      await deleteReply(replyId); //api
      setReplies((prevReplies) => {
        const updatedReplies = { ...prevReplies };
        updatedReplies[thread.id] = updatedReplies[thread.id].filter(
          (reply) => reply.id !== replyId
        );
        return updatedReplies;
      });

      toast.success('Reply successfully deleted!');
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete reply.');
    }
  };

  const handleReplySubmit = useCallback(async () => {
    try {
      if (!thread?.id) throw new Error('Thread ID tidak ditemukan.');
      if (!newReply.trim()) {
        toast.error('Reply cannot be empty!');
        return;
      }

      const formData = new FormData();
      formData.append('content', newReply);

      const reply = await createReply(thread.id, formData); //api
      setReplies((prevReplies) => ({
        ...prevReplies,
        [thread.id]: [reply, ...(prevReplies[thread.id] || [])],
      }));
      setNewReply('');
      toast.success('Reply successfully created!');
      setRepliesCount((prevCount) => prevCount + 1);
    } catch (error: any) {
      console.error('Error creating reply:', error.message);
      toast.error('Reply failed to create!');
    }
  }, [thread?.id, newReply]);

  useEffect(() => {
    if (!profile) retrieveUserProfile();
  }, [profile, retrieveUserProfile]);

  if (isLoading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-5">
          <LottieAnimation />
        </div>
      </div>
    );
  if (!thread)
    return (
      <div className="h-screen flex flex-col justify-center">
        <Text>Thread not found</Text>;
      </div>
    );

  return (
    <div className="pb-[77px] md:pb-0">
      {/* thread view */}
      <Box borderBottom="1px solid" borderColor="gray.700">
        <Box px="20px">
          <Flex gap="3" align="center" mt={5}>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                />
              </svg>
            </Link>
            <Text fontSize="18px" fontWeight="semibold">
              Comments
            </Text>
          </Flex>
          <Flex py="20px">
            <Image
              src={
                thread.profile?.profileImage || 'https://via.placeholder.com/40'
              }
              boxSize="40px"
              borderRadius="full"
              fit="cover"
              alt={thread.author?.username || 'User'}
            />
            <Box ml="2">
              <Text fontSize="14px" fontWeight="semibold">
                {thread.profile?.fullname || 'Anonymous'}
                <span className="font-normal text-gray-400">
                  {' '}
                  • {dayjs(thread.createdAt).fromNow()}
                </span>
              </Text>
              <Text textAlign="left" fontSize="12px" color="gray.400">
                @{thread.author?.username || 'unknown'}
              </Text>
              <Link to={`/image/${thread.id}`}>
                <Box>
                  <Text fontSize="14px" marginTop="2">
                    {thread.content}
                  </Text>
                  {thread.image && (
                    <img
                      src={thread.image}
                      alt="Thread"
                      className="rounded-lg w-6/12 my-2"
                    />
                  )}
                </Box>
              </Link>
              <Box marginTop="2" display="flex" alignItems="center" gap="3">
                <LikeButton
                  threadId={thread.id}
                  onRepliesCountChange={(count) => setRepliesCount(count)}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      {/* thread view */}

      {/* input reply */}
      <Box
        p="20px"
        display="flex"
        alignItems="center"
        justifyContent={'space-between'}
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        <Box display={'flex'} gap={2}>

     
        <Image
          src={
            profile?.profile?.[0]?.profileImage ||
            'https://via.placeholder.com/40'
          }
          boxSize="40px"
          borderRadius="full"
          fit="cover"
          alt="User"
        />
        <Input
          placeholder="What is happening?"
          outline="none"
          border="none"
          fontSize={{ base: '14px', md: '18px' }}
          marginLeft="10px"
          width="full"
          p="0"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
           </Box>

        <Box display="flex" alignItems="center" gap="2">
          {/* <Box>
            <PopoverCreateReply
              transform="translate(-50%, -50%)"
              parentThreadId={thread.id}
              onNewReply={(newReply) => {
                setReplies((prevReplies) => ({
                  ...prevReplies,
                  [thread.id]: [newReply, ...(prevReplies[thread.id] || [])],
                }));
              }}
            />
          </Box> */}
          <Button
            type="submit"
            rounded="50px"
            backgroundColor="#04A51E"
            width="full"
            color="#FFFF"
            _hover={{ backgroundColor: '#006811' }}
            onClick={handleReplySubmit}
          >
            Reply
          </Button>
        </Box>
      </Box>
      {/* input reply */}

      <Box>
        {(replies[thread?.id] || []).map((reply) => (
          <Box
            key={reply.id}
            p="20px"
            borderBottom="1px solid"
            borderColor="gray.700"
          >
            <Flex gap="3">
              <Image
                src={
                  reply.author.profile?.[0]?.profileImage ||
                  'https://via.placeholder.com/40'
                }
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt={reply.author.username || 'User'}
              />
              <Box width={{base:'78vw', md:'100vw'}}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  width={'full'}
                >
                  <Box>
                    <Text fontSize="14px" fontWeight="semibold">
                      {reply.author.profile?.[0]?.fullname || 'Anonymous'}
                      <span className="font-normal text-gray-400">
                        {' '}
                        • {dayjs(reply.createdAt).fromNow()}
                      </span>
                    </Text>
                    <Text fontSize="12px" color="gray.400">
                      @{reply.author?.username || 'unknown'}
                    </Text>
                  </Box>

                  {/* menu delete */}
                  {reply.author.username === profile?.username && (
                    <Box style={{ position: 'relative' }}>
                      <MenuRoot>
                        <MenuTrigger asChild>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </MenuTrigger>
                        <MenuContent
                          style={{
                            position: 'absolute',
                            top: '75%',
                            left: '-114px',
                            backgroundColor: '#1d1d1d',
                          }}
                        >
                          <MenuItem
                            cursor={'pointer'}
                            colorScheme="red"
                            onClick={() => handleDeleteReply(reply.id)}
                            value="delete"
                            color="fg.error"
                            _hover={{ bg: 'bg.error', color: 'fg.error' }}
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
                <Text fontSize="14px" mt="2" >
                  {reply.content}
                </Text>
                {/* {reply.image && (
                  <Image
                    src={reply.image}
                    alt="Thread Image"
                    className="rounded-lg w-6/12 my-2"
                  />
                )} */}
                {/* content reply */}
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default CommentMiddleBar;
