import { createContext, useContext, useState } from "react";
import ModalEditNameUser from "./ModalEditNameUser";

interface ModalEditNameContextType {
  open: () => void;
}

export const ModalEditNameUserContext = createContext<ModalEditNameContextType>(
  {} as ModalEditNameContextType
);

export default function ModalEditNameUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
  return (
    <ModalEditNameUserContext.Provider
      value={{
        open: () => setOpen(true),
      }}
    >
      {children}
      <ModalEditNameUser isOpen={open} onCloseModal={() => setOpen(false)}/>
    </ModalEditNameUserContext.Provider>
  )
}

export function useModalEditNameUser(){
    return useContext(ModalEditNameUserContext)
}
