"use server";

import { revalidatePath } from "next/cache";
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type UserMetadata = {
  email: string;
  id: string;
};

export async function getUser(): Promise<UserMetadata | null> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && user.email && user.id) {
    const metadata: UserMetadata = {
      email: user.email,
      id: user.id,
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
