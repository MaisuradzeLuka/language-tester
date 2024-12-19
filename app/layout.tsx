import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Language Tester",
  description: "Check your knowledge in different languages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
