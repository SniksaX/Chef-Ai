import React from "react";

const LoadingModal = ({ isvisible, children }: any) => {
  if (!isvisible) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <div className="w-[600px]">
        <div className="rounded">{children}</div>
      </div>
    </div>
  );
};

export default LoadingModal;
