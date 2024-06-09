import React from "react";
import { useState } from 'react';


export default function AddEmpresa() {
    const [companyData, setCompanyData] = useState({
        desire: '',
        name: '',
        cnpj: '',
        sector: '',
        revenueRange: '',
        socialLinks: '',
        description: ''
      });
    
      const [projectData, setProjectData] = useState({
        companyId: '',
        title: '',
        description: '',
        categoryId: '',
        targetAmount: ''
      });
    
      const handleCompanyChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setCompanyData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleProjectChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleCompanySubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/api/companies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        });
    
        if (response.ok) {
          const newCompany = await response.json();
          setProjectData((prevData) => ({
            ...prevData,
            companyId: newCompany.id, // Assume que o backend retorna o ID da nova empresa
          }));
        } else {
          console.error('Failed to add company');
        }
      };
    
      const handleProjectSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
    
        if (response.ok) {
          console.log('Project added successfully');
        } else {
          console.error('Failed to add project');
        }
      };
  return (
    <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
      <main className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Adicionar Empresa e Projeto</h1>

        <form className="flex flex-col gap-4">
          <h2 className="text-xl">Adicionar Empresa</h2>
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
            name="revenueRange"
            placeholder="Faixa de faturamento"
            value={companyData.revenueRange}
            onChange={handleCompanyChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="socialLinks"
            placeholder="Links de mídia social"
            value={companyData.socialLinks}
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
