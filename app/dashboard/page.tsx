"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Companies from "@/components/usuario/Companies";
import Profile from "@/components/usuario/Profile";
import React, { useEffect, useState } from "react";
import { getUser } from "@/components/actions";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import ModalEditNameUserProvider from "@/components/usuario/components/modalEditNameUser/ModalEditNameUserContext";
import ModalEditEmailUserProvider from "../../components/usuario/components/modalEditEmailUser/ModalEditEmailUserContext";
import ModalEditPasswordUserProvider from "@/components/usuario/components/modalEditPasswordUser/ModalEditEmailUserContext";
// import ModalEditPasswordUser from "@/components/usuario/components/modalEditPasswordUser/ModalEditPasswordUser";
// import ModalEditPasswordUserProvider from "../../components/usuario/components/modalEditPasswordUser/ModalEditNameUserContext";

type UserMetadata = {
  email: string;
  id: string;
};

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("companies");
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
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
    <ModalEditPasswordUserProvider>
      <ModalEditNameUserProvider>
        <ModalEditEmailUserProvider>
          <main className="flex flex-col min-h-screen w-full">
            <Navbar />

            <div className="mt-10 flex-1 flex flex-col gap-10 items-center">
              <article className="flex gap-10 justify-center">
                <button
                  className={`${
                    selectedSection === "companies"
                      ? "text-[#22B573] underline"
                      : "text-stone-400"
                  }`}
                  onClick={() => setSelectedSection("companies")}
                >
                  minhas empresas
                </button>
                <button
                  className={`${
                    selectedSection === "profile"
                      ? "text-[#22B573] underline"
                      : "text-stone-400"
                  }`}
                  onClick={() => setSelectedSection("profile")}
                >
                  meu perfil
                </button>
              </article>

              <section className="flex justify-center w-full mb-5">
                {selectedSection === "profile" ? <Profile /> : <Companies />}
              </section>
            </div>

            <Footer />
          </main>
        </ModalEditEmailUserProvider>
      </ModalEditNameUserProvider>
    </ModalEditPasswordUserProvider>
  );
}
