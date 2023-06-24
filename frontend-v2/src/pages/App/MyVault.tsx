import { useCallback, useContext, useEffect, useState } from "react";
import {
  type MyFile,
  deployFile,
  getAllFiles,
  deleteFile,
} from "../../services/peerSafeDeployer";
import FilesView from "../../components/app/FilesView";
import { UserContext } from "../../utils/globalContext";
import { Navigate } from "@tanstack/react-location";
import toast from "react-hot-toast";
import { Web3Auth } from "@web3auth/modal";
import { useFileHandler } from "../../hooks/useFileHandler";

const MyVault = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [files, setFiles] = useState<MyFile[]>([]);
  const provider = web3Auth.provider;
  const { userContext } = useContext(UserContext)!;

  const populateFiles = useCallback(async () => {
    setLoadingFiles(true);
    try {
      setFiles(await getAllFiles(provider!));
    } catch (e) {
      console.error("Failed to get files", e);
      toast.error("Failed to fetch files");
    } finally {
      setLoadingFiles(false);
    }
  }, [provider]);

  useEffect(() => {
    populateFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { file, handleFileChange, uploadFile, downloadFile, unpinContent } =
    useFileHandler(userContext!.privateKey);

  if (!userContext || !provider) {
    console.error("This should not be possible:", userContext, provider);
    return <Navigate to="/" />;
  }

  const uploadFileWrapper = async () => {
    try {
      setUploadingFile(true);
      const { encryptedFileHash, encryptedKeyObjHash, fileName, mimeType } =
        await uploadFile();
      const deployed = await deployFile(
        fileName,
        mimeType,
        encryptedFileHash,
        encryptedKeyObjHash,
        provider
      );
      if (!deployed) throw new Error("Failed to deploy file");
      await populateFiles();
    } catch (error) {
      console.log(`Error uploading file ${file?.name}:`, error);
      toast.error(`Error uploading file`);
    } finally {
      setUploadingFile(false);
    }
  };

  const FileUploadForm = () => {
    return (
      <div className="flex items-center gap-4">
        <input
          id="file"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          disabled={uploadingFile}
        />
        <label
          htmlFor="file"
          className={`select-none rounded-full px-3 py-2 transition-all ease-in-out ${
            uploadingFile
              ? "cursor-progress bg-none text-gray-600"
              : "cursor-pointer bg-zinc-700 hover:bg-zinc-600 transition-all ease-in-out duration-300"
          }`}
        >
          {uploadingFile
            ? "uploading"
            : file
            ? file.name
            : "Select file"}
        </label>
        <button
          onClick={uploadFileWrapper}
          className={`disabled:text-gray-600 ${
            uploadingFile
              ? "disabled:cursor-progress hidden"
              : "disabled:cursor-not-allowed"
          }`}
          disabled={file === null || uploadingFile}
        >
          Upload
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-12">
      <div className="flex flex-1 flex-col gap-6">
        <FileUploadForm />
        {loadingFiles ? (
          <>loading</>
        ) : (
          <FilesView
            deleteFile={deleteFile}
            downloadFile={downloadFile}
            files={files}
            provider={provider}
            populateFiles={populateFiles}
            unpinContent={unpinContent}
          />
        )}
      </div>
    </div>
  );
};

export default MyVault;
