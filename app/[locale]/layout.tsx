import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/shared/Navbar";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Language Tester",
  description: "Check your knowledge in different languages",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
