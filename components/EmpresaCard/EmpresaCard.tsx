import React, { useEffect, useState } from "react";
import { Companies } from "../types/companies";
import { Client } from "../types/client";
import { getClientById } from "../actions";
import { MdOutlineVerified } from "react-icons/md";

interface CompanyCardProps {
  company: Companies;
  imageUrl: string;
  onViewDetails: () => void;
}

export default function CompanyCard({ company, imageUrl, onViewDetails }: CompanyCardProps) {

  const [profile, setProfile] = useState<Client|null>(null)

  useEffect(()=>{
   async function getProfile(){
     const clientById = await getClientById(company.user_id)
     const data = clientById.data as any[]
     setProfile(data[0])
    }

   getProfile()
  })

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <img src={imageUrl} alt={company.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-2xl font-bold">{company.name}</h3>
        {profile?.verification ? (
          <div className="mb-4 flex items-center gap-1">
            de <p className="text-[#818080] truncate">{profile.full_name ? profile.full_name.split("@")[0] : "" }</p>
            <MdOutlineVerified color="#4db7ff"/>
          </div>
        ) : 
          <div className="mb-4 flex items-center gap-1">
            de <p className="text-[#818080]">{profile?.full_name ? profile.full_name.split("@")[0] : "" }</p>
          </div>
        }
        <div className="mb-4">
          <p className="mb-4 line-clamp-5">{company.description}</p>
        </div>
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
