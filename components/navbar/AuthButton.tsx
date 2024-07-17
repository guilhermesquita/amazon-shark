'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineVerified } from "react-icons/md";
import { getUser, signOut } from "../actions";
import DropdownMenu from "./DropdownMenu";
import Spinner from "../Spinner/Spinner";
import { useUser, UserContextType } from "@/app/context/userContext";

export default function AuthButton() {
  const { user, setUser } = useUser() as UserContextType;
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      setLoading(false);
      console.log(fetchedUser)
    }

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) {
    return <Spinner />;
  }

  const handleLogout = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await signOut();
    setUser(null);
  };

  return user ? (
    <div className="flex items-center gap-3">
      <DropdownMenu
        onLogout={handleLogout}
        userName={user.email ? user.email.split("@")[0] : ""}
      />
      <Link
        href="/verified"
        className="flex items-center gap-2 
        py-2 px-3 rounded-md no-underline duration-300
        bg-[#0c6350] hover:bg-[#0a4b3d]"
      >
        <MdOutlineVerified size={"30px"} />
        Obter Verificação
      </Link>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
