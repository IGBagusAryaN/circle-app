import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text, Center } from '@chakra-ui/react';
import FollowButton from 'components/button/FollowButton';
import { UserTypes } from 'types/users.types';
import Cookies from 'js-cookie';
import { getAllUsers } from 'features/dashboard/services/users.service';
import { Link } from 'react-router-dom';
import { LottieAnimation } from 'components/lottie';


type UserListProps = {
  users: UserTypes[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userProfiles, setUserProfiles] = useState<UserTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false); // tambahkan state loading

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    const fetchUserProfiles = async () => {
      setIsLoading(true); // mulai loading
      try {
        const fetchedUsers = await getAllUsers(token);
        setUserProfiles(fetchedUsers);
      } catch (error) {
        console.error('Error fetching user profiles:', error);
      } finally {
        setIsLoading(false); // selesai loading
      }
    };

    fetchUserProfiles();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <Center mt="5">
          <LottieAnimation />
        </Center>
      ) : users.length === 0 ? (
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
              <Link to={`/profile/${user.id}`}>
                <Flex>
                  <Image
                    src={
                      userProfile?.profile?.[0]?.profileImage ||
                      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFPuFP9rHe7ri8Ju.webp'
                    }
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
              </Link>
              <FollowButton userId={user.id} />
            </Flex>
          );
        })
      )}
    </div>
  );
};

export default UserList;
