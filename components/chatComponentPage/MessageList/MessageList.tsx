import Spinner from "@/components/Spinner/Spinner";
import { Client } from "../../types/client";
import { ChangeEvent, RefObject } from "react";

interface MessageProps {
  client: Client;
  messages: any[];
  nameSelected: string;
  chatboxRef: RefObject<HTMLDivElement>;
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleSendMessage: () => void;
}

const MessageList: React.FC<MessageProps> = ({
  client,
  messages,
  nameSelected,
  chatboxRef,
  userMessage,
  setUserMessage,
  handleSendMessage,
}) => {
  return (
    <div className="hidden lg:col-span-2 lg:block bg-[#fffefe]">
      <div>
        <div className="relative bg-[#22B573] flex items-center p-3 border-b border-gray-300">
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center">
            {nameSelected[0].toUpperCase()}
          </div>
          <span className="block ml-2 font-bold text-white">
            {nameSelected}
          </span>
        </div>
      </div>
      <div
        id="chatbox"
        className="p-4 max-h-[calc(80vh-250px)] overflow-y-auto"
        ref={chatboxRef}
      >
        {messages ? messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === client?.id ? "text-right" : ""}`}
          >
            <p
              className={` max-w-72 break-words text-wrap ${
                message.sender === client?.id
                  ? "bg-[#22B573] text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-xl py-2 px-4 inline-block`}
            >
              {message.text}
            </p>
          </div>
        )): <Spinner/>}
      </div>
      <div className="p-4 border-t flex">
        <input
          id="user-input"
          type="text"
          placeholder="Type a message"
          autoComplete="off"
          className="w-full px-3 py-2 border rounded-l-md outline-none bg-[#0e0d0d] text-white"
          value={userMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserMessage(e.target.value)
          }
        />
        <button
          id="send-button"
          className="bg-[#06613b] text-white px-4 py-2 rounded-r-md hover:bg-[#07271a] transition duration-300"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default MessageList;
