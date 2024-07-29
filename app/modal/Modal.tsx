import { deleteCompany, getUser } from "@/components/actions";
import { Companies } from "@/components/types/companies";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

type props = {
  company_id: number,
}

const Modal: React.FC<props> = ({company_id}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteCompany = async (companyId: number) => {
    const user = await getUser();
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }

    const deleted = await deleteCompany(companyId);
    if (deleted) {
      console.log("Company deleted successfully");
      window.location.reload();
    } else {
      console.error("Failed to delete company");
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <Button
        onClick={openModal}
        sx={{
          backgroundColor: "#CF1C1C",
          color: "white",
          height: '100%',
          fontWeight: "bold",
          borderRadius: "5px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#EC3232",
          },
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <FaTrash />
      </Button>

      {isOpen && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Remover empresa
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Você tem certeza que quer remover essa empresa
                          cadastrada? Após essa ação os dados serão
                          irrecuperáveis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => handleDeleteCompany(company_id)}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Remover
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
