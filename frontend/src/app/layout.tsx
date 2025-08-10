import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/mainpage/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cadimar-Digital Marketing Agency Tiktok, Facebook",
  description: "Transform your business with powerful digital marketing solutions. We help businesses grow through innovative strategies and creative content.",
  icons: {
    icon: "/cadimar_logo.png",
    apple: "/cadimar_logo.png",
  },
  openGraph: {
    title: "Digital Marketing Agency Tiktok, Facebook",
    description: "Transform your business with powerful digital marketing solutions. We help businesses grow through innovative strategies and creative content.",
    images: [
      {
        url: "/cadimar_logo.png",
        width: 800,
        height: 600,
        alt: "CADIMAR Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
