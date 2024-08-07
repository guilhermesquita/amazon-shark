"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineVerified } from "react-icons/md";
import { getClientById, getConversationsByProfile, getUnreadMessages, getUser, signOut } from "../actions";
import DropdownMenu from "./DropdownMenu";
import Spinner from "../Spinner/Spinner";
import { useUser, UserContextType } from "@/app/context/userContext";
import { useClient, ClientContextType } from "@/app/context/clientContext";
import { Client } from "../types/client";
import { UnreadMessageContextType, useUnreadMessage } from "@/app/context/unreadMessageContext";
import { Conversations } from "../types/conversations";
import { Messages } from "../types/messages";

export default function AuthButton() {
  const { user, setUser } = useUser() as UserContextType;
  const { client, setClient } = useClient() as ClientContextType;
  const { setUnreadMessage } = useUnreadMessage() as UnreadMessageContextType;
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    async function fetchUserAndClient() {
      const fetchedUser = await getUser();
      if (fetchedUser) {
        const fetchedClient = await getClientById(fetchedUser.id);
        setUser(fetchedUser);
        const clientArr = fetchedClient.data as Client[];
        setClient(clientArr[0]);
      }
      setLoading(false);
    }

    if (!user) {
      fetchUserAndClient();
    } else {
      setLoading(false);
    }
  }, [user, setUser, setClient]);

  useEffect(()=>{
    async function fetchUnreadMessage(){
      const conversationByProfile = await getConversationsByProfile(client?.id as string)
      const conversation = conversationByProfile.data as Conversations[];
      let unread: number = 0;
      for(const i in conversation){
        let senderId: string
        conversation[i].profile1_id == client?.id ? senderId = conversation[i].profile2_id : senderId = conversation[i].profile1_id
        const messages = await getUnreadMessages(conversation[i].id, senderId) 
        const message = messages.data as Messages[];
        unread += message.length;
        setUnreadMessage(unread)
      }
    }

    fetchUnreadMessage()
  })

  if (loading) {
    return <Spinner />;
  }

  const getVerified = () => {
    if(client){
      if (!client.verification) {
        return (
          <Link
            href="/verified"
            className="lg:flex items-center gap-2 hidden
          py-2 px-3 rounded-md no-underline duration-300
          bg-[#0c6350] hover:bg-[#0a4b3d] text-white"
          >
            <MdOutlineVerified size={"30px"} />
            Obter Verificação
          </Link>
        );
      }
    }
  };

  const handleLogout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await signOut();
    setUser(null);
    setClient(null);
  };

  return user ? (
    <div className="flex items-center gap-3">
      <DropdownMenu
        verified={client?.verification || false}
        onLogout={handleLogout}
        userName={user.email ? user.email.split("@")[0] : ""}
      />
      {getVerified()}
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
