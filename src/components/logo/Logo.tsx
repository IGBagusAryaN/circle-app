import { Text } from "@chakra-ui/react"

type LogoCircle ={
    fontsize: string
}

const Logo: React.FC<LogoCircle> =({fontsize}) => {
    return (
        <>
          <Text color="#04A51E" fontSize={fontsize} fontWeight="bold">circle</Text>
        </>
    )
}

export default Logo