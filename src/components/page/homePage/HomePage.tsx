import { Grid, GridItem } from '@chakra-ui/react';
import SideBarLeft from '../../sidebar/SideBarLeft';
import SideBarRight from '../../sidebar/SideBarRight';
import { useNavigate } from 'react-router-dom';
import HomeMiddleBar from './HomeMiddleBar';
import BottomNavBar from 'components/sidebar/Navbar';


function Home() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div>
      <Grid
        templateColumns={{ base: '1fr', md: '1.5fr 3.5fr 2fr' }}
        gap="1"
        h="100vh"
        w="100%"
      >
        {/* Sidebar kiri - sembunyikan di mobile */}
        <GridItem
          h="full"
          display={{ base: 'none', md: 'block' }}
        >
          <SideBarLeft onClick={onLogout} />
        </GridItem>

        {/* Middle bar - selalu tampil */}
        <GridItem
          h="full"
          borderInline={{ base: 'none', md: '1px solid' }}
          borderColor="gray.700 !important"
          textAlign="left"
          position="relative"
          paddingTop="30px"
          overflowY="auto"
        >
          <HomeMiddleBar />
        </GridItem>

        {/* Sidebar kanan - sembunyikan di mobile */}
        <GridItem
          h="full"
          overflowY="auto"
          display={{ base: 'none', md: 'block' }}
        >
          <SideBarRight display="block" />
        </GridItem>
      </Grid>

      {/* ✅ Bottom nav khusus mobile */}
      <BottomNavBar />
    </div>
  );
}

export default Home;
