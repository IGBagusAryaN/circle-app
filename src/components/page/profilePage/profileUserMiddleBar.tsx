import { Box, Flex, Grid, Image, Tabs, Text } from '@chakra-ui/react';
import { getUserThread } from 'features/dashboard/services/thread.service';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserTypes } from 'types/users.types';
import { ThreadTypes } from 'types/threads.types';
import Cookies from 'js-cookie';
import LikeButton from 'components/button/LikeAndReplyButton';
import {
  getAllUsers,
  getUserById,
} from 'features/dashboard/services/users.service';
import FollowButton from 'components/button/FollowButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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

function ProfileMiddleBar() {
  const { userId } = useParams(); // Ambil userId dari URL
  const [value, setValue] = useState<string | null>('first');
  const [user, setUser] = useState<UserTypes | null>(null);
  const [threads, setThreads] = useState<ThreadTypes[]>([]);
  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); // Tambahkan state untuk userId login

  useEffect(() => {
    retrieveUserProfile();
    fetchCurrentUser(); // Panggil fungsi untuk mendapatkan ID pengguna yang sedang login
  }, []);

  const retrieveUserProfile = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const fetchedUser = await getUserById(token, Number(userId));
      setUser(fetchedUser);

      if (fetchedUser) {
        fetchUserThreads(token, fetchedUser.id);
      }
    } catch (error) {
      console.error('Error in retrieveUserProfile:', error);
    }
  };

  const fetchCurrentUser = async () => {
    const token = Cookies.get('token'); // Ambil token dari Cookies
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      // Decode token untuk mendapatkan user ID
      const decoded: { id: number } = JSON.parse(atob(token.split('.')[1]));

      // Gunakan decoded.id untuk mendapatkan data pengguna
      const allUsers = await getAllUsers(token); // Ambil semua pengguna
      const loggedInUser = allUsers.find((u: UserTypes) => u.id === decoded.id);

      if (loggedInUser) {
        setCurrentUserId(loggedInUser.id); // Set ID pengguna login ke state
      }
    } catch (error) {
      console.error('Error decoding token or fetching user:', error);
    }
  };

  const fetchUserThreads = async (token: string, userId: number) => {
    setIsLoadingThreads(true);
    try {
      const userThreads = await getUserThread(token, userId);
      setThreads(userThreads);
    } catch (error) {
      console.error('Error fetching user threads:', error);
    } finally {
      setIsLoadingThreads(false);
    }
  };

  return (
    <div className='pb-0 md:pb-[77px]'>
      {user && (
        <Box py="2" px="5">
          <Flex gap="3" align="center" position={'relative'}>
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
              {user.profile?.[0]?.fullname}
            </Text>
          </Flex>
          <Box position="relative" mt="3">
            <Box position="relative">
              <Image
                height="140px"
                w="full"
                borderRadius="7px"
                src={
                  user.profile?.[0]?.bannerImage ||
                  'https://273774.fs1.hubspotusercontent-na1.net/hub/273774/hubfs/act3/images/placeholder.jpg?width=1920&height=1080&name=placeholder.jpg'
                }
              />
              <Image
                src={
                  user.profile?.[0]?.profileImage ||
                  'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                }
                boxSize="80px"
                borderRadius="full"
                fit="cover"
                alt=""
                position="absolute"
                top="97px"
                left="10px"
                border="4px solid"
                borderColor="whiteAlpha.900"
              />
            </Box>
            <Box textAlign="right" mt={3} position={'absolute'} right={0}>
              {currentUserId !== user.id && <FollowButton userId={user.id} />}
            </Box>
          </Box>
          <Box mt={'60px'}>
            <Text textAlign="left" mt="2" fontSize="20px" fontWeight="bold">
              {user.profile?.[0]?.fullname || 'No Name'}
            </Text>
            <Text textAlign="left" fontSize="14px" color="gray.400">
              @{user.username || 'username'}
            </Text>
            <Text textAlign="left" fontSize="14px">
              {user.profile?.[0]?.bio || ''}
            </Text>
            <Flex mt="2" gap="3">
              <Text className="text-[16px] font-normal text-gray-400">
                <span className="text-white font-bold">
                  {user.followers?.length || 0}
                </span>{' '}
                Followers
              </Text>
              <Text className="text-[16px] font-normal text-gray-400">
                <span className="text-white font-bold">
                  {user.following?.length || 0}
                </span>{' '}
                Following
              </Text>
            </Flex>
          </Box>
        </Box>
      )}

      <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)} mt="2">
        <Box width="100%">
          <Tabs.List display="flex" justifyContent="center" width="100%">
            <Box width="full" textAlign="center">
              <Tabs.Trigger
                value="first"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
                }}
              >
                All Post
              </Tabs.Trigger>
            </Box>
            <Box width="full" textAlign="center">
              <Tabs.Trigger
                value="second"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '40px',
                }}
              >
                Media
              </Tabs.Trigger>
            </Box>
          </Tabs.List>
        </Box>

        <Tabs.Content value="first">
          {isLoadingThreads ? (
            <Text textAlign={'center'} mt={10}>
              Loading threads...
            </Text>
          ) : threads && threads.length > 0 ? (
            threads.map((thread) => (
              <Box
                key={thread.id}
                borderBottom="1px solid"
                borderColor="gray.700"
              >
                <Box p="20px">
                  <Box display="flex" alignItems="start" gap="3">
                    <Image
                      src={
                        thread.profile?.profileImage ||
                        'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                      }
                      boxSize="40px"
                      borderRadius="full"
                      fit="cover"
                      alt=""
                    />
                    <Box display="flex" flexDirection="column">
                      <Box display={{ base:"block", md:"flex" }} gap="2">
                        <Text fontWeight="semibold">
                          {thread.profile?.fullname || 'No Name'}
                        </Text>
                        <Text color="gray.400">
                          @{thread.author?.username || 'username'}{' '}
                          <span> • {dayjs(thread.createdAt).fromNow()}</span>
                        </Text>
                      </Box>
                      <Link to={`/comment/${thread.id}`}>
                        <Text fontSize="14px" marginTop="2">
                          {thread.content}
                        </Text>
                        {thread.image && (
                          <img
                            src={thread.image}
                            alt=""
                            className="rounded-lg w-6/12 my-2"
                          />
                        )}
                      </Link>
                      <Box>
                        <LikeButton threadId={thread.id} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Text textAlign={'center'} mt={10}>
              No threads found.
            </Text>
          )}
        </Tabs.Content>
        <Tabs.Content value="second" py="1">
          {isLoadingThreads ? (
            <Text textAlign={'center'} mt={10}>
              Loading media...
            </Text>
          ) : threads && threads.length > 0 ? (
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
              gap="2"
              mt={2}
              px={1}
            >
              {threads
                .filter((thread) => thread.image)
                .map((thread) => (
                  <Link to={`/image/${thread.id}`} key={thread.id}>
                    <Image
                      src={thread.image}
                      alt="Thread Media"
                      width="100%"
                      height={{ base: '100px', md: '150px' }}
                      borderRadius="lg"
                      objectFit="cover"
                    />
                  </Link>
                ))}
            </Grid>
          ) : (
            <Text textAlign={'center'} mt={10}>
              No media found.
            </Text>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default ProfileMiddleBar;
