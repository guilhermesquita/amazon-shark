import { useEffect, useState } from "react";
import { getBackGroundPhoto } from "../actions";

export default function Banner() {

    // const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

    // useEffect(() => {
    //     async function fetchBackgroundPhoto() {
    //       const url = await getBackGroundPhoto();
    //       setBackgroundUrl(url);
    //     }
    //     fetchBackgroundPhoto();
    //   }, []);

  return (
    <article className="w-full py-20 px-40 min-h-[500px] flex justify-between items-center lg:gap-10 bg-white 
    lg:flex-row flex-col animate-in"
    style={{
        backgroundImage: `url(https://xkryxpqojxjdvsedntht.supabase.co/storage/v1/object/public/amazonshark/FUNDO.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1
      }}>
      <h2 className="text-4xl lg:w-[40%] w-full text-white lg:text-6xl font-medium">Você é a oportunidade Que muitas Empresas Estão esperando.</h2>
      <article className="flex flex-row lg:flex-col gap-5 lg:gap-20 lg:w-[35%] w-full text-base text-white flex-wrap font-light">
        <p className="justify-normal">somos apaixonados por empreendedorismo, pela capacidade de uma empresa fazer evoluir nossa sociedade, gerar empregos e impulsionar a economia.</p>
        <p>A Amazon Shark existe para expandir as oportunidades dada a empresas do norte do país, colaborando ainda mais com sua estabilidade e expansão no mercado nacional.</p>
      </article>
    </article>
  );
}
