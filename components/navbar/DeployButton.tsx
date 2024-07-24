"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMainLogo } from "../actions";
import Spinner from "../Spinner/Spinner";

export default function DeployButton() {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchLogoPhoto() {
      const url = await getMainLogo();
      setBackgroundUrl(url);
      setLoading(false);
    }
    fetchLogoPhoto();
  }, []);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <Link
      className="py-2  flex rounded-md hover:opacity-75 duration-300"
      href="/"
    >
      <img src={backgroundUrl as string} alt="" width="50px" />
    </Link>
  );
}
