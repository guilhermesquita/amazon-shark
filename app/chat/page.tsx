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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div>
          <ChatWeb />
        </div>
      </div>
    </div>
  );
}
