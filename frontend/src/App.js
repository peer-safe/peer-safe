import logo from './logo.png';
import './App.css';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
//import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useTextC } from './theme.js';
import { Box, Button, Center, Flex, Grid, GridItem, Spacer, useToast, Text, Link, useColorMode } from '@chakra-ui/react';
import { Navbar } from './Navbar.js';
import LandingPage from './LandingPage';

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
//    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Mumbai USDC Faucet',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const App = () => {
  const { address, isConnected } = useAccount();
  const { colorMode } = useColorMode();
  const textC = useTextC();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={colorMode === 'light' ? lightTheme() : darkTheme()}>
        <div className="App">
          <Grid
                templateAreas={`"header"
                "main"
                "footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                gridTemplateColumns={'1fr'}
                height='100vh'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
                textColor={textC}
          >
              <GridItem pl='2' bg={"transparent"} area={'header'}>
                <Navbar />
              </GridItem>
              <GridItem pl='2' area={'main'} alignContent='center' alignItems='center'>
                <LandingPage />
              </GridItem>
          </Grid>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
