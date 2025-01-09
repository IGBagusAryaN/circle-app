import { Button } from "@chakra-ui/react"
import React from "react"

type Button = {
    text: string
}
const ButtonPrimary: React.FC<Button> = ({text}) => {
    
    return(
        <>
         <Button type="submit" rounded="50px" backgroundColor="#04A51E" width='full' color="#FFFF" _hover={{backgroundColor: "#006811"}}>{text}</Button>
        </>
    )
}

export default ButtonPrimary