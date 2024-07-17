import { FaCopy } from "react-icons/fa";

export default function ToastedCopied() {
  return (
    <div
      id="toast-simple"
      className="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
      role="alert"
    >
      <FaCopy />
      <div className="ps-4 text-sm font-normal">Código copiado com sucesso!</div>
    </div>
  );
}
