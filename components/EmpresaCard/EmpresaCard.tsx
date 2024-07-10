import React from "react";
import { Companies } from "../types/companies";

interface CompanyCardProps {
  company: Companies;
  imageUrl: string;
}

export default function CompanyCard({ company, imageUrl }: CompanyCardProps) {
  return (
    <div className="border rounded p-4 shadow-md">
      <img src={imageUrl} alt={company.name} className="w-full h-32 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{company.name}</h3>
      <p className="text-sm">{company.description}</p>
      <p className="text-sm"><strong>Porte:</strong> {company.porte}</p>
      <p className="text-sm"><strong>Necessidade Atual:</strong> {company.current_need}</p>
      <a href={company.social_links} target="_blank" rel="noopener noreferrer" className="text-blue-500">Social Links</a>
    </div>
  );
}
