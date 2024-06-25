import React from "react";
import { Companies } from "../types/companies";

interface CompanyCardProps {
  company: Companies;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="border rounded p-4 shadow-md">
      <h3 className="text-xl font-semibold">{company.name}</h3>
      <p className="text-sm">{company.description}</p>
      <p className="text-sm"><strong>Porte:</strong> {company.porte}</p>
      <p className="text-sm"><strong>Necessidade Atual:</strong> {company.current_need}</p>
      <a href={company.social_links} target="_blank" rel="noopener noreferrer" className="text-blue-500">Social Links</a>
    </div>
  );
}
