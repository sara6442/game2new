import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Princess Dress-Up — Fun Fashion Game",
  description: "A cute dress-up game for kids. Mix and match hairstyles, tops, skirts, dresses, accessories, and backgrounds. No nudity — just pure fashion fun!",
  keywords: ["dress-up", "fashion game", "kids game", "paper doll", "princess", "outfit"],
  authors: [{ name: "Dress-Up Game" }],
  openGraph: {
    title: "Princess Dress-Up",
    description: "A cute dress-up game for kids — mix and match outfits!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Princess Dress-Up",
    description: "A cute dress-up game for kids — mix and match outfits!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
