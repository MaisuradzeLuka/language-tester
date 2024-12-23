import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Language Tester",
  description: "Check your knowledge in different languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  searchParams: string;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
