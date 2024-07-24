import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/store/Providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AmazonShark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground" style={{
        backgroundImage: `url(https://xkryxpqojxjdvsedntht.supabase.co/storage/v1/object/public/amazonshark/Background%20Patterns.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        <main className="flex flex-col items-center min-h-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
