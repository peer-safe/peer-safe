import { Box, ButtonGroup, Flex, Heading, Spacer, useColorMode, IconButton, Img, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import './Navbar.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useTextC } from './theme.js';
import { FaMoon, FaSun } from "react-icons/fa";
import logo from './logo.png';
import "@fontsource/aileron";

const Navbar = () => {
    var {toggleColorMode, colorMode} = useColorMode();
    var textC = useTextC();
    return (
        <Flex className="navbar" minWidth='max-content' alignItems='center' gap='2' marginTop='10px'>
            <Box p='2' className="logo" height='65px' marginLeft='4' width='65px'>
            </Box>
            {/* <Text fontStyle="bold" fontSize='2xl' fontWeight='bold' color='facebook.50' fontFamily='Helvetica'>PeerSafe</Text> */}
            <Spacer />
            <ButtonGroup gap='2' marginEnd='4'>
                {/* <IconButton
                    rounded="full"
                    aria-label="change theme"
                    onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                /> */}
                <ConnectButton />
            </ButtonGroup>
        </Flex>
    );
 };

export { Navbar };
