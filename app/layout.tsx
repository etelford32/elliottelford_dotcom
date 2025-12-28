import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DevBanner } from "@/components/layout/DevBanner";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { StarCursor } from "@/components/ui/StarCursor";
import { generateSEOMetadata } from "@/components/seo/SEOHead";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: `${SITE_NAME} | Interstellar Game Developer & Computational Astrophysicist | Next.js Space Simulations`,
    description: "Elliot Telford - Building the future through code and physics. Explore scientifically accurate space simulations, black hole visualizations, and cutting-edge game development with Three.js, WebGL, and orbital mechanics.",
  }),
  title: {
    default: `${SITE_NAME} | Interstellar Game Developer & Computational Astrophysicist`,
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased cursor-none">
        <StarCursor />
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
