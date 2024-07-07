import React from 'react'
import { CiFileOn } from "react-icons/ci";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbPresentationAnalytics } from "react-icons/tb";

function ComoFuncionaContent() {
    return (
        <div className="flex flex-col items-center justify-center py-2">
          <main className="flex flex-col items-center justify-center flex-1 text-center">
            <h3 className="text-4xl font-bold mb-8">
              Como Funciona
            </h3>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl">
              <div className="flex flex-col items-center">
                <IoPersonAddOutline size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Cadastre-se</h2>
                <p className="mt-2 text-lg text-center">
                  Inclua o máximo de informações
                </p>
              </div>
              <div className="flex flex-col items-center">
                <AiOutlinePicture size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Inclua anexos</h2>
                <p className="mt-2 text-lg text-center">
                  Inclua anexos (demonstrativos, plano de negócio, etc)
                </p>
              </div>
              <div className="flex flex-col items-center">
                <CiFileOn size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Coloque o pitch</h2>
                <p className="mt-2 text-lg text-center">
                  Coloque o pitch. (Video de apresentação)
                </p>
              </div>
              <div className="flex flex-col items-center">
                <IoIosInformationCircleOutline size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Descrições</h2>
                <p className="mt-2 text-lg text-center">
                  Deixe claro do que trata-se o seu negócio.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <TbPresentationAnalytics size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Analise as propostas</h2>
                <p className="mt-2 text-lg text-center">
                  Analise as propostas e escolha a que melhor se encaixa na sua necessidade e planejamento.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <HiOutlineCog6Tooth size={50} className="mb-4"/>
                <h2 className="text-xl font-bold">Mantenha atualizada</h2>
                <p className="mt-2 text-lg text-center">
                  Mantenha atualizada as suas informações.
                </p>
              </div>
            </div>
          </main>
        </div>
      )
}

export default ComoFuncionaContent