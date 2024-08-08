"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeContent from "@/components/HomeContent";
import { getBackGroundPhoto } from "../components/actions";
import Spinner from "@/components/Spinner/Spinner";

export default function Index() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBackgroundPhoto() {
      const url = await getBackGroundPhoto();
      setBackgroundUrl(url);
      setLoading(false);
    }
    fetchBackgroundPhoto();
  }, []);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="w-full flex flex-col min-h-screen items-center">
      <Navbar />
      <main className="w-full flex flex-col justify-center items-center gap-7">
        <div
          className="mt-20 flex h-[500px] w-3/4 animate-in items-center justify-center opacity-0 rounded-3xl"
          style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1
          }}
        >
          <HomeContent />
        </div>
        <a href="/sobre-nos" className="bg-[#22B573] hover:bg-[#198b58] duration-300 text-white py-4 px-10 rounded-md drop-shadow-lg mb-10">
          Navegue
        </a>
      </main>

      <Footer />
    </div>
  );
}
