import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AuraService | Find Web Developers & UI Designers in Sri Lanka",
    template: "%s | AuraService"
  },
  description: "Connect with trusted local Web Developers and UI Designers near you in Sri Lanka. Direct contact via WhatsApp and Call. No middlemen.",
  keywords: ["web developers Sri Lanka", "UI designers Sri Lanka", "hire developers Colombo", "freelance designers Sri Lanka", "AuraService"],
  openGraph: {
    title: "AuraService | Find Web Developers & UI Designers in Sri Lanka",
    description: "Connect with trusted local professionals near you. Direct contact via WhatsApp and Call.",
    url: "https://auraservice.lk",
    siteName: "AuraService",
    locale: "en_LK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
