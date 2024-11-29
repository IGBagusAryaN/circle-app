import { Grid, GridItem } from "@chakra-ui/react"
import SideBarLeft from "./SideBarLeft"
import SideBarRight from "./SideBarRight"
import MiddleBar from "./MiddleBar"
import { useNavigate } from "react-router-dom";


function Home () {
    const navigate = useNavigate();
    const onLogout = () => {
      localStorage.removeItem("isAuthenticated");
      navigate("/login")
    }

    return (
        <div>
        <Grid templateColumns="1.5fr 3.5fr 2fr" gap="1" h="100vh">
        <GridItem h="full" >
            <SideBarLeft onClick={onLogout}/>
        </GridItem>

        <GridItem h="full" borderInline="1px solid" borderColor="gray.500" textAlign="left" position="relative" paddingTop="30px" overflowY="auto">
            <MiddleBar/>
        </GridItem>
        
        <GridItem h="full" overflowY="auto">
        <SideBarRight/>
        </GridItem>
        </Grid>   
        </div>
    )
}

export default Home