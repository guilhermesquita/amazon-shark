"use server";

import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = createClient()

  const data = await supabase.auth.getUser();

  return data.data.user || null;;
}

export async function signOut(){
    const supabase = createClient();

    await supabase.auth.signOut();

    revalidatePath('/');
    return redirect("/login");
}