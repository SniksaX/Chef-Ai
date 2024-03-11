import React from "react";

const Modal = ({ isvisible, onClose, children }: any) => {
  if (!isvisible) return null;
  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0  bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px]">
        <button
          className="text-black text-xl flex flex-col place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
