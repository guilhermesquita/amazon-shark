"use client";
import { ClientProvider } from "@/app/context/clientContext";
import { UnreadMessageContext, UnreadMessageProvider } from "@/app/context/unreadMessageContext";
import { UserProvider } from "@/app/context/userContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ClientProvider>
        <UnreadMessageProvider>{children}</UnreadMessageProvider>  
      </ClientProvider>
    </UserProvider>
  );
};
