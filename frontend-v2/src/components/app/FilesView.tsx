import { SafeEventEmitterProvider } from "@web3auth/base";
import { MyFile } from "../../services/peerSafeDeployer";
import FileTile from "./FileTile";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import SelectionArea, { SelectionEvent } from "@viselect/react";

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
  setNumSelected,
  files,
  downloadFile,
  deleteFile,
  provider,
  populateFiles,
  unpinContent,
}: {
  setNumSelected: React.Dispatch<React.SetStateAction<number>>;
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
  const filesRef = useRef<HTMLDivElement[]>([]);
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const pageDiv = document.body;

    const moveEvent = (ev: MouseEvent) => {
      filesRef.current.forEach((target) => {
        const rect = target.getBoundingClientRect(),
          x = ev.clientX - rect.left,
          y = ev.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    if (matchMedia("(pointer:fine)").matches) {
      pageDiv.addEventListener("mousemove", moveEvent);
    }

    return () => {
      pageDiv.removeEventListener("mousemove", moveEvent);
    };
  }, []);

  useEffect(() => {
    setNumSelected(selected.size);
  }, [selected, setNumSelected]);

  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }: SelectionEvent) => {
    try {
      if (event instanceof TouchEvent) {
        selection.clearSelection();
        return selection.cancel();
      }
    } catch {}

    if (!event?.ctrlKey && !event?.metaKey && !event?.shiftKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    if (added.length || removed.length)
      setSelected((prev) => {
        const next = new Set(prev);
        extractIds(added).forEach((id) => next.add(id));
        extractIds(removed).forEach((id) => next.delete(id));
        return next;
      });
  };

  if (!files.length) {
    return <span> No Files </span>;
  }

  return (
    <SelectionArea
      selectables=".selectable"
      container=".selectionarea"
      onBeforeStart={onStart}
      onMove={onMove}
      className="selectionarea sm:files-grid max-sm:files-grid-sm -m-4 grid w-[calc(100%+2rem)] flex-1 select-none content-start gap-4 p-4"
      behaviour={{
        overlap: "keep",
        intersect: "touch",
        startThreshold: 1,
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 0 },
        },
      }}
      features={{
        touch: false,
        range: true,
        singleTap: {
          allow: true,
          intersect: "touch",
        },
      }}
    >
      {files.map((file: MyFile, index) => {
        return (
          <FileTile
            filename={file._name}
            dataKey={index}
            key={index}
            selected={selected.has(index)}
            ref={(el) => {
              if (el) filesRef.current[index] = el;
            }}
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
    </SelectionArea>
  );
};

export default FilesView;
