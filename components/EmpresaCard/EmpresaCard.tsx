import React from "react";
import { Companies } from "../types/companies";

interface CompanyCardProps {
  company: Companies;
  imageUrl: string;
  onViewDetails: () => void;
}

export default function CompanyCard({ company, imageUrl, onViewDetails }: CompanyCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <img src={imageUrl} alt={company.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
        <p className="mb-4">{company.description}</p>
        <p className="font-semibold mb-2">Objetivo:</p>
        <p className="mb-4">{company.presentation}</p>
        <button
          onClick={onViewDetails}
          className="mt-4 bg-[#22B573] text-white px-4 py-2 rounded-lg hover:bg-[#1a945d] transition-colors duration-300"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
