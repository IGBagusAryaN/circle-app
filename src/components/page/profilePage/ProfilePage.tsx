import { Grid, GridItem } from "@chakra-ui/react"
import SideBarLeft from "../../sidebar/SideBarLeft"
import SideBarRight from "../../sidebar/SideBarRight"

import { useNavigate } from "react-router-dom";
import ProfileMiddleBar from "./ProfileMiddleBar";



function ProfilePage () {
    const navigate = useNavigate();
    const onLogout = () => {
      localStorage.removeItem("isAuthenticated");
      navigate("/login")
    }

    return (
        <div>
        <Grid templateColumns="1.5fr 3.5fr 2fr" gap="1" h="100vh" w="100vw">
            <GridItem h="full" >
                <SideBarLeft onClick={onLogout}/>
            </GridItem>
            <GridItem h="full" borderInline="1px solid" borderColor="gray.500" textAlign="left" position="relative" paddingTop="30px" overflowY="auto">
                <ProfileMiddleBar/>
            </GridItem>
            <GridItem h="full" overflowY="auto">
                <SideBarRight display="none"/>
            </GridItem>
        </Grid>   
        </div>
    )
}

export default ProfilePage