import { Box, Input, Text } from "@chakra-ui/react"
import ButtonPrimary from "components/button/Button";
import Logo from "components/logo/Logo";
import { useRef } from "react"

    

const ResetPassword = () =>{
    
    const resPasswordInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null)
      
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("New Password:", resPasswordInputRef.current?.value);
      console.log("Confirm New Password:", passwordInputRef.current?.value)
    }

    return (
        <div>
            <Box display="flex" justifyContent="center" pt="10">
             <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
                    <Logo fontsize="36px"/>
                    <Text fontSize="24px" fontWeight="semibold">Reset Password</Text>
                    <form onSubmit={handleSubmit}>
                        <Input type="password" placeholder="New Password" marginTop='4'ref={resPasswordInputRef} required/>
                        <Input type="password" placeholder="Confirm New Password" marginTop='4' marginBottom="3" ref={passwordInputRef} required/>
                       <ButtonPrimary text="Create New Password"/>
                    </form>                
                </Box>
            </Box>
        </div>
    )
}

export default ResetPassword