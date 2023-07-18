import { useState, type ChangeEvent } from "react";
import {
  MyFile,
  ShareRequest,
  getPubKey,
} from "../../services/peerSafeDeployer";
import { ethers } from "ethers";
import {
  acceptShareRequest,
  rejectShareRequest,
} from "../../services/peerSafeDeployer";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { toast } from "react-hot-toast";

const RequestListItem = ({
  name,
  from,
  fileHash,
  setShareRequests,
  provider,
  setOpen,
}: {
  name: string;
  from: string;
  fileHash: string;
  setShareRequests: React.Dispatch<React.SetStateAction<ShareRequest[]>>;
  provider: SafeEventEmitterProvider;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="text-xs text-zinc-500">{from}</span>
      </div>
      <div className="flex items-center gap-2 py-2">
        <button
          className="rounded-lg bg-emerald-600 px-2 py-1 transition-colors duration-300 ease-in-out hover:bg-emerald-700"
          onClick={async () => {
            setShareRequests((prev) => {
              const then = prev.filter((val) => val._fileHash !== fileHash);
              if (!then.length) setOpen(false);
              return then;
            });
            try {
              await acceptShareRequest(provider, fileHash);
              toast.success("Accepted");
            } catch (err) {
              console.error(err);
              toast.error("Error accepting request");
            }
          }}
        >
          Accept
        </button>
        <button
          className="rounded-lg bg-red-600 px-2 py-1 transition-colors duration-300 ease-in-out hover:bg-red-700"
          onClick={async () => {
            {
              setShareRequests((prev) => {
                const then = prev.filter((val) => val._fileHash !== fileHash);
                if (!then.length) setOpen(false);
                return then;
              });
              try {
                await rejectShareRequest(provider, fileHash);
              } catch (err) {
                console.error(err);
                toast.error("Error rejecting request");
              }
            }
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ({
  className,
  setOpen,
  provider,
  shareRequests,
  setShareRequests,
}: {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  provider: SafeEventEmitterProvider;
  shareRequests: ShareRequest[];
  setShareRequests: React.Dispatch<React.SetStateAction<ShareRequest[]>>;
}) => {
  return (
    <div
      className={`fade-in-fast fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-40 ${
        className || ""
      }`}
      onClick={() => setOpen?.(false)}
    >
      <div
        className="relative flex max-h-[calc(100vh-4rem)] min-h-[10rem] w-[32rem] flex-col gap-4 overflow-y-auto rounded-lg bg-[#101010] py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-background sticky top-0 flex justify-between px-4">
          <div />
          <span className="flex items-center text-lg font-bold">
            Share requests
          </span>
          <button className="-m-3 p-3" onClick={() => setOpen(false)}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9998 8.40005L2.0998 13.3C1.91647 13.4834 1.68314 13.575 1.3998 13.575C1.11647 13.575 0.883138 13.4834 0.699804 13.3C0.516471 13.1167 0.424805 12.8834 0.424805 12.6C0.424805 12.3167 0.516471 12.0834 0.699804 11.9L5.5998 7.00005L0.699804 2.10005C0.516471 1.91672 0.424805 1.68338 0.424805 1.40005C0.424805 1.11672 0.516471 0.883382 0.699804 0.700048C0.883138 0.516715 1.11647 0.425049 1.3998 0.425049C1.68314 0.425049 1.91647 0.516715 2.0998 0.700048L6.9998 5.60005L11.8998 0.700048C12.0831 0.516715 12.3165 0.425049 12.5998 0.425049C12.8831 0.425049 13.1165 0.516715 13.2998 0.700048C13.4831 0.883382 13.5748 1.11672 13.5748 1.40005C13.5748 1.68338 13.4831 1.91672 13.2998 2.10005L8.3998 7.00005L13.2998 11.9C13.4831 12.0834 13.5748 12.3167 13.5748 12.6C13.5748 12.8834 13.4831 13.1167 13.2998 13.3C13.1165 13.4834 12.8831 13.575 12.5998 13.575C12.3165 13.575 12.0831 13.4834 11.8998 13.3L6.9998 8.40005Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col divide-y px-4">
          {shareRequests.map((req, index) => (
            <RequestListItem
              name={req._name}
              from={req._from.toString()}
              fileHash={req._fileHash}
              setShareRequests={setShareRequests}
              provider={provider}
              key={index}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
