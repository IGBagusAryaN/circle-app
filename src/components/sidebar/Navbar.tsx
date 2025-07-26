import { Box, Flex } from '@chakra-ui/react';
import HeartIcon from 'components/icons/HeartIcon';
import HomeIcon from 'components/icons/HomeIcon';
import SearchIcon from 'components/icons/SearchIcon';
import UserIcon from 'components/icons/UserIcon';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="#101010"
      borderTop="1px solid #e2e8f0"
      zIndex="999"
    >
      <Flex justify="space-around" align="center" paddingY="8px">
        <Link
          to="/"
          className={`flex items-center gap-3 my-5 text-[20px] ${
            isActive('/') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
          }`}
        >
          <HomeIcon size={28} />
        </Link>
        <Link
          to="/search"
          className={`flex items-center gap-3 my-5 text-[20px] ${
            isActive('/search') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
          }`}
        >
          <SearchIcon size={28} />
        </Link>
        <Link
          to="/follows"
          className={`flex items-center gap-3 my-5 text-[20px] ${
            isActive('/follows') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
          }`}
        >
          <HeartIcon size={28} />
        </Link>
        <Link
          to="/profile"
          className={`flex items-center gap-3 my-5 text-[20px] ${
            isActive('/profile') ? 'text-[#60d774]' : 'hover:text-[#60d774]'
          }`}
        >
          <UserIcon size={28} />
        </Link>
      </Flex>
    </Box>
  );
};

export default BottomNavBar;
