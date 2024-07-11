import React from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
  type: "success" | "error";
}

const Popup: React.FC<PopupProps> = ({ message, onClose, type }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-4 rounded shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
        <p>{message}</p>
        <button onClick={onClose} className="mt-2 bg-white text-black rounded px-4 py-2">Close</button>
      </div>
    </div>
  );
};

export default Popup;
