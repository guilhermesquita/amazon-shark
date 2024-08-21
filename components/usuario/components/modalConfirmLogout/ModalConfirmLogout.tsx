import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { signOut } from "@/components/actions";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { UserContextType, useUser } from "@/app/context/userContext";

interface modalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const ModalConfirmLogout: React.FC<modalProps> = ({
  isOpen,
  onCloseModal,
}: modalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  const { setClient } = useClient() as ClientContextType;
  const { setUser } = useUser() as UserContextType;

  useEffect(() => {
    AOS.init();
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onCloseModal();
    }, 500);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleLogout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await signOut();
    setUser(null);
    setClient(null);
  };

  return (
    <>
      {isOpen || isClosing ? (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center w-full max-h-full z-50 ${
            isOpen ? "block" : "hidden"
          }`}
          onClick={handleClickOutside}
        >
          <div
            className={`relative p-4 w-full max-w-md max-h-full ${
              isClosing ? "fade-down" : "fade-up"
            }`}
            data-aos={isClosing ? "fade-down" : "fade-up"}
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Editar Número de Telefone
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto 
                  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white duration-200"
                  data-modal-hide="authentication-modal"
                  onClick={handleClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <button
                    onClick={handleLogout}
                    className="w-full text-white bg-[#ec2d2d] hover:bg-[#ec2d2de5] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200"
                  >
                    Finalizar sessão
                  </button>

                  <article
                    onClick={handleClose}
                    className="w-full cursor-pointer text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200"
                  >
                    cancelar
                  </article>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalConfirmLogout;
