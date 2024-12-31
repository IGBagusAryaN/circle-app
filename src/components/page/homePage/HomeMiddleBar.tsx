import { Box, Image, Text, Spinner } from '@chakra-ui/react';
import ButtonPrimary from 'components/button/Button';
import LikeButton from 'components/button/LikeButton';
import PopoverCreatePost from 'components/button/PopOverCreatePost';
import FileAddIcon from 'components/icons/FileAddIcon';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThreadTypes } from 'types/threads.types';
import { useProfileStore } from 'store/use.profile.store';
import useThreadStore from 'store/use.thread.store';
import dayjs from "dayjs"

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

function HomeMiddleBar() {
  const { threads, fetchThreads } = useThreadStore(); // Use Zustand to get threads and fetch function
  const { profile, retrieveUserProfile } = useProfileStore();

  useEffect(() => {
    fetchThreads(); // Fetch threads when the component mounts
    retrieveUserProfile(); // Fetch user profile
  }, [fetchThreads, retrieveUserProfile]);

  const handleNewThread = (newThread: ThreadTypes) => {
    if (!newThread?.id) {
      console.warn('Invalid thread:', newThread);
      return;
    }
    // Add new thread to Zustand store, if you need to manage it in the store
    useThreadStore.setState((state) => ({
      threads: [newThread, ...state.threads],
    }));
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

      {threads.length === 0 ? (
        <Box textAlign="center" py="20px">
          <Spinner size="lg" />
          <Text mt="2">Loading threads...</Text>
        </Box>
      ) : (
        threads.map((thread) => (
          <Box key={thread.id} borderBottom="1px solid" borderColor="#FFF">
            <Box p="20px">
              <Box display="flex" alignItems="start" gap="3">
                <Image
                  src={
                    thread.profile?.profileImage
                      ? thread.profile?.profileImage
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
        ))
      )}
    </div>
  );
}

export default HomeMiddleBar;
