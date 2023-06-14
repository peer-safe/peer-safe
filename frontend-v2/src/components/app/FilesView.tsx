import { SafeEventEmitterProvider } from "@web3auth/base";
import { MyFile } from "../../services/peerSafeDeployer";
import FileTile from "./FileTile";
import { toast } from "react-hot-toast";

const downloadFileButton = async (
  fileHash: string,
  keyHash: string,
  fileName: string,
  downloadFile: (
    fileHash: string,
    keyHash: string,
    fileName: string
  ) => Promise<File>
) => {
  try {
    const downloadedFile = await downloadFile(fileHash, keyHash, fileName);
    console.log("File downloaded");
    const link = document.createElement("a");
    link.download = fileName;
    const url = window.URL.createObjectURL(downloadedFile);
    link.href = url;
    link.click();
  } catch (error) {
    console.log(`Error downloading file ${fileName}`, error);
    toast.error(`Error downloading ${fileName}`);
  }
};

const deleteFileButton = async (
  ipfsHash: string,
  keyHash: string,
  fileName: string,
  provider: SafeEventEmitterProvider,
  deleteFile: (
    provider: SafeEventEmitterProvider,
    ipfsHash: string
  ) => Promise<void>,
  populateFiles: () => Promise<void>,
  unpinContent: (ipfsHash: string) => Promise<void>
) => {
  try {
    await deleteFile(provider, ipfsHash);
    // only log errors, don't throw them, this is just cleanup
    unpinContent(ipfsHash)
      .then()
      .catch((e) => console.log("Error unpinning file:", e));
    unpinContent(keyHash)
      .then()
      .catch((e) => console.log("Error unpinning file:", e));
  } catch (e) {
    console.error(`Error deleting file ${fileName}`, e);
    toast.error(`Error deleting ${fileName}`);
  } finally {
    populateFiles();
  }
};

const FilesView = ({
  files,
  downloadFile,
  deleteFile,
  provider,
  populateFiles,
  unpinContent,
}: {
  files: MyFile[];
  downloadFile: (
    fileHash: string,
    keyHash: string,
    fileName: string
  ) => Promise<File>;
  deleteFile: (
    provider: SafeEventEmitterProvider,
    ipfsHash: string
  ) => Promise<void>;
  provider: SafeEventEmitterProvider;
  populateFiles: () => Promise<void>;
  unpinContent: (ipfsHash: string) => Promise<void>;
}) => {
  if (!files.length) {
    return <span> No Files </span>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {files.map((file: MyFile, index) => {
        return (
          <FileTile
            filename={file._name}
            key={index}
            downloadFunc={() =>
              downloadFileButton(
                file._ipfsHash,
                file._key,
                file._name,
                downloadFile
              )
            }
            deleteFunc={() =>
              deleteFileButton(
                file._ipfsHash,
                file._key,
                file._name,
                provider,
                deleteFile,
                populateFiles,
                unpinContent
              )
            }
            ipfsHash={file._ipfsHash}
          />
        );
      })}
    </div>
  );
};

export default FilesView;
