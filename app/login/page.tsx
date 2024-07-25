"use client"
import Link from "next/link";
import { SubmitButton } from "./submit-button";
import { useState } from "react";
import { signIn,signUp } from "./actions";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const [showSignupFields, setShowSignupFields] = useState(false);

  const handleShowSignupFields = () => {
    setShowSignupFields(true);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Voltar
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Senha
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        {showSignupFields && (
          <>
            <label className="text-md" htmlFor="confirmPassword">
              Confirmar Senha
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
            <label className="text-md" htmlFor="full_name">
              Nome Completo
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="full_name"
              placeholder="Seu Nome Completo"
              required
            />
            <label className="text-md" htmlFor="cpf">
              CPF
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="cpf"
              placeholder="000.000.000-00"
              required
            />
            <label className="text-md" htmlFor="phone">
              Celular
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="tel"
              name="phone"
              placeholder="(00) 00000-0000"
              required
            />
          </>
        )}

        {!showSignupFields ? (
          <>
            <SubmitButton
              formAction={signIn}
              className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
              pendingText="Entrando..."
            >
              Entrar
            </SubmitButton>
            <button
              type="button"
              className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
              onClick={handleShowSignupFields}
            >
              Desejo me cadastrar
            </button>
          </>
        ) : (
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Cadastrando..."
          >
            Cadastrar
          </SubmitButton>
        )}
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
