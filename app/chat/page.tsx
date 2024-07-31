"use client";

import { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import ChatWeb from "@/components/chatComponentPage/ChatComponentPage";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="flex-1 w-full flex flex-col gap-9 items-center">
      <Navbar />
      <div className="w-full flex flex-col items-center h-[40rem]">
        <ChatWeb />
      </div>
    </div>
  );
}
