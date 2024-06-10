"use server";

import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UserMetadata } from "./types/user";
import { Companies } from "./types/companies";

export async function getUser(): Promise<UserMetadata | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (user && user.email && user.id) {
    const metadata: UserMetadata = {
      email: user.email,
      id: user.id,
      user_metadata :{
        fullName: user.user_metadata.fullName
      }
    };
    return metadata;
  }

  return null;
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath('/');
  return redirect("/login");
}

export const getCompanies = async (user: string) => {
  const supabase = createClient();

  return await supabase
  .from('companies')
  .select('*')
  .eq('user_id',user)
        
};

export async function addCompany(companyData: Companies) {
  const supabase = createClient();

  const { data, error } = await supabase.from('companies').insert([companyData]).select();

  if (error) {
    console.error('Failed to add company:', error.message);
    return null;
  }

  return data?.[0] ?? null;
}
