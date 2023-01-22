// import { EditIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Text, Center, Button} from "@chakra-ui/react";
import { useEffect, useState, useRef, useContext } from "react";
// import FocusLock from "react-focus-lock";
import { RsaContext } from "./RsaContextProvider";
import {Buffer} from 'buffer';
// import NodeRSA from "node-rsa";
// import EncryptRsa from "encrypt-rsa";
import { pki, util, random, cipher } from "node-forge";

import { create } from "ipfs-http-client";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { VaultContext } from "./VaultContextProvider";
// import { writeFileSync } from "fs";
const projectId = "2Kga1iYiyhaeSARSN7QS1vKOjnI";
const projectSecret = "d000d0df4fcac3a8a3adb529cc6f9dfc";
const authorization =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const ipfsClient = create({
    url: "https://ipfs.infura.io:5001",
    headers: {
        authorization
    }
    }
);

const abi = [
    {
        "inputs": [],
        "name": "getAllFiles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_fileType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_ipfsHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_key",
                        "type": "string"
                    }
                ],
                "internalType": "struct File[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "fileType",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ipfsHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            }
        ],
        "name": "createFile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const FileUploadComponent = () => {
    const [files, setFiles] = useState([]);
    const [open, setIsOpen] = useState(false);
    const rsaContext = useContext(RsaContext);
    const state = useContext(VaultContext);
    console.log("BRUH WHAT???", state?.vaultAddy);
    // if (files.length === 0) {
    //     setFiles([{ name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 },
    //     { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 },
    //     { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 },
    //     { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 },
    //     { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }]);
    // }

    // if (files.length === 5) {
    //     setFiles(files.push(...[{ name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }, { name: "test", size: 100 }]));
    // }
    // if (files.length == 0) {
    //     return;
    // }
    // const [fileComponents, setFileComponents] = useState([]);
    // useEffect(() => {
    // if (files.length > 0) {
    console.log("MAPPING", files);
    // setFileComponents(files.map((file, index) => {
    const f = async (fil, i) => {
        console.log("map", fil);
        const ipfsHash = fil._ipfsHash;
        const keyHash = fil._key;
        // let enc_file_data_t = ipfsClient.(ipfsHash);
        const enc_file_data_b = await fetch(`https://ipfs.spongeboi.com/ipfs/${ipfsHash}`);
        const key_file_data_b = await fetch(`https://ipfs.spongeboi.com/ipfs/${keyHash}`)
        .then(response => response.body)
        .then(body => {
          const reader = body.getReader();
          return new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  break;
                }
                controller.enqueue(value);
              }
              controller.close();
            }
          });
        })
        .then(stream => new Response(stream).json());
        const enc_file_data = await (await enc_file_data_b.blob()).text();
        // const key_file_data = await key_file_data_b.body.getReader();
        // get json from blob
        // const enc_key_json = await key_file_data.json();
        console.log("enc_file_data", enc_file_data, key_file_data_b);
        // let enc_file_data = [];
        // for await (const chunk of enc_file_data_t) enc_file_data.push(chunk);
        // enc_file_data = Buffer.concat(enc_file_data);
        // let enc_key_data_t = await ipfsClient.cat(keyHash);
        // let enc_key_data = [];
        // for await (const chunk of enc_key_data_t) enc_key_data.push(chunk);
        // enc_key_data = Buffer.concat(enc_key_data);
        // console.log("enc_file_data", enc_file_data, enc_key_data);
        // const enc_key_json = JSON.parse(enc_key_data.toString());
        // console.log("enc_key_json", enc_key_json);
        const { key: encKeyB4, iv: ivB4 } = key_file_data_b;
        const encKey = util.decode64(encKeyB4);
        const iv = util.decode64(ivB4);
        // console.log("encKey", encKey, iv);
        console.log("rsaContext", rsaContext.rsaKey.toString());
        const pk = pki.privateKeyFromPem(rsaContext.rsaKey.toString());
        const decryptedKey = pk.decrypt(encKey);
        console.log("decryptedKey", decryptedKey.toString());
        // const encFileBlob = new Blob([enc_file_data], {
        //     type: "application/octet-stream",
        // });
        // function getFileAsTextFromBlob(blob) {
        //     return new Promise((resolve, reject) => {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             resolve(e.target?.result);
        //         };
        //         reader.onerror = reject;
        //         reader.readAsText(blob);
        //     });
        // }
        // const textFromBlob = await getFileAsTextFromBlob(encFileBlob);
        // const b65t = util.decode64(textFromBlob);
        const b = util.hexToBytes(enc_file_data);
        const decipher = cipher.createDecipher('AES-CBC', decryptedKey.toString());
        decipher.start({ iv: iv });
        // console.log(b65t);
        decipher.update(util.createBuffer(b, 'binary'));
        const result = decipher.finish();
        console.log("DECRYPTED 222", result, util.encode64(decipher.output.data.toString('utf8')));
        
        // console.log(decipher.output.data.toString('utf8'));
        // const decoder = new TextDecoder('utf-8');
        // const text = decoder.decode(decipher.output.data);
        // writeFileSync(
        //     fil._name, decipher.output.getBytes(), { encoding: 'binary' }
        // );
        const element = document.createElement(`a`);
        const file = new Blob([decipher.output.data.toString()], { type: fil._fileType });
        element.href = URL.createObjectURL(file);
        element.download = fil._name;
        document.body.appendChild(element);
        element.click();
        // URL.revokeObjectURL(element.href);
        // console.log("text", text);
    };
    const FileComponents = () => {
        const fileComponents = [];
        // useEffect(async () => {
            for (let i = 0; i < files.length; i++) {
                fileComponents.push(
                    <Box key={i} width='250px' height={'100px'} className="glass-panel">
                        <Text>{files[i]._name}</Text>
                        <Button onClick={() => { f(files[i], i) }}>Download</Button>
                        {/* <Text>{file._}</Text> */}

                    </Box>
                );
            }
        // }, [files]);
        return (
            <SimpleGrid spacing={4} columns={5} width="inherit" height={"inherit"}>
                {fileComponents}
                <Button width='250px' height={'100px'} className="glass-panel" onClick={handleFileUpload}>+</Button>
            </SimpleGrid>
            );
    }

    // },
    // [files]);
    // console.log(files, fileComponents);

    const [file, setFile] = useState (null);
    const inputRef = useRef(null);
    // const inputRef2 = useRef(null);
    
    const handleUploadClick = () => {
        // 👇 We redirect the click event onto the hidden input element
        inputRef.current?.click();
    };
    const handleFileChange = (e) => {
        if (!e) {
            return;
        }
        if (!e.target.files) {
          return;
        }
    
        setFile(e.target.files[0]);
    
        // 🚩 do the file upload here normally...
    };
    const toBase64 = f => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(f);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleRSAFileChange = (e) => {
        if (!e) {
            return;
        }
        if (!e.target.files) {
          return;
        }
        console.log("LLL?")
        // setFile(e.target.files[0]);
        toBase64(e.target.files[0]).then((result) => {
            console.log("RESULT", result);
            rsaContext.setRsaKey(result);
        });
        // 🚩 do the file upload here normally...
    };
    const [argState, setArgState ] = useState(['', '', '', '']);
    // if vaultContext.vaultAddy == '' {
    // }

    console.log("VAULT", state?.vaultAddy);
    const { config: createFileConfig, error: createFilePrepareError,
        isError: createFileisPrepareError } = usePrepareContractWrite({
            address: state?.vaultAddy,
            abi: abi,
            functionName: 'createFile',
            args: argState,
            // args: ['', '', '', ''],
    });

    const { data: createFileData, error: createFileError, isError: createFileErrorIsError, write: createFileContract } = useContractWrite(createFileConfig);
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: createFileData?.hash,
    });
    const { config: getAllFilesConfig, error: getAllFilesPrepareError,
        isError: getAllFilesisPrepareError } = usePrepareContractWrite({
            address: state?.vaultAddy,
            abi: abi,
            functionName: 'getAllFiles',
            // args: argState,
            // args: ['', '', '', ''],
    });

    const { data: getAllFilesData, error: getAllFilesError, isError: getAllFilesErrorIsError, write: getAllFilesContract } = useContractRead(getAllFilesConfig);
    const { isLoadingAllFiles, isSuccessFiles } = useWaitForTransaction({
        hash: getAllFilesData?.hash,
    });
    console.log("FileUploadPage", isLoadingAllFiles, isSuccessFiles, getAllFilesPrepareError, getAllFilesisPrepareError, getAllFilesError, getAllFilesErrorIsError, getAllFilesContract);
    useEffect(() => {
    if (getAllFilesData) {
        setFiles(getAllFilesData);
    }
    }, [getAllFilesData]);
    console.log("ARGSTATE", argState);
    // createFileContract?.();
    const confirmFileUpload = () => {
        if (argState?.length > 0 && argState != ['', '', '', '']) {
            // ok biatches we're ready to go
            console.log("READY TO GO", createFileConfig);
            
            createFileContract?.();
            //  reset state
            setArgState([]);
        }
    };

    if (isSuccess || isLoading || createFileData) {
        setIsOpen(false);
        window.location.reload();
    }

    // log all errors
    // console.log(createFileContract, createFilePrepareError, createFileError, createFileErrorIsError, createFileisPrepareError);
    // if (createFile)
    const formSubmit = async () => { 
        // console.log("SUBMIT");
        // generate key for encryption of file
        const key = random.getBytesSync(32).toString();
        var iv = random.getBytesSync(16).toString();
        // const iv = '1'*16;
        const fCipher = cipher.createCipher('AES-CBC', util.createBuffer(key));
        fCipher.start({ iv: iv });
        const l = await toBase64(file);
        console.log("BRUHIAEDFBHUABFIFDIUBDF", l);
        fCipher.update(util.createBuffer(l));
        fCipher.finish();
        const encrypted = fCipher.output;
        const encrypted64File = util.bytesToHex(encrypted.getBytes());
        console.log(rsaContext.rsaKey.toString('UTF-8'));
        const pk = pki.privateKeyFromPem(rsaContext.rsaKey.toString());
        console.log(rsaContext.rsaKey.toString('UTF-8'));
        const pub = pki.setRsaPublicKey(pk.n, pk.e);
        console.log(rsaContext.rsaKey.toString('UTF-8'));
        const encryptedKey = pub.encrypt(key);
        console.log(rsaContext.rsaKey.toString('UTF-8'));
        // upload file to ipfs
        const testIV = iv.toString();
        const testKey = encryptedKey.toString();
        const testFile = util.hexToBytes(encrypted64File);
        const testDecryptedKey = pk.decrypt(encryptedKey).toString();
        const decipher = cipher.createDecipher('AES-CBC', util.createBuffer(key));
        decipher.start({ iv: iv });
        decipher.update(util.createBuffer(testFile, 'binary'));
        const suceeded = decipher.finish();
        const decrypted = decipher.output;
        console.log("DECRYPTED", decrypted, testFile, testDecryptedKey, testIV, suceeded);
        ipfsClient.add(encrypted64File).then((encryptedFileAdded) => {

            console.log("ENCRYPTED FILE", encryptedFileAdded);

            ipfsClient.add(JSON.stringify({ key: util.encode64(encryptedKey.toString()), iv: util.encode64(iv.toString()) })).then((encryptedKeyAdded) => {
                console.log("ENCRYPTED KEY", encryptedKeyAdded);
                // upload key to contract and ipfs hash as well
                const fileName = file.name;
                const fileType = file.type;
                const ipfsHash = encryptedFileAdded.path;
                const ipfsKeyHash = encryptedKeyAdded.path;
                // console.log(createFileContract);
                // createFileContract?.(
                //     {
                //         // overrides: {
                //             // address: state?.vaultAddy,
                //             // abi: abi,
                //             // functionName: 'createFile',
                //             args: [fileName, fileType, ipfsHash, ipfsKeyHash],
                //         // }
                //     }
                // );
                f({
                    _ipfsHash: ipfsHash,
                    _key: ipfsKeyHash,
                    _name: fileName,
                    _fileType: fileType,
                }).then(() => {
                    setArgState([fileName, fileType, ipfsHash, ipfsKeyHash]);
                });
            });
        });
        // setIsOpen(false);
    }

    const FileUploadForm = () => {
        return (
            <div>
                <div>Upload a file:</div>

                {/* 👇 Our custom button to select and upload a file */}
                <Button onClick={handleUploadClick}>
                    {file ? `${file.name}` : 'Click to select'}
                </Button>

                {/* 👇 Notice the `display: hidden` on the input */}
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <div>
                    <Button onClick={formSubmit}>Submit</Button>
                </div>
                <div>
                    <Button onClick={confirmFileUpload}>Confirm File Upload After Submit</Button>
                </div>
            </div>
            );
    };
    const handleFileUpload = () => {
        console.log("WHATR????");
        setIsOpen(true);
        console.log("LLL", open);
    };
    const generateRsaKey = () => { 
        console.log("GENERATE");
        // const encryptRsa = new EncryptRsa();
        const { privateKey } = pki.rsa.generateKeyPair(512);
        // const key = new NodeRSA({ b: 512 });
        // const str = enc;
        const element = document.createElement("a");
        const file = new Blob([pki.privateKeyToPem(privateKey)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "vault-key.pem";
        document.body.appendChild(element);
        element.click();
        rsaContext.setRsaKey(pki.privateKeyToPem(privateKey));
    }

    const RsaKeyHandle = () => { 
        return (
            <div>
                <div>
                {/* <div>Upload a file:</div> */}
                <Button onClick={ generateRsaKey}>
                    {`Generate New Key` +
                        `(generate new key if it already existed means older files won't be able to be decrypted)`}
                </Button>
                </div>
                <div>
                <Button onClick={handleUploadClick}>
                    {file ? `${file.name}` : 'Click to select'}
                </Button>

                {/* 👇 Notice the `display: hidden` on the input */}
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleRSAFileChange}
                    style={{ display: 'none' }}
                />
                </div>
            </div>
        );
    }
    console.log("OPEN", open)
    return (
        // <FileUploadForm />
    //     open? <FileUploadForm /> :
        <Box className="glass-panel" marginTop={'40px'} height="80vh">
            { (rsaContext.rsaKey === "") ? <RsaKeyHandle /> : 
            (open ? <FileUploadForm /> :
                <Center>
                            {/* {FileComponents()} */}
                            < FileComponents />
                        {/* <PopoverForm /> */}
                </Center>
            )
        }
    </Box>
    )
}
export { FileUploadComponent };