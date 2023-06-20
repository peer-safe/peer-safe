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

  const LoggedInUserInfo = () => {
    const userInfo = userContext.userInfo;
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Name:</span>{" "}
          <span>{userInfo.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">Email:</span>{" "}
          <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
        </div>
        <a
          className="mt-4 rounded-full border border-solid px-4 py-2"
          href={`https://mumbai.polygonscan.com/address/${userContext.vaultAddress}`}
          target="_blank"
          rel="noreferrer"
        >
          View contract
        </a>
      </div>
    );
  };

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
              ? "cursor-not-allowed bg-zinc-600"
              : "cursor-pointer bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {uploadingFile
            ? "Hol up this takes a bit"
            : file
            ? file.name
            : "Select file"}
        </label>
        <button
          onClick={uploadFileWrapper}
          className={`disabled:text-gray-600 ${
            uploadingFile
              ? "disabled:cursor-progress"
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
    /* Content with max width */
    <div className="flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 pt-6">
      <div className="flex flex-1 flex-col justify-between pt-2">
        <div className="flex flex-col items-center gap-6">
          <LoggedInUserInfo />
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
      <div className="pt-4 text-center">
        Caution: This project is volatile, contracts may change and can cause
        loss of data. Also file upload limit for now is 5MB (working on this).
      </div>
    </div>
  );
};

export default MyVault;
