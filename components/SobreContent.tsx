import React from "react";

function HomeContent() {
  return (
    <main className="hero flex flex-col items-center justify-center px-20 text-center">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="hero-text">
          <h2 className="text-4xl font-bold text-primary">
            Ninguém constrói nada grande sozinho
          </h2>
        </div>
      </section>
      <div>
      <p className="mt-4 text-lg text-secondary">
            Acreditamos no potencial dos pequenos negócios. Nossa plataforma ajuda
            micro e pequenas empresas a encontrarem parceiros, investidores e
            novos sócios. Com a oportunidade certa, podem alavancar seus
            negócios e alcançar grandes oceanos.
          </p>
      </div>
    </main>
  );
}

export default HomeContent;
