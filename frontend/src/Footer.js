

import {
    // Box,
    // Container,
    // Stack,
    // Text,
    Link,
    // useColorModeValue,
    Spacer,
    Flex,
    Center
  } from '@chakra-ui/react';
  import './App.css';
  
  export default function SmallWithNavigation() {
    return (
        <Center>
            <Flex direction={'row'} gap='10'>
                    {/* <Spacer /> */}
                <Link href={'https://www.nwhacks.io/'} target="_blank">Made For @nwHacks</Link>
                    <Spacer />
                    <Link href={'https://youtu.be/dQw4w9WgXcQ'} target="_blank">About Us</Link>
                    {/* <Spacer /> */}
            </Flex>
        </Center>
    );
  }