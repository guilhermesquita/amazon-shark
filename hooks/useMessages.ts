import { useEffect, useState } from 'react';
import { Client } from '@/components/types/client';
import { getAllMessages, getAllMessagesUnreadBySenderAndConversation, getClientById, getCompanyById, getConversationsExists, getConversationsReceivedAll, getConversationsSendedAll, getProfileById, sendMessage } from '@/components/actions';
import { createClient } from '@/utils/supabase/client';
import { UnreadMessageContextType, useUnreadMessage } from '@/app/context/unreadMessageContext';

export type ContactTypes = {
  id: string;
  name: string;
  companyId?: number;
  avatar: string;
  verified: boolean;
  unreadMessage: number
  idConversation: number
};

type Message = {
  text: string;
  sender: string;
};

export const useConversations = (client: Client | null) => {
  const [contacts, setContacts] = useState<ContactTypes[] | null>(null);
  const [proposalContacts, setProposalContacts] = useState<ContactTypes[] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadMessagesCounted, setUnreadMessagesCounted] = useState(0)

  const { setUnreadMessage } = useUnreadMessage() as UnreadMessageContextType;

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
          // setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setUnreadMessage]);

  useEffect(() => {

  })

  useEffect(() => {
    async function fetchConversations() {
      if (client?.id) {
        const propostaChat = await getConversationsSendedAll(client.id);
        const data = propostaChat.data as any[];
  
        if (data) {
          const contactsData = await Promise.all(
            data.map(async (conversation) => {
              let sender: string;
              conversation.profile1_id === client.id
                ? (sender = conversation.profile2_id)
                : (sender = conversation.profile1_id);
  
              const getUnreadMessage = await getAllMessagesUnreadBySenderAndConversation(
                sender,
                conversation.id
              );
              const countUnreadMessages = getUnreadMessage.data as any[];
              const unreadMessagesCount = countUnreadMessages.length;
  
              const findProfile = await getProfileById(conversation.profile2_id);
              const company = await getCompanyById(conversation.company_id);
              const arrCompany = company.data as any[];
              const nameCompany = arrCompany[0].name;
              const profile = findProfile.data as any[];
  
              return {
                name: `${profile[0].full_name.split(" ")[0]} da ${nameCompany}`,
                id: profile[0].id,
                avatar: profile[0].full_name[0].toUpperCase(),
                companyId: arrCompany[0].company_id,
                verified: profile[0].verification,
                idConversation: conversation.id,
                unreadMessage: unreadMessagesCount
              };
            })
          );
          setContacts(contactsData);
        }
      }
    }
    fetchConversations();
  }, [client?.id]);
  

  useEffect(() => {
    async function fetchConversationsProposal() {
      if (client?.id) {
        const propostaChat = await getConversationsReceivedAll(client.id);
        const data = propostaChat.data as any[];
        if (data) {
          const contactsData = await Promise.all(
            data.map(async (conversation) => {

              let sender: string;
              conversation.profile1_id === client.id
                ? (sender = conversation.profile2_id)
                : (sender = conversation.profile1_id);
  
              const getUnreadMessage = await getAllMessagesUnreadBySenderAndConversation(
                sender,
                conversation.id
              );
              const countUnreadMessages = getUnreadMessage.data as any[];
              const unreadMessagesCount = countUnreadMessages.length;

              const findProfile = await getProfileById(conversation.profile1_id);
              const profile = findProfile.data as any[];
              return {
                name: profile[0].full_name,
                id: profile[0].id,
                avatar: profile[0].full_name[0].toUpperCase(),
                verified: profile[0].verification,
                idConversation: conversation.id,
                unreadMessage: unreadMessagesCount
              };
            })
          );
          setProposalContacts(contactsData);
        }
      }
    }
    fetchConversationsProposal();
  }, [client?.id]);

  const openConversation = async (contact: ContactTypes) => {
    const company = await getCompanyById(Number(contact.companyId));
    const arrCompany = company.data as any[];
    const idCompany = arrCompany[0].company_id;
    const conversation = await getConversationsExists(
      client?.id as string,
      contact.id,
      idCompany
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
  };

  const openConversationProposal = async (contact: ContactTypes) => {

    setUnreadMessage(2)

    const conversation = await getConversationsExists(
      contact.id,
      client?.id as string
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
  };

  const addUserMessage = async (message: string, selectedContactId: string) => {
    if (client?.id) {
      const selectClient = await getClientById(selectedContactId);
      const arrClientSelected = selectClient.data as any[];
      const idCompany = arrClientSelected[0].company_id;

      const conversation = await getConversationsExists(
        client?.id as string,
        selectedContactId as string,
        idCompany
      );

      const conversationProposal = await getConversationsExists(
        selectedContactId as string,
        client?.id as string
      );

      if (conversationProposal.data?.length) {
        const idConversation = conversationProposal.data[0].id;
        await sendMessage({
          content: message,
          conversation_id: idConversation,
          sender_id: client.id ?? "0",
        });
      }

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
            console.log(payload);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    contacts,
    proposalContacts,
    messages,
    openConversation,
    openConversationProposal,
    addUserMessage,
    unreadMessagesCounted,
    setUnreadMessagesCounted
  };
};
