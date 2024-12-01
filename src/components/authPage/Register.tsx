import { Box, Input, Text } from "@chakra-ui/react"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { PasswordInput } from "../ui/password-input"
import ButtonPrimary from "components/button/Button"
import Logo from "components/logo/Logo"

const Register= () => {
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail]= useState<string>('')
    const [password, setPassword] =useState<string>('')


    const handleFullnameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value)
    }
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e:React.FormEvent) =>{
        e.preventDefault()
        console.log("Fullname:", fullName)
        console.log("Email:", email)
        console.log("Password:", password)
    }

    return(
        <Box display="flex" justifyContent="center" pt="10">
            <Box width="25%" display="flex" flexDirection="column" alignItems="flex-start">
               <Logo fontsize="36px"/>
               <Text fontSize="24px" fontWeight="semibold">Create Account Circle</Text>
               <form onSubmit={handleSubmit}>
                   <Input type="text" placeholder="Full name" marginTop='4' value={fullName} onChange={handleFullnameChange} required/>
                   <Input type="email" placeholder="Email" marginBlock='4' value={email} onChange={handleEmailChange} required/>
                   <PasswordInput value={password} onChange={handlePasswordChange} placeholder="Password" mb="3" required/>
                   <ButtonPrimary text="Create Account"/>
               </form>               
               <Text fontSize="12px" marginTop='2'>Already have account? <Link to="/login" className="text-[#04A51E] hover:text-[#006811]">Login</Link></Text>    
           </Box>
       </Box>
    )
}

export default Register