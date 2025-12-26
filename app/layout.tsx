import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DevBanner } from "@/components/layout/DevBanner";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Game Developer & Computational Astrophysicist`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "game development",
    "astrophysics",
    "space simulations",
    "RTS game",
    "computational physics",
    "systems engineering",
    "Three.js",
    "Rust",
    "React",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} | Game Developer & Computational Astrophysicist`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Game Developer & Computational Astrophysicist`,
    description: SITE_DESCRIPTION,
    creator: "@elliottelford",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <DevBanner />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
