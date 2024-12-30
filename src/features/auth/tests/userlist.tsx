import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Center } from '@chakra-ui/react';
import FollowButton from 'components/button/FollowButton';
import { UserTypes } from 'types/users.types';

import Cookies from 'js-cookie';
import { getAllUsers } from 'features/dashboard/services/users.service';

type UserListProps = {
  users: UserTypes[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userProfiles, setUserProfiles] = useState<UserTypes[]>([]);

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      console.error('Token is missing.');
      return;
    }

    const fetchUserProfiles = async () => {
      try {
        const fetchedUsers = await getAllUsers(token);
        setUserProfiles(fetchedUsers);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      }
    };

    fetchUserProfiles();
  }, []);

  return (
    <div>
      {users.length === 0 ? (
        <Center mt="5">
          <Text fontSize="sm" color="gray.500">
            No users found
          </Text>
        </Center>
      ) : (
        users.map((user) => {
          const userProfile = userProfiles.find(
            (profile) => profile.id === user.id
          );
          return (
            <Flex key={user.id} mt="3" mb="5" justify="space-between" px="5">
              <Flex>
                <Image
                  src={userProfile?.profile?.[0]?.profileImage || ''}
                  boxSize="40px"
                  borderRadius="full"
                  fit="cover"
                  alt={userProfile?.profile?.[0]?.fullname || 'User Profile'}
                />
                <Box ml="2">
                  <Text textAlign="left" fontSize="14px" fontWeight="semibold">
                    {userProfile?.profile?.[0]?.fullname || 'No Name'}
                  </Text>
                  <Text textAlign="left" fontSize="12px" color="gray.400">
                    @{user.username}
                  </Text>
                </Box>
              </Flex>
              <FollowButton userId={user.id} />
            </Flex>
          );
        })
      )}
    </div>
  );
};

export default UserList;
