import { signMesssage } from "~/lib/peer-safe";

// export type MyFile = {
//   _fileType: string;
//   _ipfsHash: string;
//   _key: string;
//   _name: string;
//   _sharedBy: `0x${string}`;
// };

export async function getAllFiles() {
  const { contract, messageHash, v, r, s } =
    await signMesssage("i want my files");
  const files = await contract.read.getAllFiles([messageHash, v, r, s]);
  return files;
}
