import { createContext, useContext, useState } from "react";
import ModalEditPasswordUser from "./ModalEditEmailUser";

interface ModalEditPasswordContextType {
  openModalEditPassword: () => void;
}

export const ModalEditPasswordUserContext = createContext<ModalEditPasswordContextType>(
  {} as ModalEditPasswordContextType
);

export default function ModalEditPasswordUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
  return (
    <ModalEditPasswordUserContext.Provider
      value={{
        openModalEditPassword: () => setOpen(true),
      }}
    >
      {children}
      <ModalEditPasswordUser isOpen={open} onCloseModal={() => setOpen(false)}/>
    </ModalEditPasswordUserContext.Provider>
  )
}

export function useModalEditPasswordUser(){
    return useContext(ModalEditPasswordUserContext)
}
