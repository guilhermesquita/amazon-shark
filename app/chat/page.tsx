"use client";
import Navbar from "@/components/navbar/Navbar";
import ChatWeb from "@/components/chatComponentPage/ChatComponentPage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClientContextType, useClient } from "../context/clientContext";

export default function Index() {
  const router = useRouter();
  const { client } = useClient() as ClientContextType;

  useEffect(() => {
    if (!client?.id) {
      router.push("/login");
    }
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center ">
      <Navbar />
      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <div>
          <ChatWeb />
        </div>
      </div>
    </div>
  );
}
