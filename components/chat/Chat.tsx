import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useCallback,
} from "react";
import {
  createConversation,
  getAllMessages,
  getClientById,
  getCompanyById,
  getConversationsExists,
  sendMessage,
} from "../actions";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface Message {
  text: string;
  sender: string;
}

type Props = {
  user_id: string;
  company_id: number;
};

const Chat: React.FC<Props> = ({ user_id, company_id }) => {
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { client } = useClient() as ClientContextType;
  const chatboxRef = useRef<HTMLDivElement>(null);
  const [selectedContact, setSelectedContact] = useState<string[]>([]);

  const router = useRouter()

  useEffect(() => {
    async function fetchMessages() {

      const contact = await getClientById(user_id)
      const contactArray = contact.data as any[]
      const name = contactArray[0].full_name
      
      const company = await getCompanyById(company_id)
      const companyArray = company.data as any[]
      const nameCompany = companyArray[0].name

      setSelectedContact([name, nameCompany])

      const conversation = await getConversationsExists(
        client?.id as string,
        user_id,
        company_id
      );
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
  }, []);

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
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            // fetchMessages();
            console.log(payload)
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatbox = async () => {
    const clientId = client?.id as string;
    checkUser()
    const conversationExists = await ensureConversationExists(clientId, user_id);
    if (conversationExists) {
      setIsChatboxOpen(!isChatboxOpen);
      setTimeout(() => {
        if (chatboxRef.current) {
          chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
      }, 0);
    } else {
      alert('Já existe uma conversa ativa.');
    }
  };

  const checkUser = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    }
  };

  const ensureConversationExists = async (clientId: string, userId: string): Promise<boolean> => {
    const conversation = await getConversationsExists(clientId, userId, company_id);
    if (!conversation.data?.length) {
      await createConversation({ profile1_id: clientId, profile2_id: userId, company_id: company_id });
      return true;
    }
    return false;
  };

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
        user_id,
        company_id
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
    <div>
      <div className="mt-5">
        <button
          id="open-chat"
          className="bg-[#073321] text-white py-2 px-4 rounded-md hover:bg-[#07271a] transition duration-300 flex items-center"
          onClick={toggleChatbox}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Faça uma Proposta!
        </button>
      </div>
      <div
        id="chat-container"
        className={`fixed bottom-0 right-0 w-96 ${
          isChatboxOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-[#141414] absolute bottom-16 shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-[#06613b] text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">{`${selectedContact[0]} da ${selectedContact[1]}`}</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={() => setIsChatboxOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
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
      </div>
    </div>
  );
};

export default Chat;
