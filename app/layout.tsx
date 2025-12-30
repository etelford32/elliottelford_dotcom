import type { Metadata } from "next";
import { Inter, Orbitron, Rajdhani, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DevBanner } from "@/components/layout/DevBanner";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { generateSEOMetadata } from "@/components/seo/SEOHead";
import { SITE_NAME } from "@/lib/constants";

// Optimized font loading with Next.js
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

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
    <html lang="en" className={`scroll-smooth ${inter.variable} ${orbitron.variable} ${rajdhani.variable} ${spaceGrotesk.variable}`}>
      <body className={`antialiased ${inter.className}`}>
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
