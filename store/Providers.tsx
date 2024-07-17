'use client';
import { UserProvider } from "@/app/context/userContext";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return(
        <UserProvider>
            {children}
        </UserProvider>
    )
}