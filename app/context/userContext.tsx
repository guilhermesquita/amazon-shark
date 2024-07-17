"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getUser } from "@/components/actions";
import { UserMetadata } from "@/components/types/user";

export type UserContextType = {
  user: UserMetadata | null;
  setUser: (value: UserMetadata | null) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserMetadata | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
