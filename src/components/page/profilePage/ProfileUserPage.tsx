import { Grid, GridItem } from "@chakra-ui/react"
import SideBarLeft from "../../sidebar/SideBarLeft"
import SideBarRight from "../../sidebar/SideBarRight"
import { useNavigate } from "react-router-dom";
import ProfileUserMiddleBar from "./profileUserMiddleBar";
import Cookies from "js-cookie";

function ProfileUserPage () {
    const navigate = useNavigate();
    const onLogout = () => {
      Cookies.get("isAuthenticated");
      navigate("/login")
    }

    return (
        <div>
        <Grid templateColumns="1.5fr 3.5fr 2fr" gap="1" h="100vh" w="100%">
            <GridItem h="full" >
                <SideBarLeft onClick={onLogout}/>
            </GridItem>
            <GridItem h="full" borderInline="1px solid" borderColor="gray.700" textAlign="left" position="relative" paddingTop="30px" overflowY="auto">
                <ProfileUserMiddleBar/>
            </GridItem>
            <GridItem h="full" overflowY="auto">
                <SideBarRight display="block"/>
            </GridItem>
        </Grid>   
        </div>
    )
}

export default ProfileUserPage