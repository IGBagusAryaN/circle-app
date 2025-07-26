import { Box, Button, Image, Input, Text, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { fetchProfile } from 'features/auth/services/auth-service';
import Logo from 'components/logo/Logo';
import Cookies from 'js-cookie';

const profileSchema = z.object({
  fullname: z.string().min(1, 'Full name is required'),
  bio: z.string().min(1, 'Bio is required'),
});

type ProfileFormInputs = z.infer<typeof profileSchema>;

const SetProfile = () => {
  const navigate = useNavigate();
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
  });


  // ganti file image dan preview image
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
  // ganti file image dan preview image

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsLoading(true);
    const userId = Cookies.get('userId');
    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'User ID not found. Please log in again.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
      });
      setIsLoading(false);
      return;
    }

    const updatedData = {
      ...data,
      userId,
      bannerImage: bannerFile ?? null,
      profileImage: profileFile ?? null,
    };

    try {
      const res = await fetchProfile(updatedData); //api
      if (res.status === 201) {
        Swal.fire({
          title: 'Success',
          text: res.data.message,
          icon: 'success',
          confirmButtonColor: '#04A51E',
          background: '#1D1D1D',
          color: '#fff',
        }).then(() => {
          navigate('/login');
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while logging in. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" py="10" px={8}>
      <Box
        width={["100%", "75%", "50%", "25%"]} 
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Logo fontsize="36px" />
        <Text fontSize="24px" fontWeight="semibold">
          Set your profile 🙌
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {/* Banner Upload */}
          <Box position="relative" textAlign="end" my={2}>
            <Image
              height="100px"
              mb={2}
              w="full"
              borderRadius="7px"
              src={
                bannerPreview ||
                'https://273774.fs1.hubspotusercontent-na1.net/hub/273774/hubfs/act3/images/placeholder.jpg?width=1920&height=1080&name=placeholder.jpg'
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
              <Button as="span" size="sm" colorScheme="blue" fontSize={12}>
                Set Banner
              </Button>
            </label>
            <Image
              src={
                profilePreview ||
                'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp'
              }
              boxSize="80px"
              borderRadius="full"
              fit="cover"
              alt="Profile Image"
              position="absolute"
              top="47px"
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

          {/* Full Name Input */}
          <Input
            {...register('fullname')}
            type="text"
            placeholder="Full Name"
            marginTop="4"
            width="full"
          />
          {errors.fullname && (
            <Text color="red.500" fontSize="xs" textAlign="left" mt="1.5">
              {errors.fullname.message}
            </Text>
          )}

          {/* Bio Input */}
          <Input
            {...register('bio')}
            type="text"
            placeholder="Bio"
            marginTop="4"
            width="full"
          />
          {errors.bio && (
            <Text color="red.500" fontSize="xs" textAlign="left" mt="1.5">
              {errors.bio.message}
            </Text>
          )}

          {/* Submit Button */}
          <Box marginTop={3} display="flex" justifyContent="center" alignItems="center">
               <Button
              rounded="50px"
              backgroundColor="#04A51E"
              color="#FFFF"
              _hover={{ backgroundColor: '#006811' }}
              disabled={isLoading}
              type='submit'
              width={'full'}
            >
              {isLoading ? <Spinner size="sm" /> : 'Save Profile'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SetProfile;
