"use client";
import React, { useState, useEffect } from "react";
import { getAllCompanies, getUser, getPhotoByCompanie } from "./actions";
import Spinner from "./Spinner/Spinner";
import { Companies } from "./types/companies";
import CompanyCard from "./EmpresaCard/EmpresaCard";
import CompanyDetails from "../components/EmpresaDetails/EmpresaDetails"; 
import { ClientContextType, useClient } from "@/app/context/clientContext";

export default function UserContent() {
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});
  const [selectedCompany, setSelectedCompany] = useState<Companies | null>(null);

  const {setCompany} = useClient() as ClientContextType

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const user = await getUser();
        const companiesResponse = await getAllCompanies();
        const companiesData = companiesResponse?.data ?? [];
        setCompanies(companiesData);

        const imageUrls: { [key: number]: string } = {};
        await Promise.all(
          companiesData.map(async (company: Companies) => {
            const imageUrl = await getPhotoByCompanie(company);
            imageUrls[company.company_id] = imageUrl || "https://via.placeholder.com/150x150.png";
          })
        );
        setImageUrls(imageUrls);

        if (user && user.user_metadata.fullName) {
          setUserFullName(user.user_metadata.fullName);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleViewDetails = async (company: Companies) => {
    setSelectedCompany(company);
    setCompany(company);
    const imageUrl = await getPhotoByCompanie(company);
  };
  
  if (loading) {
    return <Spinner />;
  }

  const sectors = Array.from(new Set(companies.map(company => company.sector)));

  const filteredCompanies = selectedSector
    ? companies.filter(company => company.sector === selectedSector)
    : companies;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-medium">Setores</h2>
      <div className="flex flex-wrap gap-2">
        {sectors.map(sector => (
          <button 
            key={sector} 
            onClick={() => setSelectedSector(sector)}
            className={`flex items-center gap-2 px-4 py-2 border rounded ${selectedSector === sector ? 'bg-[#22B573] text-white' : 'bg-white text-black'}`}
          >
            {sector}
          </button>
        ))}
        <button 
          onClick={() => setSelectedSector(null)}
          className={`flex items-center gap-2 px-4 py-2 border rounded ${selectedSector === null ? 'bg-[#22B573] text-white' : 'bg-white text-black'}`}
        >
          Todos
        </button>
      </div>
      <h2 className="text-xl font-medium">Empresas {selectedSector ? `do setor ${selectedSector}` : ''}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(company => (
          <CompanyCard
            key={company.company_id}
            company={company}
            imageUrl={imageUrls[company.company_id]}
            onViewDetails={() => handleViewDetails(company)}
          />
        ))}
      </div>

      {selectedCompany && (
        <CompanyDetails
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
