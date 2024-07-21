"use client";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  getAllMessages,
  getConversationsExists,
  getConversationsSendedAll,
  getProfileById,
  sendMessage,
} from "../actions";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { MdOutlineVerified } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";

type contactTypes = {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
};

interface Message {
  text: string;
  sender: string;
}

const ChatWeb: React.FC = () => {
  const { client } = useClient() as ClientContextType;

  const [contacts, setContacts] = useState<contactTypes[] | null>(null);
  const [userMessage, setUserMessage] = useState<string>("");

  const [selectedContactIndex, setSelectedContactIndex] = useState<
    number | null
  >(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null
  );

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    async function fetchConversations() {
      if (client?.id) {
        const propostaChat = await getConversationsSendedAll(client.id);
        const data = propostaChat.data as any[];

        if (data) {
          const contactsData = await Promise.all(
            data.map(async (conversation) => {
              const findProfile = await getProfileById(
                conversation.profile2_id
              );
              const profile = findProfile.data as any[];
              return {
                name: profile[0].full_name,
                id: profile[0].id,
                avatar: profile[0].full_name[0].toUpperCase(),
                verified: profile[0].verification,
              };
            })
          );
          setContacts(contactsData);
        }
      }
    }

    fetchConversations();
  }, [client?.id]);

  const teste = (contact: contactTypes, index: number) => {
    setIsChatboxOpen(true);
    setSelectedContactId(contact.id);
    setSelectedContactIndex(index);

    async function fetchMessages() {
      const conversation = await getConversationsExists(
        client?.id as string,
        contact.id
      );
      console.log(conversation);
      if (conversation.data?.length) {
        const idConversation = conversation.data[0].id;
        const fetchedMessages = await getAllMessages(idConversation);
        if (fetchedMessages.data) {
          const formattedMessages = fetchedMessages.data.map((item: any) => ({
            text: item.content,
            sender: item.sender_id,
          }));
          setMessages(formattedMessages);
        }
      }
    }
    fetchMessages();
  };

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("messages-component")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload: any) => {
          const newMessage = {
            text: payload.new.content,
            sender: payload.new.sender_id,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("conversations-component")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        (payload: any) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            // fetchMessages();
            console.log(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

  const handleSendMessage = useCallback(() => {
    if (userMessage.trim() !== "") {
      addUserMessage(userMessage);
      setUserMessage("");
    }
  }, [userMessage]);

  const addUserMessage = async (message: string) => {
    if (client?.id) {
      const conversation = await getConversationsExists(
        client?.id as string,
        selectedContactId as string
      );
      if (conversation.data?.length) {
        const idConversation = conversation.data[0].id;
        await sendMessage({
          content: message,
          conversation_id: idConversation,
          sender_id: client.id ?? "0",
        });
      }
    }
  };

  return (
    <div className="container mx-auto">
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

          <ul className="overflow-auto h-[32rem]">
            <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
            {contacts ? (
              contacts.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // setIsChatboxOpen(true);
                    // setSelectedContactId(contact.id);
                    // setSelectedContactIndex(index);
                    teste(contact, index);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                    selectedContactIndex === index
                      ? "bg-gray-300"
                      : "hover:bg-gray-100"
                  } focus:outline-none`}
                >
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    {contact.avatar}
                  </div>
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      {contact.verified ? (
                        <span className="ml-2 font-semibold text-gray-600 flex items-center gap-1">
                          {contact.name}
                          <MdOutlineVerified size={"20px"} color="#4db7ff" />
                        </span>
                      ) : (
                        <span className="block ml-2 font-semibold text-gray-600">
                          {contact.name}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div>nada achado</div>
            )}
          </ul>
        </div>

        {isChatboxOpen ? (
          <div className="hidden lg:col-span-2 lg:block">
            <div>
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">Emma</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div>
            </div>
            <div
              id="chatbox"
              className="p-4 h-80 overflow-y-auto"
              ref={chatboxRef}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.sender === client?.id ? "text-right" : ""
                  }`}
                >
                  <p
                    className={`${
                      message.sender === client?.id
                        ? "bg-[#073321] text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded-lg py-2 px-4 inline-block`}
                  >
                    {message.text}
                  </p>
                </div>
              ))}
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
        ) : (
          <div>Nada aqui!!</div>
        )}
      </div>
    </div>
  );
};

export default ChatWeb;
