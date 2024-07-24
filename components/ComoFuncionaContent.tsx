import React from "react";
import { CiFileOn } from "react-icons/ci";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline, IoMdBusiness } from "react-icons/io";
import { TbPresentationAnalytics } from "react-icons/tb";
import Timeline from "./timeline";

function ComoFuncionaContent() {
  const content = [
    {
      content: "Cadastre um perfil",
      icon: (
        <IoPersonAddOutline className="w-6 h-6 text-white-600 dark:text-white-400" />
      ),
    },
    {
      content: "Cadastre uma empresa",
      icon: (
        <IoMdBusiness className="w-6 h-6 text-white-600 dark:text-white-400" />
      ),
    },
    {
      content: "Coloque o pitch",
      icon: <CiFileOn className="w-6 h-6 text-white-600 dark:text-white-400" />,
    },
    {
      content: "Adicione uma descrição",
      icon: (
        <IoIosInformationCircleOutline className="w-6 h-6 text-white-600 dark:text-white-400" />
      ),
    },
    {
      content: "Adicione os anexos",
      icon: (
        <AiOutlinePicture className="w-6 h-6 text-white-600 dark:text-white-400" />
      ),
    },
    {
      content: "Analise as propostas",
      icon: (
        <TbPresentationAnalytics className="w-6 h-6 text-white-600 dark:text-white-400" />
      ),
    },
  ];

  return (
    <main className="flex flex-col items-center flex-1 text-center">
      <h3 className="text-4xl font-bold mb-8 w-full flex justify-end">
        Como Funciona
      </h3>
        {content.map((item, index) => (
          <Timeline icon={item.icon} content={item.content}/>
        ))}
    </main>
  );
}

export default ComoFuncionaContent;
