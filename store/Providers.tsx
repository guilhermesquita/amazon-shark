"use client";
import { ClientProvider } from "@/app/context/clientContext";
import {
  UnreadMessageContext,
  UnreadMessageProvider,
} from "@/app/context/unreadMessageContext";
import { UserProvider } from "@/app/context/userContext";
import ModalEditNameUserProvider from "../components/usuario/components/modalEditNameUser/ModalEditNameUserContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <UserProvider>
        <ClientProvider>
          <UnreadMessageProvider>{children}</UnreadMessageProvider>
        </ClientProvider>
      </UserProvider>
  );
};
