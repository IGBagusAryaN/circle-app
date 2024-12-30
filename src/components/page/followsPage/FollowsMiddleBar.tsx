import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiURL } from 'utils/baseurl';
import UserList from 'features/auth/tests/userlist';
import Cookies from 'js-cookie';
import { Box, Text } from '@chakra-ui/react';
import { UserTypes } from 'types/users.types';

// Define API response types
interface FollowerData {
  follower: UserTypes;
}

interface FollowingData {
  following: UserTypes;
}

const FollowsMiddleBar: React.FC<{ userId?: number }> = ({ userId }) => {
  const [followers, setFollowers] = useState<UserTypes[]>([]);
  const [following, setFollowing] = useState<UserTypes[]>([]);
  const [value, setValue] = useState<string>('first');

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return;

    const fetchFollowData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const followersResponse = await axios.get<FollowerData[]>(
          `${apiURL}follow/followers/${userId}`,
          { headers }
        );
        setFollowers(followersResponse.data.map((f) => f.follower));

        const followingResponse = await axios.get<FollowingData[]>(
          `${apiURL}follow/following/${userId}`,
          { headers }
        );
        setFollowing(followingResponse.data.map((f) => f.following));
      } catch (error) {
        console.error('Error fetching followers or following:', error);
      }
    };

    fetchFollowData();
  }, [userId]);

  return (
    <div>
      <Box py="2" px="5">
        <Text fontSize="18px" fontWeight="semibold">
          Follows
        </Text>
        <div>
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <button onClick={() => setValue('first')}>Followers</button>
            <button onClick={() => setValue('second')}>Following</button>
          </div>
          {value === 'first' && (
            <Box>
              <UserList users={followers} />
            </Box>
          )}
          {value === 'second' && (
            <Box>
              <UserList users={following} />
            </Box>
          )}
        </div>
      </Box>
    </div>
  );
};

export default FollowsMiddleBar;
