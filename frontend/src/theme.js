// theme.js

// 1. import `extendTheme` function
import { extendTheme, useColorMode } from '@chakra-ui/react';
// import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
    initialColorMode: 'white',
    useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme(
    { config }
)

const useTextC = () => { 
    const { colorMode } = useColorMode();
    return colorMode === 'light' ? 'gray.800' : 'facebook.100';
}

export {
    theme,
    useTextC
};
