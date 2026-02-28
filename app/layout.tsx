import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PAROXY - The Ultimate Founder OS",
  description:
    "AI-powered platform solving every challenge founders face—from legal to finance, marketing to mental health.",
  keywords: [
    "startup",
    "founder",
    "entrepreneur",
    "AI assistant",
    "business management",
    "legal automation",
    "financial management",
  ],
  authors: [{ name: "PAROXY Team" }],
  openGraph: {
    title: "PAROXY - The Ultimate Founder OS",
    description:
      "AI-powered platform for solo founders and entrepreneurs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

