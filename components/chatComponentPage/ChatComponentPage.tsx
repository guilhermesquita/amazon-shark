"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { IoIosChatbubbles } from "react-icons/io";
import { ContactTypes, useConversations } from "@/hooks/useMessages";
import ContactList from "./ContactList/ContactList";
import { Client } from "../types/client";
import MessageList from "./MessageList/MessageList";
import { UnreadMessageContextType, useUnreadMessage } from "@/app/context/unreadMessageContext";
import { markMessagesAsRead } from "../actions";

const ChatWeb: React.FC = () => {
  const { client } = useClient() as ClientContextType;
  const { setUnreadMessage } = useUnreadMessage() as UnreadMessageContextType;

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

  const HandleOpenMessages = async (contact: ContactTypes, index: number) => {
    setIsChatboxOpen(true);
    setUnreadMessage(0)
    setSelectedContactId(contact.id);
    setSelectedContactIndex(index);
    setNameSelected(contact.name);
    openConversation(contact);
    await markMessagesAsRead(contact.idConversation, contact.id)
  };

  const HandleOpenMessagesProposal = async (contact: ContactTypes, index: number) => {
    setIsChatboxOpen(true);
    setUnreadMessage(0)
    setSelectedContactId(contact.id);
    setSelectedContactIndex(index);
    setNameSelected(contact.name);
    openConversationProposal(contact);
    await markMessagesAsRead(contact.idConversation, contact.id)
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
    <div className="bg-white w-full max-w-6xl h-full max-h-[80vh] rounded-lg shadow-lg">
      <div className="min-w-full h-full border rounded-lg lg:grid lg:grid-cols-3">
        <div className="border-r border-gray-300 lg:col-span-1">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Conversas</h2>
          <ContactList
            selectedContactId={selectedContactId as string}
            key={null}
            client={client as Client}
            handleOpenMessagesProposal={HandleOpenMessagesProposal}
            selectedContactIndex={Number(selectedContactIndex)}
            handleOpenMessages={HandleOpenMessages}
          />
        </div>

        {isChatboxOpen ? (
          <MessageList
            chatboxRef={chatboxRef}
            messages={messages}
            client={client as Client}
            handleSendMessage={handleSendMessage}
            nameSelected={nameSelected}
            setUserMessage={setUserMessage}
            userMessage={userMessage}
            key={null}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <IoIosChatbubbles size={"60px"} />
            Inicie uma conversa
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWeb;
