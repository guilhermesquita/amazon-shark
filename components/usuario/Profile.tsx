import { ClientContextType, useClient } from "@/app/context/clientContext";
import { UserContextType, useUser } from "@/app/context/userContext";
import React from "react";

const Profile = () => {
  const { client } = useClient() as ClientContextType;
  const { user } = useUser() as UserContextType;

  return (
    <article className="p-4 border rounded-lg shadow-md h-full flex flex-col">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Meu Perfil</h2>
      </div>
      <section className="flex gap-5">
        <h2 className="w-32 h-32 bg-gray-400 rounded flex items-center justify-center flex-shrink-0">
          {client?.full_name[0].toUpperCase()}
        </h2>
        <article className="flex flex-col gap-5">
          <div className="flex flex-col hover:bg-[#cbcbcb] p-2 hover:rounded duration-200 cursor-pointer">
            <p>{client?.full_name}</p>
            <p className="text-xs text-[#757575]">nome completo</p>
          </div>
          <div className="flex flex-col hover:bg-[#cbcbcb] p-2 rounded duration-200 cursor-pointer">
            <p>{user?.email}</p>
            <p className="text-xs text-[#757575]">email</p>
          </div>
          {/* <p>alterar senha</p> */}
        </article>
      </section>
    </article>
  );
};

export default Profile;
