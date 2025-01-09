import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput } from '../ui/password-input';
import Logo from '../logo/Logo';
import Swal from 'sweetalert2';
import { fetchLogin } from 'features/auth/services/auth-service';
import Cookies from 'js-cookie';
import { useAuthStore } from 'store/use.auth.store';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    fetchLogin(data) //api
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (res.status === 200) {
          const { id, username, email, token } = res.data;

          if (!id) {
            console.error('User ID is missing in API response');
          }
      
          Cookies.set('token', token);
          useAuthStore.getState().setUser({ id, username, email });
          Cookies.remove('userId');
          Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonColor: '#04A51E',
            background: '#1D1D1D',
            color: '#fff',
            allowOutsideClick: false,
          }).then(() => {
            navigate('/');
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
          Login to Circle
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <Input
            {...register('email')}
            type="text"
            placeholder="Email"
            marginBlock="4"
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

          <Link to="/forgotpassword">
            <Text
              fontSize="12px"
              marginTop="2"
              marginBottom="3"
              textAlign="right"
            >
              Forgot Password?
            </Text>
          </Link>

          <Button
            type="submit"
            rounded="50px"
            backgroundColor="#04A51E"
            width="full"
            color="#FFFF"
            _hover={{ backgroundColor: '#006811' }}
          >
            Login
          </Button>
        </form>
        <Text fontSize="12px" marginTop="2">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#04A51E]">
            Create Account
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
