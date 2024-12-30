import React from 'react';
import Swal from 'sweetalert2';
import { Button } from '@chakra-ui/react';
import LogoutIcon from 'components/icons/LogoutIcon';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#4A5568',
      confirmButtonText: 'Yes, logout!',
      background: '#1D1D1D',
      color: '#fff',
      customClass: {
        popup: 'dark-popup',
        confirmButton: 'custom-confirm',
        cancelButton: 'custom-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');

        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          iconColor: '#48bb78',
          background: '#1D1D1D',
          color: '#fff',
          confirmButtonColor: '#38a169',
          customClass: {
            popup: 'dark-success-popup',
            confirmButton: 'custom-success-confirm',
          },
        }).then(() => {
          if (onClick) {
            onClick();
          }
          navigate('/login');
        });
      }
    });
  };

  return (
    <Button
      background="none"
      px="0"
      bottom="5"
      color="#FFFF"
      _hover={{ color: '#e6434e' }}
      onClick={handleLogout}
    >
      <LogoutIcon />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
