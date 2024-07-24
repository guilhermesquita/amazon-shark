"use client";
import { createContext, useContext, useState } from "react";
import { Client } from "@/components/types/client";

export type ClientContextType = {
  client: Client | null;
  setClient: (value: Client | null) => void;
  company: any | null;
  setCompany: (value: any | null) => void;
};

export const ClientContext = createContext<ClientContextType | null>(null);

interface ClientProviderProps {
  children: React.ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [company, setCompany] = useState<any | null>(null);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        company,
        setCompany
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
