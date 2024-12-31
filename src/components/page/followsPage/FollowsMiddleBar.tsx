import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "utils/baseurl";
import UserList from "features/auth/tests/userlist";
import Cookies from "js-cookie";
import { Box, Text, Tabs,  } from "@chakra-ui/react";
import { UserTypes } from "types/users.types";

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
        <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
          <Box width="100%">
            <Tabs.List display="flex" justifyContent="center" width="100%">
              <Box width="full" textAlign="center">
                <Tabs.Trigger value="first" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "100%", height: "40px" }}>
                  Followers
                </Tabs.Trigger>
              </Box>
              <Box width="full" textAlign="center">
                <Tabs.Trigger value="second" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "100%", height: "40px" }}>
                  Following
                </Tabs.Trigger>
              </Box>
            </Tabs.List>
          </Box>
          <Tabs.Content value="first">
            <Box>
              <UserList  users={following} />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="second">
            <Box>
              <UserList users={followers} />
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </div>
  );
};


export default FollowsMiddleBar;
