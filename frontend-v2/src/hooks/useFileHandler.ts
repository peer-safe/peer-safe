import { useState } from "react";
import { create } from "ipfs-http-client";
import * as EthCrypto from "eth-crypto";
import axios from "axios";
const CryptoJS = require("crypto-js");

const projectId = process.env.REACT_APP_IPFS_PROJECT_ID!;
const projectSecret = process.env.REACT_APP_IPFS_PROJECT_SECRET!;

function useFileHandler(privateKey: string) {
  const [file, setFile] = useState<File | null>(null);
  const infuraURL = "https://ipfs.infura.io:5001";
  const authorization =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const ipfsClient = create({
    url: infuraURL,
    headers: {
      authorization,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(file);
    } else {
      setFile(null);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      console.log("no file selected");
      throw new Error("no file selected");
    }
    if (!privateKey.length) {
      console.log("privateKey not found");
      throw new Error("privateKey not found");
    }
    const arrayBuff: any = await FileToArrayBuffer(file);
    const key = CryptoJS.lib.WordArray.random(256 / 8);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const keyObj = {
      // K1
      key: key.toString(),
      iv: iv.toString(),
    };

    // setup for key object encryption
    const keyObjString = JSON.stringify(keyObj);
    const mimeType = file.type;
    const fileName = file.name;
    const encryptedFile = await encryptFile(arrayBuff, key, iv);
    const encryptedFileObj = new File( // E1
      [encryptedFile],
      "encrypted_" + file.name
    );

    const encryptedFileAdded = await ipfsClient.add(encryptedFileObj);
    console.log("encryptedFileAdded", encryptedFileAdded);
    const encryptedFileHash = encryptedFileAdded.path;
    console.log("encryptedFileHash", encryptedFileHash);

    const encryptedKeyObj = await encryptKeyObj(privateKey, keyObjString);
    const encryptedKeyObjAdded = await ipfsClient.add(encryptedKeyObj);
    const encryptedKeyObjHash = encryptedKeyObjAdded.path;
    console.log("encryptedKeyObjHash", encryptedKeyObjHash);

    // PIN TO IPFS
    try {
      await ipfsClient.pin.add(encryptedFileHash);
      await ipfsClient.pin.add(encryptedKeyObjHash);
    } catch (e) {
      console.log("error pinning to ipfs", e);
      // TODO: show error to user that file is unstable,
      // and the user might wanna delete and try uploading again
    }
    setFile(null);
    return { encryptedFileHash, encryptedKeyObjHash, fileName, mimeType };
  };

  async function downloadFile(
    fileHash: string,
    keyHash: string,
    fileName: string
  ) {
    if (!privateKey) {
      console.log("privateKey not found");
      throw new Error("privateKey not found");
    }
    if (privateKey === "") {
      console.log("privateKey not found");
      throw new Error("privateKey not found");
    }
    try {
      const enc_file_data = await ipfsClient.cat(fileHash);
      let enc_data: any = [];
      for await (const chunk of enc_file_data) enc_data.push(chunk);
      enc_data = Buffer.concat(enc_data);
      const enc_key_data = await ipfsClient.cat(keyHash);
      let enc_key: any = [];
      for await (const chunk of enc_key_data) enc_key.push(chunk);
      enc_key = Buffer.concat(enc_key);
      console.log("encrypted data", enc_key, enc_data);
      const enc_key_string = enc_key.toString();
      const keyObj = await decryptKeyObj(privateKey, enc_key_string);

      // decryption of file
      const encFileBlob = new Blob([enc_data], {
        type: "application/octet-stream",
      });

      const textFromBlob = await getFileAsTextFromBlob(encFileBlob);
      const key = CryptoJS.enc.Hex.parse(keyObj.key);
      const iv = CryptoJS.enc.Hex.parse(keyObj.iv);

      const decryptedFile = await AESDecryptFile(textFromBlob, key, iv);

      const uintArr = convertWordArrayToUint8Array(decryptedFile);
      const decryptedFileObject = new File([uintArr], fileName);
      return decryptedFileObject;
    } catch (error) {
      console.log("error while decrypting file");
      console.log(error);
      throw new Error("error while decrypting file");
    }
  }

  const AESDecryptFile = async (
    encryptedFile: any,
    secretKey: any,
    iv: any
  ) => {
    var decrypted = CryptoJS.AES.decrypt(encryptedFile, secretKey, {
      iv: iv,
    });
    return decrypted;
  };

  function convertWordArrayToUint8Array(wordArray: any) {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes")
      ? wordArray.sigBytes
      : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length),
      index = 0,
      word,
      i;
    for (i = 0; i < length; i++) {
      word = arrayOfWords[i];
      uInt8Array[index++] = word >> 24;
      uInt8Array[index++] = (word >> 16) & 0xff;
      uInt8Array[index++] = (word >> 8) & 0xff;
      uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
  }

  function getFileAsTextFromBlob(blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result);
      };
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  }

  async function encryptKeyObj(privKey: string, key: string) {
    const pubKey = EthCrypto.publicKeyByPrivateKey(privKey);
    const encrypted = await EthCrypto.encryptWithPublicKey(pubKey, key);
    const encryptedString = EthCrypto.cipher.stringify(encrypted);
    return encryptedString;
  }

  async function decryptKeyObj(privKey: string, encryptedString: string) {
    const encryptedObject = EthCrypto.cipher.parse(encryptedString);

    const decrypted = await EthCrypto.decryptWithPrivateKey(
      privKey,
      encryptedObject
    );
    return JSON.parse(decrypted);
  }

  async function encryptFile(file: ArrayBuffer, key: any, iv: any) {
    var wordArray = CryptoJS.lib.WordArray.create(file);
    const encrypted = CryptoJS.AES.encrypt(wordArray, key, {
      iv,
    });

    var fileEnc = new Blob([encrypted]); // Create blob from string

    return fileEnc;
  }

  const FileToArrayBuffer = (file: File) =>
    new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const arrayBuffer = reader?.result;
        resolve(arrayBuffer);
      };
      reader.onerror = (error: any) => reject(error);
    });

  async function unpinContent(ipfsHash: string) {
    await axios.post(`${infuraURL}/api/v0/pin/rm?arg=${ipfsHash}`, null, {
      headers: {
        Authorization: authorization,
      },
    });
  }

  return { file, handleFileChange, uploadFile, downloadFile, unpinContent };
}

export { useFileHandler };
