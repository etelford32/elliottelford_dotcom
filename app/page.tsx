import { Hero } from "@/components/home/Hero";
import { PillarCards } from "@/components/home/PillarCards";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { RecentPosts } from "@/components/home/RecentPosts";
import { Newsletter } from "@/components/home/Newsletter";
import { SocialFollow } from "@/components/home/SocialFollow";
import { CrossSitePromo } from "@/components/seo/InternalLinks";
import { StructuredData } from "@/components/seo/SEOHead";

export default function Home() {
  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="person" />
      <StructuredData type="website" />

      {/* Hero Section with Three.js Background */}
      <Hero />

      {/* Main Content */}
      <div className="relative">
        {/* What I Do - Pillar Cards */}
        <PillarCards />

        {/* Featured Work */}
        <FeaturedWork />

        {/* Cross-Site Promotional Banner */}
        <CrossSitePromo />

        {/* Recent Blog Posts */}
        <RecentPosts />

        {/* Newsletter Subscription */}
        <Newsletter />

        {/* Social Follow */}
        <SocialFollow />
      </div>
    </div>
  );
}
