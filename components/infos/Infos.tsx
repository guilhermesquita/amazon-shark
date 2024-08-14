import { useState } from "react";
const allInfos = [
  {
    nameInfo: "Parceiros",
    content1:
      "Aumento de faturamento - Você sabia que mais de 48% das startups faturam por causa de parcerias?",
    content2:
      "Expansão e Estabilidade de mercado - As parcerias colaboram diretamente com sua estabilidade no mercado, expansão de clientes, e alcance de mais visibilidade.",
  },
  {
    nameInfo: "Investidores",
    content1:
      "Está pensando em aumentar sua produção ou operação? Os recursos são necessários para realizar um crescimento significativo, pensando nisso, nossa plataforma possibilita essa visibilidade e análise para propostas de investidores.",
    content2:
      "RECURSOS (Capital de giro; Maquinas e equipamentos): Os recurso que você pode proporcionar pode ser dos mais diversos, cada objeto ou valor serve para uma proposta de investimento.",
  },
  {
    nameInfo: "Novos Sócios",
    content1:
      "Sua empresa não precisa de dinheiro! Isso mesmo! Muitas empresas que estão iniciando precisam de alguém que acredite na ideia e some esforços para tornar o sonho em realidade. Feliz é o sócio que encontra alguém que sonha o seu sonho.",
    content2:
      "Você sabia que seus conhecimentos e habilidades podem levar você a se tornar socio de um empreendimento? Você é a oportunidade que muitos empreendedores querem como sócio. Invista seu Knowhow (conhecimento), força e tempoo bem mais preciso em uma empresa.",
  },
  {
    nameInfo: "Oportunidades",
    content1:
      "Uma única oportunidade pode mudar o rumo do seu negócio. Nossa plataforma possibilita as mais diversas oportunidades, sendo elas elaboradas por pessoas e empresas que tenham interesse em comum.",
  },
];

export default function Infos() {
  const [selectedInfo, setSelectedInfo] = useState(0);

  return (
    <article className="lg:px-40 px-10 flex lg:flex-row flex-col gap-14 lg:h-[500px] h-auto">
      <ul className="flex lg:flex-col flex-row gap-14 lg:gap-24 lg:overflow-y-visible overflow-y-auto flex-grow lg:flex-grow-0">
        {allInfos.map((info, Index) => (
          <li
            onClick={() => setSelectedInfo(Index)}
            className={`hover:text-[#22B573] text-base font-medium duration-200 cursor-pointer ${
              Index === selectedInfo ? "text-[#22B573]" : "text-[#ADB4B1]"
            }`}
            key={Index}
          >
            {info.nameInfo}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-12 items-center">
        <h1 className="lg:w-3/4 w-full lg:text-3xl text-xl font-bold bg-white p-5 lg:p-10 rounded-lg shadow-xl">
          {allInfos[selectedInfo].content1}
        </h1>
        {allInfos[selectedInfo].content2 && (
          <p className="lg:w-3/4 w-full border-2 p-5 lg:p-10">
            {allInfos[selectedInfo].content2}
          </p>
        )}
      </div>
    </article>
  );
}

