import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animal Adoption Platform - Encontre seu melhor amigo",
  description:
    "Plataforma moderna para adoção de animais. Conecte-se com pets incríveis que estão esperando por um lar cheio de amor e carinho.",
  keywords: [
    "adoção",
    "animais",
    "pets",
    "cachorro",
    "gato",
    "abrigo",
    "rescue",
  ],
  authors: [{ name: "Deivid Leal", url: "https://github.com/DeividLeal" }],
  creator: "Deivid Leal",
  publisher: "Animal Adoption Platform",
  openGraph: {
    title: "Animal Adoption Platform",
    description: "Encontre seu melhor amigo - Plataforma de adoção de animais",
    url: "https://animal-adoption-platform.vercel.app",
    siteName: "Animal Adoption Platform",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animal Adoption Platform",
    description: "Encontre seu melhor amigo - Plataforma de adoção de animais",
    creator: "@deividleal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
