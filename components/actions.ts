"use server";

import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UserMetadata } from "./types/user";

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
