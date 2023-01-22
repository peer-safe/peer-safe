import { Box, ButtonGroup, Flex, Heading, Spacer, Text, useColorMode, IconButton, Img, Center } from "@chakra-ui/react";
import { useTextC } from "./theme";



const LandingPage = () => {
    const textC = useTextC();
    return (
        <Center>
            {/* <img src = "https://cdn.discordapp.com/attachments/1027312951549513821/1066479185809387691/Peersafe_png.png" alt="title" /> */
            }
            <Flex flexDirection='column' alignItems='center' marginTop='10'>
                {/* <Box  blur='10xl' borderRadius='1000000' marginTop='40%'>
                    <Flex flexDirection='row' alignItems='center' gap='1' margin='1' height='30px'>
                        <Heading fontWeight='thin' fontSize='15' color='white'> Made For NWHacks </Heading>
                    </Flex>
                </Box> */}
                <Flex flexDirection='row' alignItems='center' gap='1' marginTop='30%'>
                    <Heading as='h3' color='white' size='xl' fontFamily='Clash Display'>Store </Heading>
                    <Heading as='h3' color='white' size='xl' fontFamily='Clash Display'>your data</Heading>
                    <Heading as='h3' color='white' size='xl' fontFamily='Clash Display'>securely</Heading>
                </Flex>
                <Flex flexDirection='row' alignItems='center' gap='1'>
                    <Heading as='h3' color='grey' size='xl' fontFamily='Clash Display'>with</Heading>
                    <Heading as='h3' color='grey' size='xl' fontFamily='Clash Display'>decentralized encryption</Heading>
                </Flex>
                <Text color='gray.300' marginTop='20px' maxWidth='490px' align='center' fontWeight='light' fontFamily='Poppins'>Take control of your data privacy and security with PeerSafe, a decentralized encrypted storage platform.</Text>
                {/* <Flex flexDirection='row' alignItems='center' gap='1'>
                    <Heading as='h3' color='white'size='xl' fontFamily='Clash Display'>
                        Who all have access to your data?
                    </Heading>
                </Flex> */}
            </Flex>
        </Center>  
    );
 };


export default LandingPage;