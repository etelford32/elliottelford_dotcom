import { StructuredData } from "@/components/seo/SEOHead";
import { CTABanner } from "@/components/seo/InternalCrossLinks";
import { RELATED_SITES } from "@/lib/constants";

export const metadata = {
  title: "Technical Blog | Elliot Telford",
  description: "Deep dives into computational astrophysics, game development, physics simulations, and software engineering.",
};

export default function BlogPage() {
  const blogCategories = [
    {
      title: "Space & Astrophysics",
      icon: "🌌",
      description: "Orbital mechanics, gravitational simulations, N-body problems, and celestial dynamics",
      topics: [
        "Implementing realistic orbital mechanics in WebGL",
        "Black hole rendering and gravitational lensing",
        "N-body simulation optimization techniques",
        "Stellar evolution modeling"
      ],
      gradient: "from-purple-600/20 to-blue-600/20",
    },
    {
      title: "Game Development",
      icon: "🎮",
      description: "RTS game architecture, AI systems, physics engines, and procedural generation",
      topics: [
        "Building adaptive AI for space strategy games",
        "Real-time physics in React Three Fiber",
        "Procedural universe generation algorithms",
        "Optimizing Three.js for large-scale scenes"
      ],
      gradient: "from-cyan-600/20 to-teal-600/20",
    },
    {
      title: "Physics Simulations",
      icon: "⚛️",
      description: "Computational physics, quantum mechanics, and interactive visualizations",
      topics: [
        "Quantum wave function visualization",
        "Particle systems and collision detection",
        "Fluid dynamics simulations",
        "Evolutionary algorithm implementations"
      ],
      gradient: "from-green-600/20 to-emerald-600/20",
    },
    {
      title: "Software Engineering",
      icon: "💻",
      description: "Full-stack development, system architecture, performance optimization, and best practices",
      topics: [
        "Next.js app architecture patterns",
        "TypeScript for large-scale applications",
        "WebGL performance optimization",
        "Real-time multiplayer networking"
      ],
      gradient: "from-orange-600/20 to-red-600/20",
    },
  ];

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="website" />

      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
              Technical Blog
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Deep dives into computational astrophysics, game development, and the intersection of physics and code
            </p>

            {/* Main CTA to elliottelford.com */}
            <div className="pt-8">
              <a
                href={RELATED_SITES.portfolio.url}
                className="inline-block px-12 py-6 bg-accent hover:bg-accent/80 text-black font-bold text-xl md:text-2xl rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105"
              >
                Visit elliottelford.com →
              </a>
              <p className="text-lg text-foreground/60 mt-4">
                View the complete portfolio and blog
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative space-y-56 lg:space-y-72 pb-32">
        {/* Blog Categories Overview */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-heading mb-6">
                What I Write About
              </h2>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto">
                Technical articles covering physics, programming, and game development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {blogCategories.map((category, index) => (
                <div
                  key={index}
                  className={`
                    relative rounded-3xl border border-foreground/10
                    bg-gradient-to-br ${category.gradient} backdrop-blur-sm
                    p-8 md:p-10
                    transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:scale-105
                  `}
                >
                  <div className="text-5xl md:text-6xl mb-6">{category.icon}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-accent font-heading mb-4">
                    {category.title}
                  </h3>
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/90">
                        <span className="text-secondary mt-1 flex-shrink-0">▸</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Writing Philosophy */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-12">
                My Writing Approach
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                <p>
                  I write about the technical challenges, solutions, and insights I encounter
                  while building physics simulations, games, and interactive experiences.
                  Each article aims to be both <strong className="text-accent">technically rigorous</strong> and
                  <strong className="text-accent"> practically useful</strong>.
                </p>

                <p>
                  Topics range from deep dives into orbital mechanics algorithms, to WebGL shader optimization,
                  to AI system architecture for strategy games. Whether you&apos;re building your own simulations,
                  learning game development, or just curious about how things work, these articles
                  provide code examples, mathematical derivations, and real-world performance insights.
                </p>

                <p>
                  All posts include <strong className="text-secondary">working code examples</strong>,
                  <strong className="text-secondary"> interactive demos</strong>, and
                  <strong className="text-secondary"> links to open-source implementations</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Main Portfolio */}
        <CTABanner
          title="Read the Full Blog"
          description="Visit elliottelford.com to read all articles, with code samples, interactive demos, and detailed technical breakdowns."
          primaryLink={{ text: "Visit elliottelford.com", href: RELATED_SITES.portfolio.url }}
          secondaryLink={{ text: "Explore Simulations", href: "/simulations" }}
        />

        {/* Recent Topics Preview */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-16">
                Recent Topics
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Implementing N-Body Gravitational Simulations in Three.js",
                    category: "Space & Astrophysics",
                    excerpt: "A deep dive into building scientifically accurate orbital mechanics with WebGL performance optimization",
                    readTime: "12 min read"
                  },
                  {
                    title: "Adaptive AI for Real-Time Strategy Games",
                    category: "Game Development",
                    excerpt: "How to build AI that learns player behavior and adjusts difficulty dynamically",
                    readTime: "15 min read"
                  },
                  {
                    title: "Quantum Wave Function Visualization with GLSL Shaders",
                    category: "Physics Simulations",
                    excerpt: "Rendering quantum mechanical phenomena in real-time using GPU compute",
                    readTime: "10 min read"
                  }
                ].map((post, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-foreground/10 bg-card/30 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-secondary font-semibold">{post.category}</span>
                      <span className="text-foreground/40">•</span>
                      <span className="text-sm text-foreground/60">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 font-heading">
                      {post.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <a
                  href={RELATED_SITES.portfolio.url}
                  className="inline-block px-8 py-4 bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-bold text-lg rounded-lg transition-all duration-300"
                >
                  Read all articles on elliottelford.com →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Projects */}
        <CTABanner
          title="See the Code in Action"
          description="Check out the projects and simulations that these blog posts are based on. All open source and available on GitHub."
          primaryLink={{ text: "View Projects", href: "/projects" }}
          secondaryLink={{ text: "Play the Game", href: "https://exploretheuniverse2175.com" }}
        />
      </div>
    </div>
  );
}
