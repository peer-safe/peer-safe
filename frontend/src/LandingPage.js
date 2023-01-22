import { Flex, Heading, Center } from "@chakra-ui/react";
// import { useTextC } from "./theme";
import './LandingPage.css';
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead } from 'wagmi';
import Typewriter from "typewriter-effect";
import { useContext, useEffect } from "react";
import { VaultContext } from "./VaultContextProvider";
// import { RsaContext } from "./RsaContextProvider";
const abi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "_vaultOwner",
            "type": "address"
          }
        ],
        "name": "getVault",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_userName",
            "type": "string"
          }
        ],
        "name": "deploy",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
];

const LandingPage = () => {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    // const textC = useTextC();
    const state = useContext(VaultContext);
    console.log("WHAT", state);
    const { config: getVaultConfig, error: getVaultPrepareError,
        isError: getVaultisPrepareError } = usePrepareContractWrite({
            address: '0x90Af8dfaEbCae541C28B364813A15332EE333813',
            abi: abi,
            functionName: 'getVault',
            args: [`${address}`],
            // structuralSharing: (prev, next) => (prev === next ? prev : next),
    });
    const { config: deployConfig, error: deployPrepareError,
        isError: deployisPrepareError } = usePrepareContractWrite({
            address: '0x90Af8dfaEbCae541C28B364813A15332EE333813',
            abi: abi,
            functionName: 'deploy',
            args: ['test'],
        });
    console.log("EVERYTHING", deployisPrepareError, deployPrepareError, getVaultisPrepareError, getVaultPrepareError);
    const { data: getVaultData, error: getVaultError, isError: getVaultIsError, write: getVault } = useContractRead(getVaultConfig);
    const { data: deployData, error: deployError, isError: deployIsError, write: deploy } = useContractWrite(deployConfig);
    const { isLoading: isGetVaultLoading, isSuccess: isGetVaultSuccess } = useWaitForTransaction({
        hash: getVaultData?.hash,
    });
    const { isLoading: isDeployLoading, isSuccess: isDeploySuccess } = useWaitForTransaction({
        hash: deployData?.hash,
    });
    console.log(getVaultError, getVaultIsError, deployError, deployIsError);
    getVault?.();
    useEffect(() => {
        if (isConnected && getVaultData) {
            console.log(getVaultData);
            console.log("SET FUCKING THAT WE HAVE THE VAULT 1")
            // WE GOT THE VAULT ADDRESS, LETS SET IT
            if (getVaultData !== "") {
                state.setVaultAddy(getVaultData);
            }
        }
        if (isConnected && deployData) {
            console.log(deployData);
            console.log("SET FUCKING THAT WE HAVE THE VAULT 2")
            getVault?.();
        }
        if (isConnected) {
            getVault?.();
            console.log("SET FUCKING THAT WE HAVE THE VAULT 3")
            
        }
    }, [isConnected, getVaultData, deployData, isDeploySuccess, getVault, state])
    if (isConnected && isDeploySuccess) {
        getVault?.();
        window.location.reload();
    }
    // if (isGetVaultSuccess) {
        //     console.log("SET FUCKING THAT WE HAVE THE VAULT 4")
        // }
        // if (getVaultIsError) {
            //     console.log(getVaultError);
            // }
            console.log("GENERAL", getVaultData, isGetVaultSuccess, isConnected, isDeploySuccess, deployData, isDeployLoading, isGetVaultLoading, isDeploySuccess, isGetVaultSuccess);

    function handleSignup(){ 
        if (!isConnected) {
            openConnectModal();
            return;
        }
        getVault?.();
        if (getVaultData) {
            console.log(getVaultData);
            // set got vault and value
            return
        }
        
        deploy?.();
    };

    return (
        <Center>
            {/* <img src = "https://cdn.discordapp.com/attachments/1027312951549513821/1066479185809387691/Peersafe_png.png" alt="title" /> */
            }
            <Flex flexDirection='column' alignItems='center' marginTop='0' marginBottom=''>
                {/* <Box  blur='10xl' borderRadius='1000000' marginTop='40%'>
                    <Flex flexDirection='row' alignItems='center' gap='1' margin='1' height='30px'>
                        <Heading fontWeight='thin' fontSize='15' color='white'> Made For NWHacks </Heading>
                    </Flex>
                </Box> */}
                <Flex flexDirection='row' alignItems='center' gap='1' marginTop='30%'>
                    <Heading as='h' color='white' size='2xl' fontFamily='Clash Display'>Store your data securely</Heading>
                </Flex>
                <Flex flexDirection='row' alignItems='center' gap='1'>
                    <Heading as='h3' color='grey' size='2xl' fontFamily='Clash Display'>with</Heading>
                    <Heading as='h3' color='grey' size='2xl' fontFamily='Clash Display'>decentralized encryption.</Heading>
                </Flex>
                <div className="typewriter">
                    <Typewriter
                    onInit={(typewriter)=>{
                        typewriter
                        .typeString("Take control of your data privacy and security with PeerSafe,<br />")
                        .typeString("a decentralized encrypted storage platform.").changeDelay(1)
                        .start();
                    }}
                    options={{
                        delay: 50
                    }}/>  
                </div>   
                <button className="glass-button" fontFamily='Poppins' onClick={() => handleSignup()}>Get Started</button>
            </Flex>
        </Center>
    );
 };
 export default LandingPage;