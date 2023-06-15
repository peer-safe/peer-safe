import Navbar from "../components/Navbar";
import type { Web3Auth } from "@web3auth/modal";
import {
  type MyFile,
  deployFile,
  deployVault,
  getAllFiles,
  getVaultAddress,
  deleteFile,
} from "../services/peerSafeDeployer";
import { useFileHandler } from "../hooks/useFileHandler";
import { Navigate, useNavigate } from "@tanstack/react-location";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/globalContext";
import FilesView from "../components/app/FilesView";
import toast from "react-hot-toast";

const App = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const provider = web3Auth.provider;
  const navigate = useNavigate();
  const { userContext, setUserContext } = useContext(UserContext)!;
  const [files, setFiles] = useState<MyFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);

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
    if (!userContext!.vaultAddress.length) {
      deployVault(provider!)
        .then(async () => {
          const vaultAddress = await getVaultAddress(provider!);
          setUserContext((prevState) => {
            return { ...prevState!, vaultAddress };
          });
          await populateFiles();
        })
        .catch((e) => {
          if (userContext!.vaultAddress) return;
          // react strictmode calls everything twice, so sometimes this might
          // error on localhost even if there's no error on the server
          // due to request-response mismatch
          console.error("Error deploying vault:", e);
          toast.error(`Error deploying vault`);
          navigate({ to: "/" });
        });
    } else populateFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { file, handleFileChange, uploadFile, downloadFile, unpinContent } =
    useFileHandler(userContext!.privateKey);

  // typescript not smart enough to know that userContext cannot be null
  // as the router will not route this page if it is
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
              : "cursor-pointer bg-green-700 hover:bg-green-800"
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
    <>
      {/* Background, whole screen
      <div className="fixed -left-20 -right-20 -top-20 -z-10 h-[calc(100vh+160px)] bg-cover" /> */}
      <div className="flex w-full min-w-[340px] flex-col items-center">
        <Navbar web3Auth={web3Auth} />
        {/* Content with max width */}
        <div className="flex min-h-[calc(100vh-6.5rem)] w-full max-w-5xl flex-1 flex-col gap-12 px-6 pt-6">
          <div className="flex flex-1 flex-col justify-between pt-2">
            {!userContext.vaultAddress.length ? (
              <span className="flex-1 self-center">
                Please wait while we create your vault
              </span>
            ) : (
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
            )}
          </div>
          <div className="pt-4 text-center">
            Caution: This project is volatile, contracts may change and can
            cause loss of data. Also file upload limit for now is 5MB (working
            on this).
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
