import { Box, Image, Text, Spinner } from '@chakra-ui/react';
import ButtonPrimary from 'components/button/Button';
import LikeButton from 'components/button/LikeButton';
import PopoverCreatePost from 'components/button/PopOverCreatePost';
import FileAddIcon from 'components/icons/FileAddIcon';
import { getAllThreads } from 'features/dashboard/services/thread.service';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThreadTypes } from 'types/threads.types';
import { apiURL } from 'utils/baseurl';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useProfileStore } from 'store/use.profile.store';

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

function HomeMiddleBar() {
  const [threads, setThreads] = useState<ThreadTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profile, retrieveUserProfile } = useProfileStore();

  useEffect(() => {
    fetchThreads();
    retrieveUserProfile();
  }, []);

  const fetchThreads = async () => {
    setIsLoading(true);
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      setIsLoading(false);
      return;
    }
    try {
      const threadData = await getAllThreads(token);
      console.log('Fetched Threads Data:', threadData);
      setThreads(threadData);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setIsLoading(false); // sembunyikan loading setelah data selesai difetch
    }
  };

  const handleNewThread = (newThread: ThreadTypes) => {
    if (!newThread.id) {
      console.warn('New thread is missing ID:', newThread);
      return;
    }
    setThreads((prevThreads) => [newThread, ...prevThreads]);
    console.log('Threads updated with new thread:', [newThread, ...threads]);
  };

  return (
    <div>
      <Box borderBottom="1px solid" borderColor="gray.400">
        <Box px="20px">
          <Text fontSize="18px" fontWeight="semibold">
            Home
          </Text>
          <Box py="20px" display="flex" alignItems="center" gap="4">
            {profile?.profile?.[0]?.profileImage ? (
              <Image
                src={profile.profile?.[0]?.profileImage}
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="User Profile"
              />
            ) : (
              <Image
                src="/default-profile.jpg"
                boxSize="40px"
                borderRadius="full"
                fit="cover"
                alt="Default Profile"
              />
            )}
            <PopoverCreatePost
              transform="translate(-42%, 0%)"
              onNewThread={handleNewThread}
            />
            <Box display="flex" alignItems="center" gap="3">
              <Box cursor="pointer">
                <FileAddIcon />
              </Box>
              <ButtonPrimary text="Post" />
            </Box>
          </Box>
        </Box>
      </Box>

      {isLoading ? (
        <Box textAlign="center" py="20px">
          <Spinner size="lg" />
          <Text mt="2">Loading threads...</Text>
        </Box>
      ) : threads.length > 0 ? (
        threads.map((thread) => {
          return (
            <Box key={thread.id} borderBottom="1px solid" borderColor="#FFF">
              <Box p="20px">
                <Box display="flex" alignItems="start" gap="3">
                  <Image
                    src={
                      thread.profile?.profileImage
                        ? `${apiURL}/uploads/${thread.profile?.profileImage}`
                        : '/default-profile.jpg'
                    }
                    boxSize="40px"
                    borderRadius="full"
                    fit="cover"
                    alt="Profile Image"
                  />
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" gap="2">
                      <Link to="/" className="font-semibold">
                        {thread.profile?.fullname || 'Unknown User'}
                      </Link>
                      <Text color="gray.400">
                        @{thread.author?.username || 'unknown'}{' '}
                        <span>• {dayjs(thread.createdAt).fromNow()}</span>
                      </Text>
                    </Box>
                    <Link to={`/comment/${thread.id}`}>
                      <Text fontSize="14px" marginTop="2">
                        {thread.content || 'No content available.'}
                      </Text>
                      {thread.image && (
                        <img
                          src={thread.image}
                          alt="Thread Image"
                          className="rounded-lg w-6/12 my-2"
                        />
                      )}
                    </Link>
                    <Box mt={1} display="flex" alignItems="center" gap="3">
                      <LikeButton threadId={thread.id} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })
      ) : (
        <Text textAlign="center" py="20px">
          No threads found.
        </Text>
      )}
    </div>
  );
}

export default HomeMiddleBar;
