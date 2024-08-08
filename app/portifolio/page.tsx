'use client'
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PortifolioContent from "@/components/PortifolioContent";
import { useEffect } from "react";
import { UnreadMessageContextType, useUnreadMessage } from "../context/unreadMessageContext";

export default function Index() {

  const {unreadMessage} = useUnreadMessage() as UnreadMessageContextType

  useEffect(()=>{
    console.log(unreadMessage)
  })

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center min-h-screen">
      <Navbar/>
      <div className="w-full animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
          <PortifolioContent/>
      </div>
      <Footer/>
    </div>
  );
}
