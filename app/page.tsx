"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeContent from "@/components/HomeContent";
import { getBackGroundPhoto } from "../components/actions";
import Spinner from "@/components/Spinner/Spinner";
import ContactFloatButton from "@/components/contact/ContactFloatButton";
import Banner from "@/components/banner/Banner";
import Infos from "@/components/infos/Infos";
import OurTeam from "@/components/team/OurTeam";

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
    return <Spinner />;
  }

  return (
    <main className="w-full flex flex-col min-h-screen">
      <main className="w-full flex flex-col">
        <Navbar />
        <article className="mt-10 w-full flex flex-col items-center flex-grow gap-7">
          <div
            className="flex flex-col h-[500px] animated-background bg-gradient-to-r from-[#22B573] via-[#22B573] to-[#005957]
        w-full items-center justify-center"
          >
            <HomeContent />
            <a
              href="/portifolio"
              className="bg-[#fff] hover:bg-[#f9f5f5] mt-9 py-4 px-10 rounded-md duration-300 drop-shadow-lg"
            >
              navegar
            </a>
          </div>
        </article>
        <Banner />
      </main>
      <article className="flex flex-col gap-40 mt-40">
        <Infos />
        <OurTeam />
      </article>
      <ContactFloatButton />
      <Footer />
    </main>
  );
}
