"use client";
import { ClientProvider } from "@/app/context/clientContext";
import { UserProvider } from "@/app/context/userContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ClientProvider>{children}</ClientProvider>
    </UserProvider>
  );
};
