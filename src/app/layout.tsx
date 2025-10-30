import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIKAAS - AI-Powered Talent Discovery for Indian Schools",
  description: "Transform education in India with VIKAAS - AI-driven platform for student talent discovery, NEP 2020 compliance, and holistic development assessment.",
  keywords: ["VIKAAS", "NEP 2020", "Indian education", "talent discovery", "AI in education", "student assessment", "holistic development"],
  authors: [{ name: "VIKAAS Team" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png"
  },
  openGraph: {
    title: "VIKAAS - AI-Powered Talent Discovery",
    description: "Transforming Indian education through AI-driven talent discovery and NEP 2020 compliance",
    url: "https://vikaas.education",
    siteName: "VIKAAS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIKAAS - AI-Powered Talent Discovery",
    description: "Transforming Indian education through AI-driven talent discovery",
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
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
