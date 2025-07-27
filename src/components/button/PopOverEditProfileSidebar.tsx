import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import {
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'components/ui/popover';
import useAccountStore from 'store/use.account.store';
import { updateProfile } from 'features/dashboard/services/profile.service';
import ButtonPrimary from './Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserTypes } from 'types/users.types';
import Cookies from 'js-cookie';

const profileSchema = z.object({
  fullname: z.string().optional(),
  bio: z.string().optional(),
  username: z.string().optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const PopoverEditProfile: React.FC<{ transform: string }> = ({ transform }) => {
  const { user, setUser } = useAccountStore();
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const { register, handleSubmit , reset} = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
      defaultValues: {
    fullname: '',
    bio: '',
    username: '',
  },
  });

  useEffect(() => {
  if (user) {
    reset({
      fullname: user.profile?.[0]?.fullname || '',
      bio: user.profile?.[0]?.bio || '',
      username: user.username || '',
    });
  }
}, [user]);


  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProfileFormInputs) => {
    const token = Cookies.get('token');
    if (!token) {
      Swal.fire({
        title: 'Unauthorized',
        text: 'User not logged in. Please login to continue.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
      });
      return;
    }

    const formData = new FormData();
    formData.append('fullname', data.fullname || '');
    formData.append('bio', data.bio || '');
    formData.append('username', data.username || '');
    if (bannerFile) formData.append('bannerImage', bannerFile);
    if (profileFile) formData.append('profileImage', profileFile);

    try {
      const res = await updateProfile(formData);
      if (res.status === 200) {
        const updatedUser: UserTypes = {
          id: user?.id || 0,
          username: data.username || user?.username || '',
          profile: [
            {
              fullname: data.fullname || user?.profile?.[0]?.fullname,
              bio: data.bio || user?.profile?.[0]?.bio,
              username: data.username || user?.profile?.[0]?.username,
              bannerImage: bannerFile
                ? res.data.bannerImage
                : user?.profile?.[0]?.bannerImage,
              profileImage: profileFile
                ? res.data.profileImage
                : user?.profile?.[0]?.profileImage,
            },
          ],
        };
        setUser(updatedUser);

        Swal.fire({
          title: 'Success!',
          text: res.data.message || 'Profile updated successfully.',
          icon: 'success',
          confirmButtonColor: '#04A51E',
          background: '#1D1D1D',
          color: '#fff',
          allowOutsideClick: false,
        });
      }
    } catch (error) {
      console.error('Error during profile update:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to save profile. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    }
  };

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
          right="0"
          mt="3"
          border="1px solid"
          borderColor="#FFFF"
          background="none"
          color="#FFFF"
          borderRadius="20px"
          _hover={{ background: '#FFFF', color: 'black' }}
        >
          Edit Profile
        </Button>
      </PopoverTrigger>
      <PopoverContent
        overflowY="auto"
        width="70vh"
        maxHeight="90vh"
        position="fixed"
        top="50%"
        left="50%"
        transform={transform}
        zIndex="1000"
        borderRadius="10px"
        boxShadow="lg"
        background="#1D1D1D"
      >
        <PopoverBody>
          <Text fontSize="18px">Edit Profile</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box my="20px">
              {user ? (
                <Box position="relative" textAlign="end" my={2}>
                  <Image
                    height="120px"
                    mb={2}
                    w="full"
                    borderRadius="7px"
                    src={
                      bannerPreview ||
                      user?.profile?.[0]?.bannerImage ||
                      '/path/to/default-banner.jpg'
                    }
                    alt="Banner Image"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    id="banner-upload"
                    onChange={handleBannerChange}
                  />
                  <label htmlFor="banner-upload">
                    <Button
                      as="span"
                      size="sm"
                      colorScheme="blue"
                      fontSize={12}
                    >
                      Set Banner
                    </Button>
                  </label>
                  <Image
                    src={
                      profilePreview ||
                      user?.profile?.[0]?.profileImage ||
                      '/path/to/default-banner.jpg'
                    }
                    boxSize="80px"
                    borderRadius="full"
                    fit="cover"
                    alt="Profile Image"
                    position="absolute"
                    top="77px"
                    left="10px"
                    border="4px solid"
                    borderColor="whiteAlpha.900"
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    id="profile-upload"
                    onChange={handleProfileChange}
                  />
                  <label htmlFor="profile-upload">
                    <Button
                      as="span"
                      size="sm"
                      colorScheme="blue"
                      fontSize={12}
                      ml={1}
                    >
                      Set Profile Pict
                    </Button>
                  </label>
                </Box>
              ) : (
                <Text></Text>
              )}

              <Input
                {...register('fullname')}
                type="text"
                placeholder="Full Name"
                marginTop="4"
                width="full"
              />
              <Input
                {...register('bio')}
                type="text"
                placeholder="Bio"
                marginTop="4"
                width="full"
              />
              <Input
                {...register('username')}
                type="text"
                placeholder="username"
                marginTop="4"
                width="full"
              />
            </Box>

            <Box marginTop={3}>
              <ButtonPrimary text="Save Profile" />
            </Box>
          </form>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverEditProfile;