// import logo from './logo.png';
import './App.css';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
// import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useTextC } from './theme.js';
import { Grid, GridItem, useColorMode } from '@chakra-ui/react';
import { Navbar } from './Navbar.js';
import LandingPage from './LandingPage';
import React, { useContext } from 'react';
import Footer from './Footer';
import { VaultContext, VaultContextProvider } from './VaultContextProvider';
import { FileUploadComponent } from './FileUpload';
import {  RsaContextProvider } from './RsaContextProvider';
const { chains, provider } = configureChains(
  [polygonMumbai],
  [
   alchemyProvider({ apiKey: 'Z-aaGEoMZCId3t9RDqRsfAH8BlHFL9DE' }),
    // publicProvider()
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

const MainHandler = () => { 
  const state = useContext(VaultContext);
  return (
    (state.vaultAddy !== "") ? <FileUploadComponent /> : <LandingPage />
  )
}

const App = () => {
  // const { address, isConnected } = useAccount();
  const { colorMode } = useColorMode();
  const textC = useTextC();
  // const state = useContext(VaultContext);
  // const rsaState = useContext(RsaContext);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={colorMode === 'light' ? lightTheme() : darkTheme()}>
        <VaultContextProvider>
          <RsaContextProvider>
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
                marginLeft='10'
                marginRight='10'
                marginTop='5'
                marginBottom='-50'
              >
              <GridItem pl='2' bg={"transparent"} area={'header'}>
                <Navbar />
              </GridItem>
              <GridItem pl='2' area={'main'} alignContent='center' alignItems='center'>
                <MainHandler />
              </GridItem>
              <GridItem pl='2' area={'footer'} alignContent='center' alignItems={'center'}>
              </GridItem>
          </Grid>
                <Footer />
            </div>
            </RsaContextProvider>
          </VaultContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export { App, VaultContext };
