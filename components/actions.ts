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

export const getAllCompanies = async () => {
  const supabase = createClient();

  return await supabase
  .from('companies')
  .select('*');
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

export async function deleteCompany(companyId: number) {
  const supabase = createClient();

  const { error } = await supabase.from('companies').delete().eq('company_id', companyId);

  if (error) {
    console.error('Failed to delete company:', error.message);
    return false;
  }

  return true;
}

export async function updateCompany(companyData: Companies) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('companies')
    .update(companyData)
    .eq('company_id', companyData.company_id)
    .select();

  if (error) {
    console.error('Failed to update company:', error.message);
    return null;
  }

  return data?.[0] ?? null;
}

