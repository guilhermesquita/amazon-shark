import { createContext, useContext, useState } from "react";
import ModalEditPhoneNumber from "./ModalEditPhoneNumber";

interface ModalEditEmailContextType {
  openModalEditPhoneNumber: () => void;
}

export const ModalEditPhoneNumberContext = createContext<ModalEditEmailContextType>(
  {} as ModalEditEmailContextType
);

export default function ModalEditPhoneNumberProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
  return (
    <ModalEditPhoneNumberContext.Provider
      value={{
        openModalEditPhoneNumber: () => setOpen(true),
      }}
    >
      {children}
      <ModalEditPhoneNumber isOpen={open} onCloseModal={() => setOpen(false)}/>
    </ModalEditPhoneNumberContext.Provider>
  )
}

export function useModalEditPhoneNumber(){
    return useContext(ModalEditPhoneNumberContext)
}
