import { useEffect, useState } from "react";

const Modal = ({ children }: { children: JSX.Element }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {};
  }, [modalOpen]);

  return (
    <div className="fixed z-40 flex max-h-[80vh] w-36 flex-col">{children}</div>
  );
};

export default Modal;
