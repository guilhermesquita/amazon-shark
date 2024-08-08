import React, { useEffect, useState } from "react";
import { getFinanceiroByCompanie, getPhotoByCompanie, getPitchByCompanie } from "../actions";
import Chat from "../chat/Chat";
import { ClientContextType, useClient } from "@/app/context/clientContext";
import { UserContextType, useUser } from "@/app/context/userContext";

type Props = {
  onClose: () => void;
};

const CompanyDetails: React.FC<Props> = ({ onClose }) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [pitchUrl, setPitchUrl] = useState<string | null>(null);
  const [financialUrl, setFinancialUrl] = useState<string | null>(null);
  const { company } = useClient() as ClientContextType;

  const {user} = useUser() as UserContextType

  const { client } = useClient() as ClientContextType;

  useEffect(() => {
    const fetchPhotoUrl = async () => {
      const url = await getPhotoByCompanie(company);
      setPhotoUrl(url);
    };

    fetchPhotoUrl();
  }, [company]);

  useEffect(() => {
    const fetchPitchUrl = async () => {
      const url = await getPitchByCompanie(company);
      setPitchUrl(url);
    };

    fetchPitchUrl();
  }, [company]);

  useEffect(() => {
    const fetchFinancialUrl = async () => {
      const url = await getFinanceiroByCompanie(company);
      setFinancialUrl(url);
    };

    fetchFinancialUrl();
  }, [company]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white-500 hover:text-white-700"
        >
          Fechar
        </button>
        <div className="flex flex-col md:flex-row">
          <img
            src={photoUrl || "https://via.placeholder.com/150x150.png"}
            alt={company.name}
            className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <h2
              className="text-3xl font-bold mb-2"
            >
              {company.name}
            </h2>
            <div className="flex flex-col md:flex-row">
              <p className="text-white-900 font-semibold mb-2 md:mb-0 md:mr-4">
                CNPJ: {company.cnpj}
              </p>
              <p className="text-white-900 font-semibold mb-2 md:mb-0 md:mr-4">
                Setor: {company.sector}
              </p>
              <p className="text-white-900 font-semibold">
                Estado: {company.estado}
              </p>
            </div>

            {client?.id === company.user_id ? (
              null
            ) : <Chat user_id={company.user_id} company_id={company.company_id}/>}
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Apresentação</h3>
          <p className="text-white-700">{company.description}</p>
        </div>
        {company.social_links && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Social Links</h3>
            <a
              href={company.social_links}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {company.social_links}
            </a>
          </div>
        )}
        {company.pitch && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">Pitch</h3>
            <a
              href={user ? pitchUrl as string : '/login'}
              target={user ? "_blank" : '_self'}
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visualizar Pitch
            </a>
          </div>
        )}
        {company.financeiro && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-2">
              Informações Financeiras
            </h3>
            <a
              href={financialUrl as string}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visualizar Informações Financeiras
            </a>
          </div>
        )}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-2">Objetivo</h3>
          <p className="text-white-700">{company.presentation}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
