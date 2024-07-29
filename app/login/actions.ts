"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function signIn(formData: FormData) {
    
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=Usuário ou senha inválidos");
  }

  return redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const cpf = formData.get("cpf") as string;
  const phone = formData.get("phone") as string;

  const teste = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: full_name,
        cpf: cpf,
        phone: phone
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (teste.error) {
    return redirect(`/login?message=Could not authenticate user error: ${teste.error.message}`);
  }

  return redirect("/login?message=Confirme o Email (Verifique a caixa de spam)");
}
