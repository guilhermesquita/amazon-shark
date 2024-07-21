"use client";
import { useEffect, useState } from "react";
import { getConversationsSendedAll, getProfileById } from "../actions";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { MdOutlineVerified } from "react-icons/md";

type contactTypes = {
  name: string;
  avatar: string;
  verified: boolean;
};

const ChatWeb: React.FC = () => {
  const { client } = useClient() as ClientContextType;

  const [contacts, setContacts] = useState<contactTypes[] | null>(null);
  // const [verified, setVerified] = useState(false);

   const [selectedContactIndex, setSelectedContactIndex] = useState<number | null>(null);

  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  useEffect(() => {
    async function fetchMessages() {
      if (client?.id) {
        const propostaChat = await getConversationsSendedAll(client.id);
        const data = propostaChat.data as any[];

        if (data) {
          const contactsData = await Promise.all(
            data.map(async (conversation) => {
              const findProfile = await getProfileById(conversation.profile2_id);
              const profile = findProfile.data as any[];
              return {
                name: profile[0].full_name,
                avatar: profile[0].full_name[0].toUpperCase(),
                verified: profile[0].verification,
              };
            })
          );
          setContacts(contactsData);
        }
      }
    }

    fetchMessages();
  }, [client?.id]);

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
                    setIsChatboxOpen(true);
                    setSelectedContactIndex(index);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
                    selectedContactIndex === index ? "bg-gray-300" : "hover:bg-gray-100"
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
                          <MdOutlineVerified size={"20px"} color="#4db7ff"/>
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
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">Emma</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">Hi</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">Hiiii</span>
                    </div>
                  </li>
                  <li className="flex justify-end">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span className="block">how are you?</span>
                    </div>
                  </li>
                  <li className="flex justify-start">
                    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span className="block">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                />
                <button type="submit">
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
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
