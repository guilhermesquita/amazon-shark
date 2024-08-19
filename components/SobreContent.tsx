'use client'
import { ClientContextType, useClient } from "@/app/context/clientContext";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

function HomeContent() {

  const {client} = useClient() as ClientContextType

  return (
    <main>
      <main className="hero w-full flex lg:flex-row flex-col text-center gap-5 lg:gap-0 justify-center items-center">
        <iframe
          src="https://www.youtube.com/embed/WncbmE5cNHs?si=p0T_2N_HOiAT4DIa&autoplay=1&mute=1"
          className="lg:w-4/5 w-full h-80 rounded-md"
          allow="autoplay"
        ></iframe>
        <section className="w-full flex lg:items-end items-center flex-col pr-5 gap-5">
          <h2 className="text-4xl font-bold text-primary">Sobre Nós</h2>
          <h3 className="text-xl font-bold text-[#626262]">
            Ninguém constrói nada grande sozinho
          </h3>
          <p className="md:w-96 w-full text-justify text-black font-bold">
            Acreditamos no potencial dos pequenos negócios. Nossa plataforma
            ajuda micro e pequenas empresas a encontrarem parceiros,
            investidores e novos sócios. Com a oportunidade certa, podem
            alavancar seus negócios e alcançar grandes oceanos.
          </p>
        </section>
      </main>
      <article className="w-full flex justify-center p-10">
        <a href={client ? '/portifolio': '/login'} className="inline-block h-14 w-14 float-left text-white bg-[#22B573] hover:bg-[#198b58] duration-300 rounded-full overflow-hidden hover:w-48 relative">
          <div className="inline-block h-14 w-14 rounded-full box-border leading-[60px] p-4">
            <IoIosArrowBack
              size={"25px"}
              style={{ lineHeight: "60px", marginRight: "5px", marginTop: "1px" }}
            />
          </div>
          <span className="absolute cursor-pointer ml-5 w-full leading-[60px] opacity-0 hover:opacity-100 transition-opacity duration-300">
            Navegar!
          </span>
        </a>
      </article>
    </main>
  );
}

export default HomeContent;
