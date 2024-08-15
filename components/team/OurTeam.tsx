import { useEffect } from "react";
import CardTeam from "./cardTeam";
import Aos from "aos";

export default function OurTeam() {

  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <article className="w-full px-10 lg:px-40 py-40 text-white bg-[#1C1C1C] flex flex-col gap-10 lg:gap-20 justify-center">
      <h1 className="text-4xl lg:text-6xl font-bold text-[#22B573] text-center lg:text-left">
        NOSSO TIME
      </h1>
      <section className=" w-full h-full p-10 lg:p-0
      flex flex-col lg:gap-10 gap-56 lg:flex-row 
      lg:justify-start items-center border-white" data-aos="fade-up">
        <CardTeam linkedin="https://www.linkedin.com/in/rodrigo-farias-962aa2165/" name="Rodrigo Farias" photo="//live.staticflickr.com/65535/53921222181_c0c6f0c6ee_z.jpg"/>
        <CardTeam linkedin="https://www.linkedin.com/in/guilhermesquita/" name="Guilherme Mesquita" photo="//live.staticflickr.com/65535/53921677265_8e71607518_b.jpg"/>
      </section>
    </article>
  );
}
