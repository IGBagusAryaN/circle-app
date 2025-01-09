import { Box, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput } from '../ui/password-input';
import ButtonPrimary from 'components/button/Button';
import Logo from 'components/logo/Logo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';

import Swal from 'sweetalert2';
import { fetchRegister } from 'features/auth/services/auth-service';

const registerSchema = z.object({
  username: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    // console.log(data);
    fetchRegister(data) //api
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (res.status === 200) {
          Cookies.set('userId', JSON.stringify(data.user.id));
          Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonColor: '#04A51E',
            background: '#1D1D1D',
            color: '#fff',
            allowOutsideClick: false,
          }).then(() => {
            navigate('/setprofile');
          });
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);

        Swal.fire({
          title: 'Error',
          text:
            error.message ||
            'An error occurred while logging in. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#E53E3E',
          background: '#1D1D1D',
          color: '#fff',
          allowOutsideClick: false,
        });
      });
  };

  return (
    <Box display="flex" justifyContent="center" pt="10">
      <Box
        width="25%"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Logo fontsize="36px" />
        <Text fontSize="24px" fontWeight="semibold">
          Create Account Circle
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            {...register('username')}
            type="text"
            placeholder="Username"
            marginTop="4"
            width={'full'}
          />
          {errors.username && (
            <Text
              color="red.500"
              fontSize="xs"
              textAlign={'left'}
              marginTop="1.5"
            >
              {errors.username.message}
            </Text>
          )}

          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            marginBlock="4"
            width={'full'}
          />
          {errors.email && (
            <Text
              color="red.500"
              fontSize="xs"
              textAlign={'left'}
              marginTop="1.5"
            >
              {errors.email.message}
            </Text>
          )}

          <PasswordInput {...register('password')} placeholder="Password" />
          {errors.password && (
            <Text
              color="red.500"
              fontSize="xs"
              textAlign={'left'}
              marginTop={1.5}
            >
              {errors.password.message}
            </Text>
          )}

          <Box marginTop={3}>
            <ButtonPrimary text="Create Account" />
          </Box>
        </form>
        <Text fontSize="12px" marginTop="2">
          Already have account?{' '}
          <Link to="/login" className="text-[#04A51E] hover:text-[#006811]">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Register;
