import { createContext, useContext, useState } from "react";
import ModalConfirmLogout from "./ModalConfirmLogout";

interface ModalConfirmLogoutContextType {
  openModalConfirmLogout: () => void;
}

export const ModalConfirmLogoutContext = createContext<ModalConfirmLogoutContextType>(
  {} as ModalConfirmLogoutContextType
);

export default function ModalConfirmLogoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
  return (
    <ModalConfirmLogoutContext.Provider
      value={{
        openModalConfirmLogout: () => setOpen(true),
      }}
    >
      {children}
      <ModalConfirmLogout isOpen={open} onCloseModal={() => setOpen(false)}/>
    </ModalConfirmLogoutContext.Provider>
  )
}

export function useModalConfirmLogout(){
    return useContext(ModalConfirmLogoutContext)
}
