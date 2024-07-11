"use client";
import { useState, useEffect } from 'react';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HomeContent from "@/components/HomeContent";
import { getBackGroundPhoto } from '../components/actions';
import Spinner from '@/components/Spinner/Spinner';

export default function Index() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isLoading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBackgroundPhoto() {
      const url = await getBackGroundPhoto();
      setBackgroundUrl(url);
      setLoading(false)
    }
    fetchBackgroundPhoto();
  }, []);

  if(isLoading){
    <Spinner/>
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar/>
      <div
        className="flex-1 animate-in flex flex-col items-center justify-center gap-20 opacity-0"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <HomeContent/>
      </div>
      <Footer/>
    </div>
  );
}
