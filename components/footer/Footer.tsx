import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage: `url(https://xkryxpqojxjdvsedntht.supabase.co/storage/v1/object/public/amazonshark/Rectangle-background.svg?t=2024-07-23T21%3A02%3A15.716Z)`,
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
      className="w-full bg-[#22B573] text-white border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs fixed-bottom"
    >
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          AmazonShark
        </a>
      </p>
    </footer>
  );
}
