"use client";
import { UserContextType, useUser } from "../context/userContext";
import { useEffect, useState } from "react";
import DeployButton from "@/components/navbar/DeployButton";
import QrCodeField from "@/components/qrcodeField/qrCodeField";
import { UserIdentity } from "@supabase/supabase-js";
import { requestBodyPost } from "@/service/pixApi";
import { MdOutlineVerified } from "react-icons/md";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Index() {
  const { user } = useUser() as UserContextType;

  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

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

    if (confirm) {
      if (user) {
        return <QrCodeField request={body} />;
      }
    }

    return null;
  };

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

        <article>
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              Aumente suas possibilidades!
            </h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">R$</span>
              <span className="text-5xl font-extrabold tracking-tight">57</span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /mês
              </span>
            </div>
            <ul role="list" className="space-y-5 my-7">
              <li className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Credibilidade e confiança
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Maior visibilidade
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Engajamento Aprimorado
                </span>
              </li>
              <li className="flex">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                  Proteção contra intimidadores
                </span>
              </li>
              <li className="flex line-through decoration-gray-500">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                  Plágios de sua empresa
                </span>
              </li>
              <li className="flex line-through decoration-gray-500">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 ms-3">
                  Insegurança
                </span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => setConfirm(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Eu quero ser um verificado!
            </button>
          </div>
        </article>
        <article className="flex justify-center mb-5">
          {callbackQrCode()}
        </article>
      </article>
    </section>
  );
}
