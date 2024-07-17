"use client";
import { UserContextType, useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import DeployButton from "@/components/navbar/DeployButton";
import QrCodeField from "@/components/qrcodeField/qrCodeField";
import { UserIdentity } from "@supabase/supabase-js";
import { requestBodyPost } from "@/service/pixApi";
import { MdOutlineVerified } from "react-icons/md";

export default function Index() {
  const { user } = useUser() as UserContextType;

  const [confirm, setConfirm] = useState(false);

  const callbackQrCode = () => {
    if (!user) {
      console.log("User not found");
      return null;
    }

    const identity = user.documents as UserIdentity[];
    const document = identity[0].identity_data as UserIdentity["identity_data"];

    if (!document) {
      console.log("Identity not found");
      return null;
    }

    const body: requestBodyPost = {
      first_name: document.full_name.split(" ")[0],
      email: user.email,
      identification: {
        type: "CPF",
        number: document.cpf,
      },
    };

    console.log(body);

    if (confirm) {
      if (user) {
        return <QrCodeField request={body} />;
      }
    }

    return null;
  };

  useEffect(() => {
    console.log(user);
  });

  return (
    <section className="w-full">
      <header className="p-5 border-b border-b-foreground/10 w-full flex items-center h-14">
        <article className="w-32">
          <DeployButton />
        </article>
      </header>

      <article className="flex flex-col items-center gap-10 pt-10 justify-center">
        <h1 className="text-3xl flex items-center gap-2">
          Seja um Verificado
          <MdOutlineVerified size={"30px"} color="#4db7ff" />
        </h1>

        <article
          className="w-2/4 border-2 border-foreground/100 p-10 flex 
        flex-col gap-8 rounded-lg bg-[#4E2D92]"
        >
          <article className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">Aumente suas possibilidades!</h3>
            <div
              className="font-medium text-xs cursor-default 
            bg-[#361C6C] flex pt-2 pb-2 px-5 rounded-2xl"
            >
              recomendado
            </div>
          </article>

          <ul className="flex flex-col gap-4">
            <li className="text-sm">Credibilidade e Confiança</li>
            <li className="text-sm">Maior Visibilidade</li>
            <li className="text-sm">Engajamento Aprimorado</li>
            <li className="text-sm">Proteção Contra Imitadores</li>
          </ul>

          <button
            onClick={() => setConfirm(true)}
            className="bg-white text-[#361C6C] w-1/5 text-sm py-2 text-nowrap px-24 
            rounded-full flex items-center justify-center"
          >
            Obter Verificado!
          </button>
        </article>
        <article className="flex justify-center mb-5">{callbackQrCode()}</article>
      </article>
    </section>
  );
}
