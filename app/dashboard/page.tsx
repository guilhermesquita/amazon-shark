"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Companies from "@/components/usuario/Companies";
import Profile from "@/components/usuario/Profile";
import React, { useEffect, useState } from "react";
import { getUser } from "@/components/actions";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type UserMetadata = {
  email: string;
  id: string;
};

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("profile");
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);

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
  
  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      setLoading(false);
      console.log(fetchedUser);
    }

    fetchUser();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center min-h-screen">
      <Navbar />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl w-full px-3">
        <main className="flex-1 flex flex-row gap-6">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <div className="w-full h-600">
            {user ? (
              selectedSection === "profile" ? <Profile /> : <Companies />
            ) : (
              <div>Faça o Login</div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
