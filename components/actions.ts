"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
      user_metadata: {
        fullName: user.user_metadata.fullName,
      },
    };
    return metadata;
  }

  return null;
}

export async function signOut() {
  const supabase = createClient();

  await supabase.auth.signOut();

  revalidatePath("/");
  return redirect("/login");
}

export const getCompanieByName = async (name: string) => {
  const supabase = createClient();

  return await supabase.from("companies").select("*").eq("name", name);
};

export const getCompanies = async (user: string) => {
  const supabase = createClient();

  return await supabase.from("companies").select("*").eq("user_id", user);
};

export const getAllCompanies = async () => {
  const supabase = createClient();

  return await supabase.from("companies").select("*");
};

export async function addCompany(companyData: Companies) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("companies")
    .insert([companyData])
    .select();

  if (error) {
    console.error("Failed to add company:", error.message);
    return null;
  }

  return data?.[0] ?? null;
}

export async function deleteCompany(companyId: number) {
  const supabase = createClient();

  const { data: companyData, error: fetchError } = await supabase
    .from('companies')
    .select('image_url')
    .eq('company_id', companyId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch company data:", fetchError.message);
    return false;
  }

  const imageUrl = companyData?.image_url;

  if (imageUrl) {
    const { error: storageError } = await supabase
      .storage
      .from('companies')
      .remove([imageUrl]);

    if (storageError) {
      console.error("Failed to delete company image:", storageError.message);
      return false;
    }
  }

  const { error: deleteError } = await supabase
    .from('companies')
    .delete()
    .eq('company_id', companyId);

  if (deleteError) {
    console.error("Failed to delete company:", deleteError.message);
    return false;
  }

  return true;
}

export async function updateCompany(companyData: Companies) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("companies")
    .update(companyData)
    .eq("company_id", companyData.company_id)
    .select();

  if (error) {
    console.error("Failed to update company:", error.message);
    return null;
  }

  return data?.[0] ?? null;
}

export async function uploadPhoto(
  user_id: string,
  companyName: string,
  photo: FormData,
  isUpdate: boolean = false
): Promise<any> {
  const supabase = createClient();

  try {
    const file = photo.get("file") as File;
    const fileExtension = file.name.split('.').pop();
    const photoPath = `${user_id}/${companyName}/image.${fileExtension}`;
    let data, error;
    
    if (isUpdate) {
      await supabase.storage.from("companies").remove([photoPath]);
    }
    
    ({ data, error } = await supabase.storage.from("companies").upload(photoPath, file, { upsert: true }));
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPhotoByCompanie(companyData: Companies): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .storage
      .from('companies')
      .createSignedUrl(companyData.image_url, 60);

    if (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }

    return data?.signedUrl || null;
  } catch (e) {
    console.error("Exception getting signed URL:", e);
    return null;
  }
}

export async function getBackGroundPhoto(): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .storage
      .from('amazonshark')
      .createSignedUrl('FUNDO.png', 60);

    if (error) {
      console.error("Error getting signed URL:", error);
      return null;
    }

    return data?.signedUrl || null;
  } catch (e) {
    console.error("Exception getting signed URL:", e);
    return null;
  }
}
