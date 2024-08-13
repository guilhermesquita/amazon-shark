import CardTeam from "./cardTeam";

export default function OurTeam() {
  return (
    <article className="w-full p-40 text-white bg-[#1C1C1C] flex flex-col gap-20 justify-center">
      <h1 className="text-6xl font-bold text-[#22B573]">NOSSO TIME</h1>
      <section className="flex gap-10">
        <CardTeam linkedin="https://www.linkedin.com/in/rodrigo-farias-962aa2165/" name="Rodrigo Farias" photo="//live.staticflickr.com/65535/53921222181_c0c6f0c6ee_z.jpg"/>
        <CardTeam linkedin="https://www.linkedin.com/in/guilhermesquita/" name="Guilherme Mesquita" photo="//live.staticflickr.com/65535/53921677265_8e71607518_b.jpg"/>
      </section>
    </article>
  );
}
