import { Box, Button, Input, Text } from "@chakra-ui/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { PasswordInput } from "../ui/password-input"
import Logo from "../logo/Logo"

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate();

    const handleSubmit= (e: React.FormEvent)=> {
        e.preventDefault()
        console.log("Email:", email)
        console.log("password:", password)
    }

    const onLogin =() => {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
    }

    return(
        <>
            <Box display="flex" justifyContent="center" pt="10">
                <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
                    <Logo fontsize="36px"/>
                    <Text fontSize="24px" fontWeight="semibold">Login to circle</Text>
                    <form onSubmit={handleSubmit}>
                        <Input type="email" placeholder="Email" marginBlock='4' value={email} onChange={(e) => setEmail(e.target.value)}required/>
                        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                        <Link  to="/forgotpassword"><Text fontSize="12px" marginTop="2" marginBottom="3" textAlign="right" >Forgot Password?</Text></Link>
                        <Button type="submit" rounded="50px" backgroundColor="#04A51E" width='full' color="#FFFF" _hover={{
    backgroundColor: "#006811"}} onClick={onLogin}>Login</Button>
                    </form>               
                    <Text fontSize="12px" marginTop='2'>Don't have an account yet? <Link to="/register" className="text-[#04A51E]">Create Account</Link></Text>    
                </Box>
            </Box>
        </>
    )
}

export default Login