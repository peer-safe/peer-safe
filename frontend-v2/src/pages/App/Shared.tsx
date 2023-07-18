import { useCallback, useContext, useEffect, useState } from "react";
import {
  type MyFile,
  type ShareRequest,
  getShareRequests,
  getAllFiles,
  deleteFile,
} from "../../services/peerSafeDeployer";
import FilesView from "../../components/app/FilesView";
import { UserContext } from "../../utils/globalContext";
import { Navigate } from "@tanstack/react-location";
import toast from "react-hot-toast";
import { Web3Auth } from "@web3auth/modal";
import { useFileHandler } from "../../hooks/useFileHandler";
import { ethers } from "ethers";
import RequestModal from "../../components/app/RequestModal";

const Shared = ({ web3Auth }: { web3Auth: Web3Auth }) => {
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [shareRequests, setShareRequests] = useState<ShareRequest[]>([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [files, setFiles] = useState<MyFile[]>([]);
  const provider = web3Auth.provider;
  const { userContext } = useContext(UserContext)!;

  const populateFiles = useCallback(async () => {
    setLoadingFiles(true);
    try {
      const _files = await getAllFiles(provider!);
      console.log(_files);
      setFiles(
        _files.filter((file) => file._sharedBy !== ethers.constants.AddressZero)
      );
    } catch (e) {
      console.error("Failed to get files", e);
      toast.error("Failed to get files, try again later");
    } finally {
      setLoadingFiles(false);
    }
  }, [provider]);

  const populateShareRequests = useCallback(async () => {
    const requests = await getShareRequests(provider!);
    console.debug("Get shared requests", requests);
    setShareRequests(
      requests.filter((file) => file._from !== ethers.constants.AddressZero)
    );
  }, [provider]);

  useEffect(() => {
    populateFiles();
    populateShareRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { downloadFile, unpinContent } = useFileHandler(
    userContext!.privateKey
  );

  if (!userContext || !provider) {
    console.error("This should not be possible:", userContext, provider);
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <button
          className={`select-none rounded-full px-3 py-2 transition-colors duration-300 ease-in-out ${
            shareRequests.length
              ? "cursor-pointer bg-[#6ee7b777] hover:bg-[#59e6ad77]"
              : "cursor-not-allowed bg-none px-0 py-0 text-gray-600"
          }`}
          onClick={() => setIsRequestModalOpen(true)}
        >
          {shareRequests.length} new requests
        </button>
      </div>
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
      {isRequestModalOpen ? (
        <RequestModal
          setOpen={setIsRequestModalOpen}
          provider={provider}
          shareRequests={shareRequests}
          setShareRequests={setShareRequests}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Shared;
