import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Input, Spinner, Text } from '@chakra-ui/react';
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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserTypes } from 'types/users.types';
import Cookies from 'js-cookie';
import LogoutButton from './LogoutButton';

const profileSchema = z.object({
  fullname: z.string().optional(),
  bio: z.string().optional(),
  username: z.string().optional(),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

interface logOutProps {
  onClick?: () => void;
}

interface PopoverEditProfileProps extends logOutProps {
  transform: object;
}

const PopoverEditProfile: React.FC<PopoverEditProfileProps> = ({
  transform,
  onClick,
}) => {
  const { user, setUser } = useAccountStore();
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<ProfileFormInputs>({
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
  }, [user, reset]);

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Banner selected:', file);
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Profile selected:', file);
      setProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProfileFormInputs) => {
  const token = Cookies.get("token");
  if (!token) {
    Swal.fire({
      title: "Unauthorized",
      text: "User not logged in. Please login to continue.",
      icon: "error",
      confirmButtonColor: "#E53E3E",
    });
    return;
  }

  const formData = new FormData();
  formData.append("fullname", data.fullname || "");
  formData.append("bio", data.bio || "");
  formData.append("username", data.username || "");
  if (bannerFile) formData.append("bannerImage", bannerFile);
  if (profileFile) formData.append("profileImage", profileFile);

  try {
    setIsLoading(true);
    const res = await updateProfile(formData);

    if (res.status === 200) {
      // 🔥 langsung ambil user baru dari API response
      const updatedUser: UserTypes = res.data.user;

      // update Zustand
      setUser(updatedUser);

      Swal.fire({
        title: "Success!",
        text: res.data.message || "Profile updated successfully.",
        icon: "success",
        confirmButtonColor: "#04A51E",
        background: "#1D1D1D",
        color: "#fff",
        allowOutsideClick: false,
      });
    }
  } catch (error) {
    console.error("Error during profile update:", error);
    Swal.fire({
      title: "Error",
      text: "Failed to save profile. Please try again later.",
      icon: "error",
      confirmButtonColor: "#E53E3E",
      background: "#1D1D1D",
      color: "#fff",
      allowOutsideClick: false,
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button
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
        width={{ base: '90vw', md: '70vh' }}
        maxHeight="90vh"
        position="fixed"
        mt={10}
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
                  {/* Banner Image */}
                  <Image
                    height="120px"
                    w="full"
                    borderRadius="7px"
                    src={
                      bannerPreview ||
                      user?.profile?.[0]?.bannerImage ||
                      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
                    }
                    alt="Banner Image"
                  />

                  {/* Profile Image */}
                  <Image
                    src={
                      profilePreview ||
                      user?.profile?.[0]?.profileImage ||
                      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
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

                  {/* Desktop File Upload */}
                  <div className="flex justify-end mt-2">
                    <div className="hidden md:block">
                      <Input
                        type="file"
                        accept="image/*"
                        display="none"
                        id="banner-upload-desktop"
                        onChange={handleBannerChange}
                      />
                      <label htmlFor="banner-upload-desktop">
                        <Button
                          as="span"
                          size="sm"
                          colorScheme="blue"
                          fontSize={12}
                        >
                          Set Banner
                        </Button>
                      </label>
                    </div>
                    <div className="hidden md:block">
                      <Input
                        type="file"
                        accept="image/*"
                        display="none"
                        id="profile-upload-desktop"
                        onChange={handleProfileChange}
                      />
                      <label htmlFor="profile-upload-desktop">
                        <Button
                          as="span"
                          size="sm"
                          colorScheme="blue"
                          fontSize={12}
                          ml={2}
                        >
                          Set Profile Pict
                        </Button>
                      </label>
                    </div>
                  </div>
                </Box>
              ) : null}

              {/* Mobile File Upload */}
              <div className="flex items-center mt-12 gap-1">
                <div className="w-full block md:hidden">
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    id="banner-upload-mobile"
                    onChange={handleBannerChange}
                  />
                  <label htmlFor="banner-upload-mobile">
                    <Button
                      as="span"
                      width={'full'}
                      colorScheme="blue"
                      fontSize={12}
                    >
                      Set Banner
                    </Button>
                  </label>
                </div>
                <div className="w-full block md:hidden">
                  <Input
                    type="file"
                    accept="image/*"
                    display="none"
                    id="profile-upload-mobile"
                    onChange={handleProfileChange}
                  />
                  <label htmlFor="profile-upload-mobile">
                    <Button
                      as="span"
                      width={'full'}
                      colorScheme="blue"
                      fontSize={12}
                    >
                      Set Profile Pict
                    </Button>
                  </label>
                </div>
              </div>

              {/* Form Inputs */}
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
                placeholder="Username"
                marginTop="4"
                width="full"
              />
            </Box>

            <Button
              mt="2"
              type="submit"
              rounded="10px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: '#006811' }}
              disabled={loading}
              width={'full'}
            >
              {loading ? <Spinner size="xs" /> : 'Save'}
            </Button>
          </form>

          {/* Mobile Logout */}
          <div className="mt-5 block md:hidden">
            <LogoutButton onClick={onClick} />
          </div>
        </PopoverBody>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  );
};

export default PopoverEditProfile;
