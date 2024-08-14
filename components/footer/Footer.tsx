import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full bg-[#22B573] text-white border-t border-t-foreground/10 p-8 flex lg:flex-row flex-col lg:gap-28 gap-10 justify-center text-center text-xs"
    >
      <div className="flex flex-col text-left gap-5 w-32">
        <span className="font-bold text-base">Conheça</span>
        <a className="hover:underline" href="/sobre-nos">Sobre nós</a>
        <a className="hover:underline" href="/como-funciona">Como funciona</a>
        <a className="hover:underline" href="/portifolio">Portifólio</a>
      </div>

      <div className="flex flex-col text-left gap-5 w-32">
        <span className="font-bold text-base">Plataforma</span>
        <a className="hover:underline" href="/login">Entrar</a>
        <a className="hover:underline" href="/login">Cadastrar-se</a>
      </div>

      <div className="flex flex-col text-left gap-5 w-32">
        <span className="font-bold text-base">Suporte</span>
        <a className="hover:underline" href="https://www.instagram.com/amazonsharkoficial/">Central</a>
        <a className="hover:underline" href="https://wa.me/559293445362?text=">Fale conosco</a>
      </div>
      
    </footer>
  );
}
