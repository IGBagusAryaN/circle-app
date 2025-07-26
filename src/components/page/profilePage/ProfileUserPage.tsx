import { Grid, GridItem } from "@chakra-ui/react";
import SideBarLeft from "../../sidebar/SideBarLeft";
import SideBarRight from "../../sidebar/SideBarRight";
import { useNavigate } from "react-router-dom";
import ProfileUserMiddleBar from "./profileUserMiddleBar";
import Cookies from "js-cookie";
import BottomNavBar from "components/sidebar/Navbar";

function ProfileUserPage() {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("isAuthenticated"); // benar: hapus cookie
    navigate("/login");
  };

  return (
    <div>
      <Grid
        templateColumns={{ base: "1fr", md: "1.5fr 3.5fr 2fr" }}
        gap="1"
        h="100vh"
        w="100%"
      >
        {/* Sidebar kiri - disembunyikan di mobile */}
        <GridItem
          h="full"
          display={{ base: "none", md: "block" }}
        >
          <SideBarLeft onClick={onLogout} />
        </GridItem>

        {/* Middle bar - tampil di semua ukuran */}
        <GridItem
          h="full"
          borderInline={{ base: "none", md: "1px solid" }}
          borderColor="gray.700 !important"
          textAlign="left"
          position="relative"
          paddingTop={{ base: "10px", md: "30px" }}
          overflowY="auto"
        >
          <ProfileUserMiddleBar />
        </GridItem>

        {/* Sidebar kanan - disembunyikan di mobile */}
        <GridItem
          h="full"
          overflowY="auto"
          display={{ base: "none", md: "block" }}
        >
          <SideBarRight display="block" />
        </GridItem>
      </Grid>
            <BottomNavBar />
    </div>
  );
}

export default ProfileUserPage;
