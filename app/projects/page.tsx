import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StructuredData } from "@/components/seo/SEOHead";
import { CTABanner } from "@/components/seo/InternalCrossLinks";

export const metadata = {
  title: "Projects Portfolio | Elliot Telford",
  description: "Software engineering projects showcasing computational astrophysics, machine learning, web crawling, and interactive simulations - built for production and research.",
};

export default function ProjectsPage() {
  type ProjectStatus = "live" | "open-source" | "in-development" | "coming-soon";

  const projects: Array<{
    id: number;
    title: string;
    description: string;
    href: string | null;
    tags: string[];
    category: string;
    status: ProjectStatus;
    icon: string;
    gradient: string;
  }> = [
    {
      id: 1,
      title: "Atomik - Celestial Calendar",
      description: "Advanced astronomical calendar system integrating real-time celestial events, orbital mechanics, and time-based simulations for tracking cosmic phenomena.",
      href: null,
      tags: ["TypeScript", "Astronomy", "Data Visualization"],
      category: "Astrophysics Tooling",
      status: "coming-soon",
      icon: "📅",
      gradient: "from-purple-600/20 to-pink-600/20",
    },
    {
      id: 2,
      title: "Saturn's Rings Simulation",
      description: "Interactive WebGL simulation of Saturn's ring system with accurate orbital mechanics, particle dynamics, and gravitational interactions. Demonstrates n-body physics in real-time.",
      href: "https://elliottelford.com/saturn/",
      tags: ["WebGL", "Physics", "Three.js"],
      category: "Computational Astrophysics",
      status: "live",
      icon: "🪐",
      gradient: "from-amber-600/20 to-yellow-600/20",
    },
    {
      id: 3,
      title: "Venus Atmospheric Simulation",
      description: "Scientifically accurate model of Venus's extreme atmospheric conditions including greenhouse effects, pressure gradients, and temperature distribution across altitude layers.",
      href: "https://elliottelford.com/venus-earths-mysterious-evil-twin/",
      tags: ["Climate Modeling", "Scientific Computing", "Data Viz"],
      category: "Planetary Science",
      status: "live",
      icon: "🌋",
      gradient: "from-orange-600/20 to-red-600/20",
    },
    {
      id: 4,
      title: "Uranus Environment Simulation",
      description: "Comprehensive simulation of Uranus's unique tilted rotation, extreme seasons, and atmospheric composition with scientifically referenced data and interactive controls.",
      href: "https://elliottelford.com/uranus-simulation-scientific-data-reference/",
      tags: ["Physics Engine", "Scientific Data", "Interactive"],
      category: "Planetary Science",
      status: "live",
      icon: "🔵",
      gradient: "from-cyan-600/20 to-blue-600/20",
    },
    {
      id: 5,
      title: "S2 Star Orbital Analysis",
      description: "Visualization and analysis of the S2 star's extreme elliptical orbit around Sagittarius A*, demonstrating general relativistic effects and orbital precession near a supermassive black hole.",
      href: "https://elliottelford.com/the-s2-star-and-sagittarius-a-orbitals/",
      tags: ["General Relativity", "Orbital Mechanics", "WebGL"],
      category: "Computational Astrophysics",
      status: "live",
      icon: "⭐",
      gradient: "from-purple-600/20 to-indigo-600/20",
    },
    {
      id: 6,
      title: "Black Hole Gravitational Lensing",
      description: "Real-time ray-traced simulation of gravitational lensing around a black hole, featuring accretion disk rendering, Schwarzschild geometry, and photon trajectory calculations.",
      href: "https://elliottelford.com/simulating-a-black-hole/",
      tags: ["Ray Tracing", "GLSL Shaders", "General Relativity"],
      category: "Computational Astrophysics",
      status: "live",
      icon: "🌑",
      gradient: "from-slate-600/20 to-purple-600/20",
    },
    {
      id: 7,
      title: "MegaCrawler",
      description: "High-performance distributed web crawler built for large-scale data extraction. Features async I/O, rate limiting, content parsing, and scalable architecture for AI training datasets.",
      href: "https://github.com/etelford32/Crawler",
      tags: ["Python", "Async", "Data Engineering"],
      category: "Data Infrastructure",
      status: "open-source",
      icon: "🕷️",
      gradient: "from-green-600/20 to-emerald-600/20",
    },
    {
      id: 8,
      title: "Celestial Object & Star Simulator",
      description: "Full-featured astrophysics simulation platform for modeling stellar evolution, planetary formation, and n-body gravitational systems with customizable parameters and scientific accuracy.",
      href: "https://clstl-smltr.vercel.app/",
      tags: ["React", "Physics Engine", "Scientific Computing"],
      category: "Computational Astrophysics",
      status: "live",
      icon: "✨",
      gradient: "from-blue-600/20 to-cyan-600/20",
    },
    {
      id: 9,
      title: "Tide Pool Ecosystem Simulator",
      description: "Agent-based ecological simulation modeling predator-prey dynamics, resource competition, and environmental factors in tide pool ecosystems. Demonstrates emergent behavior and population dynamics.",
      href: "https://tide-pool-simulator.vercel.app/",
      tags: ["Agent-Based Modeling", "Ecology", "Canvas API"],
      category: "Biological Systems",
      status: "in-development",
      icon: "🦀",
      gradient: "from-teal-600/20 to-green-600/20",
    },
    {
      id: 10,
      title: "Bot Detector PRO",
      description: "Machine learning system for identifying automated bot behavior in web traffic. Uses statistical analysis, behavioral patterns, and neural networks for real-time bot detection and classification.",
      href: "https://github.com/etelford32/Bot_Detector",
      tags: ["Machine Learning", "Security", "Pattern Recognition"],
      category: "AI/ML Systems",
      status: "coming-soon",
      icon: "🤖",
      gradient: "from-red-600/20 to-orange-600/20",
    },
    {
      id: 11,
      title: "Neural Observatory Project",
      description: "AI-powered astronomical observation platform combining computer vision, deep learning, and astrophysical data analysis for automated celestial object detection and classification.",
      href: "https://github.com/etelford32/Neural_Observatory",
      tags: ["Deep Learning", "Computer Vision", "Astronomy"],
      category: "AI/ML Systems",
      status: "coming-soon",
      icon: "🔭",
      gradient: "from-indigo-600/20 to-violet-600/20",
    },
  ];

  const statusConfig = {
    "live": { text: "Live", variant: "accent" as const },
    "open-source": { text: "Open Source", variant: "secondary" as const },
    "in-development": { text: "In Development", variant: "default" as const },
    "coming-soon": { text: "Coming Soon", variant: "default" as const },
  };

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="website" />

      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
              Project Portfolio
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Computational astrophysics, machine learning systems, and scientific simulations
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Production-ready software demonstrating expertise in physics engines, distributed systems,
              neural networks, and interactive data visualization.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative space-y-56 lg:space-y-72 pb-32">
        {/* Projects Grid */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            {/* Category Context */}
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading text-shadow-glow">
                Featured Engineering Projects
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Full-stack applications, scientific computing, and AI/ML systems built with modern technologies
              </p>
            </div>

            {/* 3-Column Grid with Generous Spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {projects.map((project) => {
                const statusInfo = statusConfig[project.status];
                const CardComponent = project.href ? Card : 'div';
                const cardProps = project.href ? { href: project.href, isExternal: true } : {};

                return (
                  <CardComponent
                    key={project.id}
                    {...cardProps}
                    className={`
                      group relative rounded-3xl border border-foreground/10
                      bg-gradient-to-br ${project.gradient} backdrop-blur-sm
                      p-8 transition-all duration-300
                      ${project.href
                        ? 'hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 cursor-pointer'
                        : 'hover:border-foreground/20'
                      }
                      flex flex-col h-full min-h-[420px]
                    `}
                  >
                    {/* Project Icon & Status */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <Badge text={statusInfo.text} variant={statusInfo.variant} />
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-accent font-heading mb-4 text-shadow-glow group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>

                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-secondary/80 uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-card-bg/60 border border-foreground/20 text-foreground/90 text-sm font-medium backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External Link Indicator */}
                    {project.href && (
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-6 h-6 text-accent"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    )}
                  </CardComponent>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technical Skills Showcase */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-16 text-shadow-glow">
                Core Technical Competencies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Computational Physics & Simulations */}
                <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-foreground/10">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Computational Physics
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>N-body gravitational simulations & orbital mechanics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>General relativistic ray tracing & black hole physics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Atmospheric modeling & climate simulations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Real-time WebGL & GLSL shader programming</span>
                    </li>
                  </ul>
                </div>

                {/* Machine Learning & AI */}
                <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-teal-600/10 border border-foreground/10">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Machine Learning & AI
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Neural networks for pattern recognition & classification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Computer vision for astronomical data analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Behavioral analysis & anomaly detection systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Agent-based modeling & emergent behavior</span>
                    </li>
                  </ul>
                </div>

                {/* Software Engineering */}
                <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-foreground/10">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Software Engineering
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Full-stack TypeScript/React with Next.js</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Distributed systems & scalable architecture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Async I/O, concurrency, & performance optimization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Production deployment & DevOps (Vercel, Docker)</span>
                    </li>
                  </ul>
                </div>

                {/* Data & Visualization */}
                <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-orange-600/10 to-red-600/10 border border-foreground/10">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Data Engineering
                  </h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Large-scale data extraction & web crawling</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Interactive data visualization (D3.js, Three.js)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Scientific computing with Python & numerical methods</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Real-time data processing pipelines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Blog */}
        <CTABanner
          title="Learn How These Projects Work"
          description="Dive deep into the technical implementation details, algorithms, and engineering decisions behind these projects on the blog."
          primaryLink={{ text: "Read Technical Blog", href: "/blog" }}
          secondaryLink={{ text: "Explore Live Simulations", href: "/simulations" }}
        />

        {/* About Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-12 text-shadow-glow">
                Engineering Philosophy
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                <p>
                  These projects represent the intersection of <strong className="text-accent">rigorous scientific computing</strong> and
                  <strong className="text-accent"> production-quality software engineering</strong>. Each application is built
                  with attention to performance, accuracy, and user experience.
                </p>

                <p>
                  From gravitational n-body simulations that solve differential equations in real-time to distributed
                  web crawlers handling millions of requests, these systems demonstrate expertise in
                  <strong className="text-secondary"> mathematical modeling</strong>,
                  <strong className="text-secondary"> algorithmic optimization</strong>, and
                  <strong className="text-secondary"> scalable architecture</strong>.
                </p>

                <p>
                  The machine learning projects showcase practical applications of neural networks and
                  computer vision to real-world problems - from detecting bot behavior to classifying
                  astronomical objects. These systems are designed for production deployment with
                  considerations for latency, accuracy, and maintainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to GitHub/Contact */}
        <CTABanner
          title="Interested in Collaboration?"
          description="These projects demonstrate capabilities in computational physics, machine learning, and full-stack engineering. Let's discuss how these skills can contribute to cutting-edge research and development."
          primaryLink={{ text: "View GitHub Profile", href: "https://github.com/etelford32" }}
          secondaryLink={{ text: "Get in Touch", href: "/contact" }}
        />
      </div>
    </div>
  );
}
