import { Grid, GridItem } from '@chakra-ui/react';
import SideBarLeft from '../../sidebar/SideBarLeft';
import SideBarRight from '../../sidebar/SideBarRight';
import { useNavigate } from 'react-router-dom';
import HomeMiddleBar from './HomeMiddleBar';

function Home() {
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div>
      <Grid templateColumns="1.5fr 3.5fr 2fr" gap="1" h="100vh" w="100%">
        <GridItem h="full">
          <SideBarLeft onClick={onLogout} />
        </GridItem>

        <GridItem
          h="full"
          borderInline="1px solid"
          borderColor="gray.700"
          textAlign="left"
          position="relative"
          paddingTop="30px"
          overflowY="auto"
        >
          <HomeMiddleBar />
        </GridItem>

        <GridItem h="full" overflowY="auto" className='hidden md:block'>
          <SideBarRight display="block" />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Home;
