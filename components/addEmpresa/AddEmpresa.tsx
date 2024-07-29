import React, { useState, useEffect } from "react";
import {
  uploadPhoto,
  uploadPitch,
  uploadFinanceiro,
  addCompany,
  updateCompany,
  getUser,
} from "../actions";
import { Companies } from "../types/companies";
import Popup from "../popUp/PopUp";
import Spinner from "../Spinner/Spinner";

interface AddEmpresaProps {
  existingCompany?: Companies | null;
}

export default function AddEmpresa({ existingCompany }: AddEmpresaProps) {
  const [companyData, setCompanyData] = useState<Partial<Companies>>(
    existingCompany || {}
  );
  const [file, setFile] = useState<any | null>(null);
  const [pitchFile, setPitchFile] = useState<any | null>(null);
  const [financeiroFile, setFinanceiroFile] = useState<any | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (existingCompany) {
      setCompanyData(existingCompany);
    }
  }, [existingCompany]);

  const handleCompanyChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileFunc: React.Dispatch<React.SetStateAction<any | null>>
  ) => {
    if (e.target.files) {
      setFileFunc(e.target.files[0]);
    }
  };

  const handleCompanySubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    const user = await getUser();
    if (!user?.id) {
      console.error("User ID is undefined");
      setPopupMessage("Failed to get user ID");
      setPopupType("error");
      setIsLoading(false);
      return;
    }

    if (!companyData?.name) {
      console.error("Company name is undefined");
      setPopupMessage("Company name is required");
      setPopupType("error");
      setIsLoading(false);
      return;
    }

    let image_url: string = "";
    let pitch_url: string = "";
    let financeiro_url: string = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadPhoto(user.id, companyData.name, formData);
      if (!result || result.error) {
        console.error(result?.error || "Failed to upload photo");
        setPopupMessage("Failed to upload photo");
        setPopupType("error");
        setIsLoading(false);
        return;
      }
      image_url = result.path;
    }

    if (pitchFile) {
      const formData = new FormData();
      formData.append("file", pitchFile);
      const result = await uploadPitch(user.id, companyData.name, formData);
      if (!result || result.error) {
        console.error(result?.error || "Failed to upload pitch");
        setPopupMessage("Failed to upload pitch");
        setPopupType("error");
        setIsLoading(false);
        return;
      }
      pitch_url = result.path;
    }

    if (financeiroFile) {
      const formData = new FormData();
      formData.append("file", financeiroFile);
      const result = await uploadFinanceiro(
        user.id,
        companyData.name,
        formData
      );
      if (!result || result.error) {
        console.error(result?.error || "Failed to upload financeiro");
        setPopupMessage("Failed to upload financeiro");
        setPopupType("error");
        setIsLoading(false);
        return;
      }
      financeiro_url = result.path;
    }

    const companyDataWithUserId = {
      ...companyData,
      user_id: user.id,
      image_url: image_url,
      pitch: pitch_url,
      financeiro: financeiro_url,
    };

    let result;
    if (existingCompany) {
      result = await updateCompany(companyDataWithUserId as Companies);
    } else {
      result = await addCompany(companyDataWithUserId as Companies);
    }

    if (result) {
      console.log("Company processed successfully:", result);
      setPopupMessage("Company processed successfully");
      setPopupType("success");
    } else {
      console.error("Failed to process company");
      setPopupMessage("Failed to process company");
      setPopupType("error");
    }

    setIsLoading(false);
  };

  const closePopup = () => {
    setPopupMessage(null);
    setPopupType(null);
  };

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">
          {existingCompany
            ? "Editar Empresa e Projeto"
            : "Adicionar Empresa e Projeto"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleCompanySubmit}>
          <h2>Básicos:</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              name="name"
              placeholder="Nome da empresa"
              value={companyData.name || ""}
              onChange={handleCompanyChange}
              className="p-2 border rounded flex-1 text-gray-500"
            />
            <input
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              value={companyData.cnpj || ""}
              onChange={handleCompanyChange}
              className="p-2 border rounded flex-1 text-gray-500"
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={companyData.estado || ""}
              onChange={handleCompanyChange}
              className="p-2 border rounded flex-1 text-gray-500"
            />
          </div>

          <h2>Somos</h2>
          <textarea
            name="description"
            placeholder="Descrição da empresa"
            value={companyData.description || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <select
            name="sector"
            value={companyData.sector || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded flex-1 text-gray-500"
          >
            <option value="">Selecione o setor</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Varejo">Varejo</option>
            <option value="Outro">Outro</option>
          </select>
          <h6>Imagem da empresa:</h6>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, setFile)}
            className="p-2 border rounded text-gray-500"
          />
          <h6>Pitch da empresa:</h6>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, setPitchFile)}
            className="p-2 border rounded text-gray-500"
          />
          <input
            type="text"
            name="social_links"
            placeholder="Links de mídia social"
            value={companyData.social_links || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <h6>Financeiro da empresa:</h6>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, setFinanceiroFile)}
            className="p-2 border rounded text-gray-500"
          />

          <h2>Objetivos</h2>
          <input
            type="text"
            name="presentation"
            placeholder="Objetivo da empresa"
            value={companyData.presentation || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {existingCompany ? "Salvar Alterações" : "Adicionar Empresa"}
          </button>
        </form>
      </main>
      {popupMessage && popupType && (
        <Popup message={popupMessage} onClose={closePopup} type={popupType} />
      )}
      {isLoading && <Spinner />}
    </div>
  );
}
