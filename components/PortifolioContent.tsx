"use client";
import React, { useState, useEffect } from "react";
import { getAllCompanies, getUser, getPhotoByCompanie } from "./actions";
import Spinner from "./Spinner/Spinner";
import { Companies } from "./types/companies";
import { FaBuilding, FaIndustry, FaRegBuilding, FaTasks, FaGlobe, FaBriefcase } from 'react-icons/fa';
import { GiHealthNormal } from "react-icons/gi";
import CompanyCard from "./EmpresaCard/EmpresaCard";

const sectorIcons: { [key: string]: JSX.Element } = {
  "Tecnologia": <FaGlobe />,
  "Financeiro": <FaBriefcase />,
  "Saúde": <GiHealthNormal />,
  "Real Estate": <FaRegBuilding />,
  "Services": <FaTasks />,
  "Other": <FaBuilding />
};

export default function UserContent() {
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

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
            className={`flex items-center gap-2 px-4 py-2 border rounded ${selectedSector === sector ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
          >
            {sectorIcons[sector] || <FaBuilding />} {sector}
          </button>
        ))}
        <button 
          onClick={() => setSelectedSector(null)}
          className={`flex items-center gap-2 px-4 py-2 border rounded ${selectedSector === null ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          <FaBuilding /> Todos
        </button>
      </div>
      <h2 className="text-xl font-medium">Empresas {selectedSector ? `do setor ${selectedSector}` : ''}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompanies.map(company => (
          <CompanyCard key={company.company_id} company={company} imageUrl={imageUrls[company.company_id]} />
        ))}
      </div>
    </div>
  );
}
