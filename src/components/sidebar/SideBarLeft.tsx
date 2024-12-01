import { Box } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import React from 'react';
import Logo from 'components/logo/Logo';
// import ButtonPrimary from 'components/button/Button';
import LogoutButton from 'components/button/LogoutButton';
import HomeIcon from 'components/icons/HomeIcon';
import SearchIcon from 'components/icons/SearchIcon';
import HeartIcon from 'components/icons/HeartIcon';
import UserIcon from 'components/icons/UserIcon';
import PopoverCreateBtn from 'components/button/PopOverCreateBtn';

interface logOutProps {
  onClick: () => void;
}

const SideBarLeft: React.FC<logOutProps> = ({ onClick }) => {
  const location = useLocation(); // Get the current path
  const currentPath = location.pathname;

  // Function to check if the menu item is active
  const isActive = (path: string) => currentPath === path;

  return (
    <div>
      <Box h="100vh" textAlign="left" paddingX="40px" paddingY="20px" position="relative">
        <Logo fontsize="40px"></Logo>
        <Box marginTop="4" h="80%">
          <ul>
            <li>
              <Link
                to="/"
                className={`flex items-center gap-3 my-5 ${
                  isActive('/') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
                }`}
              >
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className={`flex items-center gap-3 my-5 ${
                  isActive('/search') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
                }`}
              >
                <SearchIcon />
                <span>Search</span>
              </Link>
            </li>
            <li>
              <Link
                to="/follows"
                className={`flex items-center gap-3 my-5 ${
                  isActive('/follows') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
                }`}
              >
                <HeartIcon hover="" />
                <span>Follows</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center gap-3 my-5 ${
                  isActive('/profile') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
                }`}
              >
                <UserIcon />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
          <PopoverCreateBtn transform="translate(49%, -95%)"/>
        </Box>
        <LogoutButton onClick={onClick} />
      </Box>
    </div>
  );
};

export default SideBarLeft;
