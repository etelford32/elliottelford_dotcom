import { Hero } from "@/components/home/Hero";
import { PillarCards } from "@/components/home/PillarCards";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { RecentPosts } from "@/components/home/RecentPosts";
import { Newsletter } from "@/components/home/Newsletter";
import { SocialFollow } from "@/components/home/SocialFollow";
import { CrossSitePromo } from "@/components/seo/InternalLinks";
import { StructuredData } from "@/components/seo/SEOHead";
import { QuickLinksGrid, CTABanner } from "@/components/seo/InternalCrossLinks";

export default function Home() {
  const quickLinks = [
    {
      title: "Interactive Simulations",
      href: "/simulations",
      icon: "🌌",
      description: "Explore scientifically accurate visualizations of black holes, planetary systems, and stellar dynamics.",
      color: "accent" as const,
    },
    {
      title: "Technical Blog",
      href: "/blog",
      icon: "📝",
      description: "Deep dives into orbital mechanics, game AI, WebGL shaders, and the intersection of physics and code.",
      color: "secondary" as const,
    },
    {
      title: "Project Portfolio",
      href: "/projects",
      icon: "🚀",
      description: "Software engineering projects showcasing full-stack development and systems architecture.",
      color: "primary" as const,
    },
  ];

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="person" />
      <StructuredData type="website" />

      {/* Hero Section with Three.js Background */}
      <Hero />

      {/* Main Content with massively increased spacing */}
      <div className="relative space-y-56 lg:space-y-72">
        {/* What I Do - Pillar Cards */}
        <PillarCards />

        {/* Quick Links to Internal Content */}
        <section className="py-32 lg:py-40 relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 lg:mb-32 space-y-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
                Explore More
              </h2>
              <p className="text-2xl md:text-3xl text-foreground/80 leading-relaxed max-w-4xl mx-auto font-body text-shadow-subtle text-center">
                Discover interactive simulations, technical articles, and engineering projects
              </p>
            </div>

            <QuickLinksGrid links={quickLinks} />
          </div>
        </section>

        {/* Featured Work */}
        <FeaturedWork />

        {/* CTA to Blog */}
        <CTABanner
          title="Learn How It's Built"
          description="Follow along as I document the development process, share technical insights, and explore the intersection of computational astrophysics and game development."
          primaryLink={{ text: "Read Technical Blog", href: "/blog" }}
          secondaryLink={{ text: "View All Projects", href: "/projects" }}
        />

        {/* Cross-Site Promotional Banner */}
        <CrossSitePromo />

        {/* Recent Blog Posts */}
        <RecentPosts />

        {/* CTA to Simulations */}
        <CTABanner
          title="Experience the Physics"
          description="Interactive WebGL simulations demonstrating n-body orbital mechanics, black hole gravitational lensing, and stellar dynamics - all scientifically accurate and running in your browser."
          primaryLink={{ text: "Explore Simulations", href: "/simulations" }}
          secondaryLink={{ text: "About My Work", href: "/about" }}
        />

        {/* Newsletter Subscription */}
        <Newsletter />

        {/* Social Follow */}
        <SocialFollow />
      </div>
    </div>
  );
}
