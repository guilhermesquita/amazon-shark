import { ContactTypes, useConversations } from "@/hooks/useMessages";
import { Client } from "../../types/client";
import Spinner from "../../Spinner/Spinner";
import { MdOutlineVerified } from "react-icons/md";

interface ContactProps {
  client: Client;
  handleOpenMessages: (contact: ContactTypes, index: number) => void;
  handleOpenMessagesProposal: (contact: ContactTypes, index: number) => void;
  selectedContactIndex: number
}

const ContactList: React.FC<ContactProps> = ({client, handleOpenMessages, selectedContactIndex, handleOpenMessagesProposal}) => {
  const {
    contacts,
    proposalContacts
  } = useConversations(client);

  return (
    <ul className="min-h-3/5">
      <h3 className="ml-2 mt-2 font-bold">Propostas Enviadas</h3>
      {contacts ? (
        contacts.map((contact, index) => (
          <button
            key={index}
            onClick={() => handleOpenMessages(contact, index)}
            className={`flex 
                    overflow-y-auto
                    items-center w-full px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
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
        <div>
          <Spinner />
        </div>
      )}
      <h3 className="ml-2 mt-5 font-bold">Propostas recebidas</h3>
      {proposalContacts ? (
        proposalContacts.map((contact, index) => (
          <button
            key={index}
            onClick={() => {
              handleOpenMessagesProposal(contact, index);
            }}
            className={`overflow-y-auto flex items-center w-full px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer ${
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
        <div>
          <Spinner />
        </div>
      )}
    </ul>
  );
}

export default ContactList;