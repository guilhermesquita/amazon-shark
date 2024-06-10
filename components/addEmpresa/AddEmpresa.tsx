import React, { useState, useEffect } from "react";
import { addCompany, getUser } from "../actions";

export default function AddEmpresa() {
  const [companyData, setCompanyData] = useState({
    desire: "",
    name: "",
    cnpj: "",
    sector: "",
    revenue_range: "",
    social_links: "",
    description: "",
  });

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

  const handleCompanySubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const user = await getUser();
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }

    const companyDataWithUserId = { ...companyData, user_id: user.id };

    const newCompany = await addCompany(companyDataWithUserId);

    if (newCompany) {
      console.log("Company added successfully:", newCompany);
      redirectToDashboard();
    } else {
      console.error("Failed to add company");
    }
  };

  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Adicionar Empresa e Projeto</h1>

        <form className="flex flex-col gap-4" onSubmit={handleCompanySubmit}>
          <input
            type="text"
            name="desire"
            placeholder="O que deseja (Investimento, parceria ou sociedade)"
            value={companyData.desire}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Nome da empresa"
            value={companyData.name}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="cnpj"
            placeholder="CNPJ"
            value={companyData.cnpj}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="sector"
            placeholder="Setor"
            value={companyData.sector}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="revenue_range"
            placeholder="Faixa de faturamento"
            value={companyData.revenue_range}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="social_links"
            placeholder="Links de mídia social"
            value={companyData.social_links}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Descrição da empresa"
            value={companyData.description}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Adicionar Empresa
          </button>
        </form>
      </main>
    </div>
  );
}
