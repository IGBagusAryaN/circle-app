import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { getAllUsers } from 'features/dashboard/services/users.service';
import React, { useEffect } from 'react';
import useAccountStore from 'store/use.account.store';
import { UserTypes } from 'types/users.types';
import Cookies from 'js-cookie';
import useSuggestedUsers from 'features/dashboard/services/suggest.service';
import { Link } from 'react-router-dom';
import FollowButton from 'components/button/FollowButton';
import PopoverEditProfile from 'components/button/PopOverEditProfileSidebar';
import { LottieAnimation } from 'components/lottie';

interface DisplaySideBar {
  display: string;
}

const SideBarRight: React.FC<DisplaySideBar> = ({ display }) => {
  const { user, setUser } = useAccountStore();
  const { suggestedUsers, isLoading } = useSuggestedUsers();

  const retrieveUserProfile = async () => {
    const token = Cookies.get('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const decoded: { id: number } = JSON.parse(atob(token.split('.')[1]));
      const allUsers = await getAllUsers(token);
      const loggedInUser = allUsers.find((u: UserTypes) => u.id === decoded.id);

      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error('Error in retrieveUserProfile:', error);
    }
  };

  // 🔹 Panggil hanya sekali saat mount
  useEffect(() => {
    if (!user) {
      retrieveUserProfile();
    }
  }, [user]);

  if (!user || !user.profile) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <LottieAnimation />
      </div>
    );
  }

  return (
    <div>
      <Box>
        <Box p="20px">
          {user ? (
            <Box backgroundColor="#262626" borderRadius="5px" display={display}>
              <Box p="5">
                <Text textAlign="left" fontSize="24px" fontWeight="bold">
                  My Profile
                </Text>

                <Box position="relative" mt="3">
      <Image
  key={user.profile[0]?.bannerImage} // 👈 ini penting
  h="100px"
  w="full"
  borderRadius="7px"
  objectFit="cover"
  src={
    user.profile[0]?.bannerImage?.trim()
      ? user.profile[0]?.bannerImage
      : "https://via.placeholder.com/1920x1080"
  }
  alt="Banner Image"
/>
                  <Image
                    src={
                      user.profile[0]?.profileImage ||
                      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                    }
                    boxSize="80px"
                    borderRadius="full"
                    fit="cover"
                    alt="Profile Image"
                    position="absolute"
                    top="57px"
                    left="10px"
                    border="4px solid"
                    borderColor="whiteAlpha.900"
                  />
                  <Box textAlign="right">
                    <PopoverEditProfile transform="translate(-117%, -41%)" />
                  </Box>
                </Box>

                <Box mt="5">
                  <Text textAlign="left" fontSize="20px" fontWeight="bold">
                    {user.profile[0]?.fullname || 'No fullname'}
                  </Text>
                  <Text textAlign="left" fontSize="12px" color="gray.400">
                    @{user.username}
                  </Text>
                  <Text textAlign="left" fontSize="14px" mt={2}>
                    {user.profile[0]?.bio || 'No bio available'}
                  </Text>

                  <Flex mt="4" gap="3">
                    <Text fontWeight="bold" fontSize="14px">
                      <div className="text-[16px] font-normal text-gray-400 ms-1">
                        <span className="text-white font-bold">
                          {user.followers?.length || 0}
                        </span>{' '}
                        Followers
                      </div>
                    </Text>
                    <Text fontWeight="bold" fontSize="14px">
                      <div className="text-[16px] font-normal text-gray-400 ms-1">
                        <span className="text-white font-bold">
                          {user.following?.length || 0}
                        </span>{' '}
                        Following
                      </div>
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Box>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <LottieAnimation />
            </div>
          )}
          <Box backgroundColor="#262626" borderRadius="5px" mt="2">
            <Box p="5">
              <Text textAlign="left" fontSize="16px" fontWeight="bold">
                Suggested For You
              </Text>
              {isLoading ? (
                <div className="flex flex-col justify-center items-center">
                  <LottieAnimation />
                </div>
              ) : suggestedUsers.length > 0 ? (
                suggestedUsers.map((user) => (
                  <Box
                    key={user.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    my="4"
                    pt="2"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={3}
                      textAlign={'left'}
                    >
                      <Image
                        src={
                          user.profileImage && user.profileImage.trim() !== ''
                            ? user.profileImage
                            : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                        }
                        boxSize="40px"
                        borderRadius="full"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp';
                        }}
                      />

                      <Box>
                        <Link to={`/profile/${user.id}`}>
                          <Text fontWeight="bold">
                            {user.fullname || 'No Name'}
                          </Text>
                          <Text fontSize="14px" color="gray.500">
                            @{user.username}
                          </Text>
                        </Link>
                      </Box>
                    </Box>
                    <FollowButton userId={user.id} />
                  </Box>
                ))
              ) : (
                <Text marginBlock="10">No suggestions available.</Text>
              )}
            </Box>
          </Box>
          <Box backgroundColor="#262626" borderRadius="5px" mt="2">
            <Box p="5">
              <Text textAlign="left" fontSize="14px">
                Developed By <span className="font-bold">Bagus Arya👋</span>
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SideBarRight;
