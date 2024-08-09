import { ContactTypes, useConversations } from "@/hooks/useMessages";
import { Client } from "../../types/client";
import Spinner from "../../Spinner/Spinner";
import { MdOutlineVerified } from "react-icons/md";

interface ContactProps {
  client: Client;
  handleOpenMessages: (contact: ContactTypes, index: number) => void;
  handleOpenMessagesProposal: (contact: ContactTypes, index: number) => void;
  selectedContactIndex: number;
  selectedContactId: string
}

const ContactList: React.FC<ContactProps> = ({
  client,
  handleOpenMessages,
  selectedContactIndex,
  handleOpenMessagesProposal,
  selectedContactId,
}) => {
  const { contacts, proposalContacts } = useConversations(client);

  return (
    <ul className="min-h-3/5 flex flex-col gap-5 p-3">
      <div>
        <h3 className="ml-2 mt-2 font-bold">Propostas Enviadas</h3>
        <div className="max-h-60 overflow-y-auto flex flex-col gap-3">
          {contacts ? (
            contacts.map((contact, index) => (
              <button
                key={index}
                onClick={() => {handleOpenMessages(contact, index), contact.unreadMessage = 0}}
                className={`flex 
                      overflow-y-auto rounded-xl h-20 truncate
                      items-center w-full pl-2 text-sm transition duration-150 ease-in-out cursor-pointer ${
                        selectedContactId === contact.id && selectedContactIndex === index 
                          ? "bg-[#d3ffe4] "
                          : "hover:bg-gray-100"
                      } focus:outline-none`}
              >
                <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                  {contact.avatar}
                </div>
                <div className="w-full">
                  <div>
                    {contact.verified ? (
                      <span className="font-semibold text-gray-600 flex gap-1 ml-2">
                        {contact.name}
                        <MdOutlineVerified size={"20px"} color="#4db7ff" className="flex-shrink-0"/>
                        {contact.unreadMessage > 0 ? '- ' + contact.unreadMessage : null}
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-600 flex ml-2">
                        {contact.name} {contact.unreadMessage > 0 ? '- ' + contact.unreadMessage : null}
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
        </div>
      </div>
      <div>
        <h3 className="ml-2 mt-5 font-bold">Propostas recebidas</h3>
        <div className="max-h-60 overflow-y-auto flex flex-col gap-3">
        {proposalContacts ? (
          proposalContacts.map((contact, index) => (
            <button
              key={index}
              onClick={() => {
                handleOpenMessagesProposal(contact, index);
                contact.unreadMessage = 0
              }}
              className={`flex 
                overflow-y-auto rounded-xl h-20 truncate
                items-center w-full pl-2 text-sm transition duration-150 ease-in-out cursor-pointer ${
                  selectedContactId === contact.id && selectedContactIndex === index 
                    ? "bg-[#d3ffe4] "
                    : "hover:bg-gray-100"
                } focus:outline-none`}
        >
          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
            {contact.avatar}
          </div>
          <div className="w-full">
            <div>
              {contact.verified ? (
                <span className="font-semibold text-gray-600 flex gap-1 ml-2">
                  {contact.name}
                  <MdOutlineVerified size={"20px"} color="#4db7ff" className="flex-shrink-0"/>
                  {contact.unreadMessage > 0 ? '- ' + contact.unreadMessage : null}
                </span>
                  ) : (
                    <span className="font-semibold text-gray-600 flex ml-2">
                        {contact.name} {contact.unreadMessage > 0 ? '- ' + contact.unreadMessage : null}
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
        </div>
      </div>
    </ul>
  );
};

export default ContactList;
