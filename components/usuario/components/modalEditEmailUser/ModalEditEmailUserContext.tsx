import { createContext, useContext, useState } from "react";
import ModalEditEmailUser from "./ModalEditEmailUser";

interface ModalEditEmailContextType {
  openModalEditEmail: () => void;
}

export const ModalEditEmailUserContext = createContext<ModalEditEmailContextType>(
  {} as ModalEditEmailContextType
);

export default function ModalEditEmailUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
  return (
    <ModalEditEmailUserContext.Provider
      value={{
        openModalEditEmail: () => setOpen(true),
      }}
    >
      {children}
      <ModalEditEmailUser isOpen={open} onCloseModal={() => setOpen(false)}/>
    </ModalEditEmailUserContext.Provider>
  )
}

export function useModalEditEmailUser(){
    return useContext(ModalEditEmailUserContext)
}
