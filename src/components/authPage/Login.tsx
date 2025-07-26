import { Box, Button, Input, Spinner, Text } from '@chakra-ui/react';
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
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    if (window.innerWidth < 1024) {
      Swal.fire({
        title: 'Error',
        text: 'Login is only available on laptops. Please use a laptop to login.',
        icon: 'error',
        confirmButtonColor: '#E53E3E',
        background: '#1D1D1D',
        color: '#fff',
        allowOutsideClick: false,
      });
      return;
    }

    setIsLoading(true);
    
    fetchLogin(data)
      .then((res) => {
        const data = res.data;
        if (res.status === 200) {
          Cookies.set('token', data.token);
         setUser(data.user, data.token); // ✅ kirim user dan token

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
          setIsLoading(false);
        }
      })
      .catch((error) => {
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
        setIsLoading(false);
      });
  };

  return (
    <Box display="flex" justifyContent="center" pt="10" px={8}>
      <Box
        width={["100%", "75%", "50%", "25%"]} 
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Logo fontsize="40px" />
        <Text fontSize="28px" fontWeight="semibold">
          Login to Circle
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: "100%" }}>
          <div className='mb-4'>
          <Input
            {...register('email')}
            type="text"
            placeholder="Email"
            marginTop="4"
            fontSize="16px"
          />
          {errors.email && (
            <Text
              color="red.500"
              fontSize="xs"
              textAlign={'left'}
              marginTop="1.5"
              marginBottom="4"

            >
              {errors.email.message}
            </Text>
          )}

          </div>

          <PasswordInput {...register('password')} placeholder="Password" fontSize="16px"/>
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
              fontSize={["10px", "12px"]}
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
            fontSize="16px"
            color="#FFFF"
            disabled={isLoading}
            _hover={{ backgroundColor: '#006811' }}
          >
            {isLoading ? <Spinner size="sm" /> : 'Login'}
          </Button>
        </form>
        <Text fontSize={["12px", "14px"]} marginTop="3">
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
