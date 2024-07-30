"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { IoIosChatbubbles } from "react-icons/io";
import { ContactTypes, useConversations } from "@/hooks/useMessages";
import ContactList from "./ContactList/ContactList";
import { Client } from "../types/client";
import MessageList from "./MessageList/MessageList";

const ChatWeb: React.FC = () => {
  const { client } = useClient() as ClientContextType;

  const {
    messages,
    openConversation,
    openConversationProposal,
    addUserMessage,
  } = useConversations(client);

  const [userMessage, setUserMessage] = useState<string>("");
  const [selectedContactIndex, setSelectedContactIndex] = useState<
    number | null
  >(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  const [nameSelected, setNameSelected] = useState<string>("");

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsChatboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const HandleOpenMessages = (contact: ContactTypes, index: number) => {
    setIsChatboxOpen(true);
    setSelectedContactId(contact.id);
    setSelectedContactIndex(index);
    setNameSelected(contact.name);
    openConversation(contact);
  };

  const HandleOpenMessagesProposal = (contact: ContactTypes, index: number) => {
    setIsChatboxOpen(true);
    setSelectedContactId(contact.id);
    setSelectedContactIndex(index);
    setNameSelected(contact.name);
    openConversationProposal(contact);
  };

  const handleSendMessage = useCallback(() => {
    if (userMessage.trim() !== "") {
      addUserMessage(userMessage, selectedContactId as string);
      setUserMessage("");
    }
  }, [userMessage]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    };
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleSendMessage]);

  return (
    <div className="container mx-auto bg-white">
      <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Conversas</h2>
          <ContactList
            key={null}
            client={client as Client}
            handleOpenMessagesProposal={HandleOpenMessagesProposal}
            selectedContactIndex={Number(selectedContactIndex)}
            handleOpenMessages={HandleOpenMessages}
          />
        </div>

        {isChatboxOpen ? (
          <MessageList chatboxRef={chatboxRef} messages={messages} client={(client) as Client}
          handleSendMessage={handleSendMessage} nameSelected={nameSelected}
          setUserMessage={setUserMessage} userMessage={userMessage} key={null}
          />
        ) : (
          <div className=" w-full h-full flex justify-center items-center">
            <IoIosChatbubbles size={"60px"} />
            Inicie uma conversa
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWeb;
