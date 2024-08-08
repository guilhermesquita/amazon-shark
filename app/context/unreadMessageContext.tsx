// clientContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

export type UnreadMessageContextType = {
  unreadMessage: number;
  setUnreadMessage: (value: number) => void;
};

export const UnreadMessageContext = createContext<UnreadMessageContextType | null>(null);

interface UnreadMessageProviderProps {
  children: React.ReactNode;
}

export const UnreadMessageProvider = ({ children }: UnreadMessageProviderProps) => {
  const [unreadMessage, setUnreadMessage] = useState<number>(0);

  return (
    <UnreadMessageContext.Provider
      value={{
        unreadMessage,
        setUnreadMessage,
      }}
    >
      {children}
    </UnreadMessageContext.Provider>
  );
};

export const useUnreadMessage = () => useContext(UnreadMessageContext);
