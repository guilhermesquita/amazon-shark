"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser, signOut } from '../actions';
import DropdownMenu from './DropdownMenu';

type UserMetadata = {
  email: string;
  id: string;
};

export default function AuthButton() {
  const [user, setUser] = useState<UserMetadata | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      console.log(fetchedUser);
    }

    fetchUser();
  }, []);

  const handleLogout = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await signOut();
    setUser(null);
  };

  return user ? (
    <DropdownMenu onLogout={handleLogout} userName={user.email ? user.email.split('@')[0] : ''} />
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
