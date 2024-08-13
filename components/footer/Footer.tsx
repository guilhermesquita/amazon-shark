import React from "react";

export default function Footer() {
  return (
    <footer
      // style={{
      //   backgroundImage: `url(https://xkryxpqojxjdvsedntht.supabase.co/storage/v1/object/public/amazonshark/Rectangle-background.svg?t=2024-07-23T21%3A02%3A15.716Z)`,
      //   backgroundSize: "100%",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "left ",
      // }}
      className="w-full mt-auto bg-[#22B573] text-white border-t border-t-foreground/10 p-8 flex gap-28 justify-center text-center text-xs fixed-bottom"
    >
      <article className="flex flex-col text-left w-32 gap-10">
        <span
          className="font-bold text-base"
        >
          Conheça
        </span>
        <a className="hover:underline" href="/sobre-nos">Sobre nós</a>
        <a className="hover:underline" href="/como-funciona">Como funciona</a>
        <a className="hover:underline" href="/portifolio">Portifólio</a>
      </article>

      <article className="flex flex-col text-left w-32 gap-10">
        <span
          className="font-bold text-base "
        >
          Plataforma
        </span>
        <a className="hover:underline" href="/login">Entrar</a>
        <a className="hover:underline" href="/login">Cadastrar-se</a>
      </article>

      <article className="flex flex-col text-left w-32 gap-10">
        <span
          className="font-bold text-base"
        >
          Suporte
        </span>
        <a className="hover:underline" href="https://www.instagram.com/amazonsharkoficial/">Central</a>
        <a className="hover:underline" href="https://wa.me/559293445362?text=">Fale conosco</a>
      </article>
      
    </footer>
  );
}
