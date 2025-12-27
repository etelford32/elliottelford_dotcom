import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DevBanner } from "@/components/layout/DevBanner";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { generateSEOMetadata } from "@/components/seo/SEOHead";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: `${SITE_NAME} | Game Developer & Computational Astrophysicist`,
  }),
  title: {
    default: `${SITE_NAME} | Game Developer & Computational Astrophysicist`,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <ScrollProgress />
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
