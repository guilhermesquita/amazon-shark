"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { UserMetadata } from "./types/user";
import { Companies } from "./types/companies";
import { Conversations } from "./types/conversations";
import { Messages } from "./types/messages";

// interface dtoConversation {
//   profile1_id: string;
//   profile2_id: string;
// }

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
      documents: user.identities,
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

export async function getClientById(id: string) {
  const supabase = createClient();
  return await supabase.from("profiles").select("*").eq('id', id);
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
    .from("companies")
    .select("image_url")
    .eq("company_id", companyId)
    .single();

  if (fetchError) {
    console.error("Failed to fetch company data:", fetchError.message);
    return false;
  }

  const imageUrl = companyData?.image_url;

  if (imageUrl) {
    const { error: storageError } = await supabase.storage
      .from("companies")
      .remove([imageUrl]);

    if (storageError) {
      console.error("Failed to delete company image:", storageError.message);
      return false;
    }
  }

  const { error: deleteError } = await supabase
    .from("companies")
    .delete()
    .eq("company_id", companyId);

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
    const fileExtension = file.name.split(".").pop();
    const photoPath = `${user_id}/${companyName}/image.${fileExtension}`;
    let data, error;

    if (isUpdate) {
      await supabase.storage.from("companies").remove([photoPath]);
    }

    ({ data, error } = await supabase.storage
      .from("companies")
      .upload(photoPath, file, { upsert: true }));

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function uploadPitch(
  user_id: string,
  companyName: string,
  pitch: FormData,
  isUpdate: boolean = false
): Promise<any> {
  const supabase = createClient();

  try {
    const file = pitch.get("file") as File;
    const fileExtension = file.name.split(".").pop();
    const pitchPath = `${user_id}/${companyName}/pitch.${fileExtension}`;
    let data, error;

    if (isUpdate) {
      await supabase.storage.from("companies").remove([pitchPath]);
    }

    ({ data, error } = await supabase.storage
      .from("companies")
      .upload(pitchPath, file, { upsert: true }));

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function uploadFinanceiro(
  user_id: string,
  companyName: string,
  financeiro: FormData,
  isUpdate: boolean = false
): Promise<any> {
  const supabase = createClient();

  try {
    const file = financeiro.get("file") as File;
    const fileExtension = file.name.split(".").pop();
    const financeiroPath = `${user_id}/${companyName}/financeiro.${fileExtension}`;
    let data, error;

    if (isUpdate) {
      await supabase.storage.from("companies").remove([financeiroPath]);
    }

    ({ data, error } = await supabase.storage
      .from("companies")
      .upload(financeiroPath, file, { upsert: true }));

    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getPhotoByCompanie(
  companyData: Companies
): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("companies")
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

export async function getPitchByCompanie(
  companyData: Companies
): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("companies")
      .createSignedUrl(companyData.pitch, 60);

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

export async function getFinanceiroByCompanie(
  companyData: Companies
): Promise<string | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("companies")
      .createSignedUrl(companyData.financeiro, 60);

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
    const { data, error } = await supabase.storage
      .from("amazonshark")
      .createSignedUrl("FUNDO.png", 60);

    if (error) {
      console.error("Error getting signed URL:", error);
    }

    return data?.signedUrl || null;
  } catch (e) {
    console.log("Exception getting signed URL:", e);
    return null;
  }
}

export async function getConversationsExists(profile1_id: string, profile2_id: string){
  const supabase = createClient();
  return supabase.from("conversations").select("*").eq("profile1_id", profile1_id).eq("profile2_id", profile2_id)
}

export async function createConversation(conversationData: Conversations){
  const supabase = createClient();
  supabase.from("conversations").insert([conversationData])
}

export async function getAllMessages(conversationId: number){
  const supabase = createClient();
  return supabase.from("messages").select("*").eq("conversation_id", conversationId)
}

// export const subscribeToMessages = () => {
//   const supabase = createClient();
//   supabase.channel('messages-component')
//   .on('postgres_changes', {
//     event: '*',
//     schema: 'public',
//     table: 'messages',
//   }, (payload:any) => {
//     console.log(payload)
//   }).subscribe()
// }

export async function sendMessage(messageData: Messages) {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert(
        {
          sender_id: messageData.sender_id,
          content: messageData.content,
          conversation_id: 1
        }
      );

    if (error) {
      console.log("Erro ao enviar mensagem:", error.message);
      return null;
    }

    console.log("Mensagem enviada com sucesso:", data);

    return data;
  } catch (error: any) {
    console.log("Erro ao enviar mensagem:", error.message);
    return null;
  }
}
