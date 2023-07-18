import { forwardRef, useState } from "react";
import BaseButton from "../BaseButton";

const FileTile = forwardRef(
  (
    {
      filename,
      downloadFunc,
      deleteFunc,
      shareFunc,
      ipfsHash,
      selected,
      dataKey,
    }: {
      filename: string;
      downloadFunc: () => Promise<void>;
      deleteFunc: () => Promise<void>;
      shareFunc?: () => Promise<void>;
      ipfsHash: string;
      selected: boolean;
      dataKey: number;
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const deleteKey = `deleting-${ipfsHash}`;
    const [downloadingFile, setDownloadingFile] = useState(false);
    const [deletingFile, setDeletingFile] = useState(
      sessionStorage.getItem(deleteKey) !== null
    );

    return (
      <div
        ref={ref}
        className={`selectable relative flex h-[11rem] select-none rounded-2xl border-[1px]  bg-[#101010] ${
          selected ? "user-selected border-blue-600" : "border-[#2d2d2d]"
        }`}
        data-key={dataKey}
      >
        {downloadingFile || deletingFile ? (
          <span className="z-10 flex flex-1 cursor-wait items-center justify-center self-stretch text-zinc-300">
            {downloadingFile ? "downloading..." : "deleting..."}
          </span>
        ) : (
          <div className="flex max-w-full flex-1 flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-6"
                fill="currentColor"
                viewBox="2 0 12 16"
              >
                <path d="M7 7a1 1 0 0 1 2 0v1H7V7zM6 9.3c0-.042.02-.107.105-.175A.637.637 0 0 1 6.5 9h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 12h-3a.637.637 0 0 1-.395-.125C6.02 11.807 6 11.742 6 11.7V9.3z" />
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0z" />
              </svg>
              {shareFunc ? (
                <button
                  className="z-10 text-sm text-zinc-400 underline"
                  onClick={shareFunc}
                >
                  share
                </button>
              ) : (
                <></>
              )}
            </div>
            <span className="relative z-10 line-clamp-2 overflow-hidden text-ellipsis break-words text-sm">
              {filename}
            </span>
            <div className="flex justify-between">
              <BaseButton
                className="z-10"
                onClick={async () => {
                  setDownloadingFile(true);
                  await downloadFunc();
                  setDownloadingFile(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                  <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                </svg>
              </BaseButton>
              <BaseButton
                className="z-10"
                onClick={async () => {
                  setDeletingFile(true);
                  sessionStorage.setItem(deleteKey, "true");
                  await deleteFunc();
                  sessionStorage.removeItem(deleteKey);
                  setDeletingFile(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg>
              </BaseButton>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default FileTile;
