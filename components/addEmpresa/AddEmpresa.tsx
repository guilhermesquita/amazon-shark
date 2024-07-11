import React, { useState, useEffect } from "react";
import { uploadPhoto,addCompany, updateCompany, getUser } from "../actions";
import { Companies } from "../types/companies";

interface AddEmpresaProps {
  existingCompany?: Companies | null;
}

export default function AddEmpresa({ existingCompany }: AddEmpresaProps) {
  const [companyData, setCompanyData] = useState<Partial<Companies>>(
    existingCompany || {}
  );
  const [file, setFile] = useState<any | null>(null);

  useEffect(() => {
    if (existingCompany) {
      setCompanyData(existingCompany);
    }
  }, [existingCompany]);

  const redirectToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleCompanyChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompanySubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const user = await getUser();
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }
  
    if (!companyData?.name) {
      console.error("Company name is undefined");
      return;
    }
  
    let image_url: string = '';
  
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const isUpdate = !!existingCompany;
      const result = await uploadPhoto(user.id, companyData.name, formData, isUpdate);
      console.log(result);
      image_url = result.path;
    }
  
    const companyDataWithUserId = { ...companyData, user_id: user.id, image_url: image_url };
  
    let result;
    if (existingCompany) {
      result = await updateCompany(companyDataWithUserId as Companies);
    } else {
      result = await addCompany(companyDataWithUserId as Companies);
    }
  
    if (result) {
      console.log("Company processed successfully:", result);
      redirectToDashboard();
    } else {
      console.error("Failed to process company");
    }
  };
  

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">
          {existingCompany ? "Editar Empresa e Projeto" : "Adicionar Empresa e Projeto"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleCompanySubmit}>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              name="desire"
              placeholder="O que deseja (Investimento, parceria ou sociedade)"
              value={companyData.desire || ""}
              onChange={handleCompanyChange}
              className="p-2 border rounded flex-1 text-gray-500"
            />
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
          </div>
          <div className="flex gap-4">
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
            <select
              name="porte"
              value={companyData.porte || ""}
              onChange={handleCompanyChange}
              className="p-2 border rounded flex-1 text-gray-500"
            >
              <option value="">Selecione o porte</option>
              <option value="MEI">MEI</option>
              <option value="MME">MME</option>
              <option value="Pequena">Pequena</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <input
            type="text"
            name="social_links"
            placeholder="Links de mídia social"
            value={companyData.social_links || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <input
            type="text"
            name="current_need"
            placeholder="Necessidades"
            value={companyData.current_need || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <input
            type="text"
            name="cep"
            placeholder="CEP"
            value={companyData.cep || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <textarea
            name="description"
            placeholder="Descrição da empresa"
            value={companyData.description || ""}
            onChange={handleCompanyChange}
            className="p-2 border rounded text-gray-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border rounded text-gray-500"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            {existingCompany ? "Salvar Alterações" : "Adicionar Empresa"}
          </button>
        </form>
      </main>
    </div>
  );
}
