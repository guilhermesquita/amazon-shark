"use client";
import { createContext, useContext, useState } from "react";
import { Client } from "@/components/types/client";

export type ClientContextType = {
  client: Client | null;
  setClient: (value: Client | null) => void;
};

export const ClientContext = createContext<ClientContextType | null>(null);

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
