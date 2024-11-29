import { Box, Input, Text} from "@chakra-ui/react"
import ButtonPrimary from "components/button/Button"
import Logo from "components/logo/Logo"
import { useState } from "react"
import { Link } from "react-router-dom"


const ForgotPassword = () =>{
    const [email, setEmail] = useState<string>('')

    const handleEmailChange  =(e:React.ChangeEvent<HTMLInputElement>)=> {
        setEmail(e.target.value)
    }

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        console.log("Email :", email)
    }
    return(
        <>
            <Box display="flex" justifyContent="center" pt="10">
                <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
                    <Logo fontsize="36px"/>
                    <Text fontSize="24px" fontWeight="semibold">Forgot Password</Text>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="Email" marginTop='4'marginBottom="3" value={email} onChange={handleEmailChange} required/>
                        <ButtonPrimary text="Send Instruction"/>
                    </form>                   
                    <Text fontSize="12px" marginTop='2'>Already have account? <Link to="/login" className="text-[#04A51E]">Login</Link></Text>
                </Box>
            </Box>
            
        </>
    )
}

export default ForgotPassword