import { StructuredData } from "@/components/seo/SEOHead";
import { CTABanner } from "@/components/seo/InternalCrossLinks";
import Link from "next/link";

export const metadata = {
  title: "Space Games & Physics Simulations | Projects Portfolio | Elliot Telford",
  description: "Explore cutting-edge space games, interactive astrophysics simulations, and physics-based projects. From orbital mechanics to quantum simulations, discover scientifically accurate software engineering.",
  keywords: "space games, spacegames, physics simulations, astrophysics simulations, orbital mechanics games, space RTS, computational physics, game development, interactive simulations, WebGL projects",
  openGraph: {
    title: "Space Games & Physics Simulations Portfolio",
    description: "Interactive space games and scientifically accurate physics simulations built with modern web technologies",
  },
};

export default function ProjectsPage() {
  // Project categories for filtering
  const projectCategories = [
    { id: "all", label: "All Projects", icon: "🚀" },
    { id: "space-games", label: "Space Games", icon: "🎮" },
    { id: "simulations", label: "Physics Simulations", icon: "🌌" },
    { id: "web-apps", label: "Web Applications", icon: "💻" },
    { id: "open-source", label: "Open Source", icon: "🔓" },
  ];

  // Featured and recent projects data
  const projects = [
    {
      id: "explore-universe-2175",
      title: "Explore the Universe 2175",
      slug: "explore-the-universe-2175",
      description: "A physics-based space RTS game featuring realistic orbital mechanics, adaptive AI opponents, and procedurally generated star systems. Command fleets using Newtonian physics and gravitational assists.",
      category: "space-games",
      techStack: ["Unity", "C#", "Custom Physics Engine", "Procedural Generation", "AI/ML"],
      liveUrl: "https://exploretheuniverse2175.com",
      steamUrl: "https://store.steampowered.com/app/4094340/Explore_the_Universe_2175/",
      githubUrl: null,
      images: ["/projects/etu2175-hero.jpg"],
      featured: true,
      status: "In Development",
      year: "2025",
      tags: ["space", "RTS", "orbital mechanics", "AI", "procedural generation"],
      highlights: [
        "Realistic Newtonian orbital mechanics",
        "Adaptive AI that learns from player tactics",
        "Procedural star system generation",
        "N-body gravitational simulation",
        "Steam launch February 2nd, 2025"
      ]
    },
    {
      id: "black-hole-accretion-sim",
      title: "Black Hole Accretion Disk Simulation",
      slug: "black-hole-accretion-disk",
      description: "WebGL-based real-time simulation of black hole accretion physics including gravitational lensing, Doppler beaming, and relativistic jet formation using GLSL shaders.",
      category: "simulations",
      techStack: ["Three.js", "React Three Fiber", "GLSL Shaders", "TypeScript", "WebGL"],
      liveUrl: "/",
      githubUrl: "https://github.com/elliottelford",
      images: ["/projects/black-hole-sim.jpg"],
      featured: true,
      status: "Live",
      year: "2024",
      tags: ["astrophysics", "WebGL", "shaders", "general relativity", "visualization"],
      highlights: [
        "Gravitational lensing effects",
        "Relativistic Doppler shifts",
        "Polar jet dynamics",
        "60 FPS real-time rendering",
        "Scientifically accurate physics"
      ]
    },
    {
      id: "n-body-orbital-simulator",
      title: "N-Body Orbital Mechanics Simulator",
      slug: "n-body-orbital-simulator",
      description: "Interactive gravitational N-body simulation demonstrating chaotic orbital dynamics, Lagrange points, and Keplerian orbits with real-time position and velocity integration.",
      category: "simulations",
      techStack: ["JavaScript", "Canvas API", "Runge-Kutta Integration", "TypeScript"],
      liveUrl: "/simulations",
      githubUrl: "https://github.com/elliottelford",
      images: ["/projects/n-body-sim.jpg"],
      featured: true,
      status: "Live",
      year: "2024",
      tags: ["orbital mechanics", "n-body problem", "chaos theory", "gravitation"],
      highlights: [
        "Multi-body gravitational interactions",
        "Lagrange point visualization",
        "Orbital trajectory prediction",
        "Configurable masses and velocities",
        "Educational and interactive"
      ]
    },
    {
      id: "quantum-wave-visualizer",
      title: "Quantum Wave Function Visualizer",
      slug: "quantum-wave-visualizer",
      description: "Real-time visualization of quantum mechanical wave functions, particle-wave duality, and Schrödinger equation solutions using WebGPU compute shaders.",
      category: "simulations",
      techStack: ["WebGPU", "WGSL Shaders", "TypeScript", "React", "Mathematical Physics"],
      liveUrl: "/simulations",
      githubUrl: "https://github.com/elliottelford",
      images: ["/projects/quantum-sim.jpg"],
      featured: false,
      status: "In Development",
      year: "2024",
      tags: ["quantum physics", "wave functions", "WebGPU", "visualization"],
      highlights: [
        "Time-dependent Schrödinger solver",
        "Wave-particle duality demos",
        "Quantum tunneling visualization",
        "WebGPU compute shaders",
        "Interactive parameter control"
      ]
    },
    {
      id: "evolutionary-algorithm-sim",
      title: "Evolutionary Behavior Simulation",
      slug: "evolutionary-behavior-simulation",
      description: "Agent-based evolutionary simulation demonstrating natural selection, genetic algorithms, and emergent behavior in competitive ecosystems with neural network agents.",
      category: "simulations",
      techStack: ["JavaScript", "Neural Networks", "Genetic Algorithms", "Canvas API"],
      liveUrl: "/simulations",
      githubUrl: "https://github.com/elliottelford",
      images: ["/projects/evolution-sim.jpg"],
      featured: false,
      status: "Live",
      year: "2024",
      tags: ["evolution", "AI", "genetic algorithms", "neural networks", "emergent behavior"],
      highlights: [
        "Neural network-driven agents",
        "Fitness landscape evolution",
        "Predator-prey dynamics",
        "Genetic mutation and selection",
        "Emergent complex behaviors"
      ]
    },
    {
      id: "portfolio-website",
      title: "Interactive Portfolio with 3D Graphics",
      slug: "portfolio-website",
      description: "This portfolio website featuring custom Three.js visualizations, React 19, Next.js App Router, and serverless architecture with advanced SEO optimization.",
      category: "web-apps",
      techStack: ["Next.js 16", "React 19", "Three.js", "TypeScript", "Tailwind CSS", "Vercel"],
      liveUrl: "https://elliottelford.com",
      githubUrl: "https://github.com/elliottelford/portfolio",
      images: ["/projects/portfolio.jpg"],
      featured: false,
      status: "Live",
      year: "2024",
      tags: ["web development", "Three.js", "Next.js", "portfolio", "SEO"],
      highlights: [
        "Custom 3D black hole visualization",
        "Server-side rendering",
        "SEO optimized",
        "Responsive design",
        "Modern React patterns"
      ]
    },
  ];

  // Featured project (Explore the Universe 2175)
  const featuredProject = projects[0];

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="website" />

      {/* Hero Section with SEO Keywords */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
              Space Games & Physics Simulations
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Building the future of interactive space games and scientifically accurate physics simulations
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              From orbital mechanics to quantum physics, explore cutting-edge projects combining rigorous science with engaging gameplay and visualizations.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Project Showcase */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-accent font-heading mb-6">
              Featured Project
            </h2>
            <p className="text-xl text-foreground/70">
              Currently in development and launching soon
            </p>
          </div>

          <div className="relative rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm p-8 md:p-12 lg:p-16 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
            {/* Featured Badge */}
            <div className="absolute top-8 right-8 px-6 py-3 bg-accent rounded-full text-black font-bold text-lg">
              ⭐ Featured
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-secondary/20 border border-secondary/40 rounded-lg text-secondary font-semibold">
                  {featuredProject.status} • {featuredProject.year}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-accent font-heading">
                  {featuredProject.title}
                </h3>

                <p className="text-xl text-foreground/80 leading-relaxed">
                  {featuredProject.description}
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  <h4 className="text-2xl font-semibold text-secondary">Key Features</h4>
                  <ul className="space-y-2">
                    {featuredProject.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-foreground/90">
                        <span className="text-accent mt-1 flex-shrink-0">▸</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-xl font-semibold text-foreground/70 mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-card/50 border border-foreground/20 text-foreground/90 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-accent hover:bg-accent/80 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-accent/50 hover:scale-105"
                    >
                      Visit Website →
                    </a>
                  )}
                  {featuredProject.steamUrl && (
                    <a
                      href={featuredProject.steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-secondary/20 hover:bg-secondary/30 border-2 border-secondary text-secondary font-bold text-lg rounded-xl transition-all duration-300"
                    >
                      View on Steam
                    </a>
                  )}
                </div>
              </div>

              {/* Placeholder for project image/demo */}
              <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-foreground/10 flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <p className="text-xl text-foreground/60">
                    Game Screenshot Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects Stream */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-accent font-heading mb-6">
              All Projects
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              A collection of space games, physics simulations, and interactive web applications
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(1).map((project) => (
              <div
                key={project.id}
                className="group relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6 px-3 py-1 bg-secondary/20 border border-secondary/40 rounded-full text-secondary text-xs font-semibold">
                  {project.status}
                </div>

                {/* Project Image Placeholder */}
                <div className="relative aspect-video rounded-xl bg-gradient-to-br from-accent/10 to-secondary/10 border border-foreground/10 mb-6 flex items-center justify-center overflow-hidden">
                  <div className="text-4xl opacity-50">
                    {project.category === "space-games" ? "🎮" : project.category === "simulations" ? "🌌" : "💻"}
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-accent font-heading mb-2 group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="text-sm text-foreground/50 mb-2">Built with:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs text-foreground/60"
                        >
                          {tech}{i < Math.min(2, project.techStack.length - 1) ? " •" : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target={project.liveUrl.startsWith("http") ? "_blank" : undefined}
                        rel={project.liveUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex-1 px-4 py-2 bg-accent/20 hover:bg-accent/30 border border-accent/40 text-accent font-semibold text-sm rounded-lg transition-all duration-300 text-center"
                      >
                        View Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/20 text-foreground/70 font-semibold text-sm rounded-lg transition-all duration-300"
                        title="View Source Code"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABanner
        title="Interested in Collaborating?"
        description="I&apos;m always excited to work on innovative space games, physics simulations, and interactive experiences. Let&apos;s build something amazing together."
        primaryLink={{ text: "Get in Touch", href: "/contact" }}
        secondaryLink={{ text: "View Simulations", href: "/simulations" }}
      />

      {/* Technologies & Expertise */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-16">
              Technologies & Expertise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Game Development",
                  icon: "🎮",
                  skills: ["Unity & C#", "Physics Engines", "AI & Pathfinding", "Procedural Generation", "Multiplayer Networking"]
                },
                {
                  title: "Physics Simulation",
                  icon: "⚛️",
                  skills: ["N-body Dynamics", "Orbital Mechanics", "Quantum Physics", "Fluid Dynamics", "Relativistic Effects"]
                },
                {
                  title: "Web Technologies",
                  icon: "💻",
                  skills: ["React & Next.js", "Three.js & WebGL", "TypeScript", "GLSL Shaders", "WebGPU"]
                },
                {
                  title: "Mathematics & Science",
                  icon: "🔬",
                  skills: ["Computational Astrophysics", "Numerical Methods", "Linear Algebra", "Differential Equations", "Algorithm Design"]
                }
              ].map((category, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-foreground/10 bg-card/30 p-6 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-accent mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill, j) => (
                      <li key={j} className="flex items-start gap-2 text-foreground/80">
                        <span className="text-secondary mt-1">▸</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABanner
        title="Play Explore the Universe 2175"
        description="Experience the culmination of physics simulation and strategy gameplay in our flagship space RTS. Launching February 2nd, 2025 on Steam."
        primaryLink={{ text: "Play Explore the Universe 2175!", href: "https://exploretheuniverse2175.com" }}
        secondaryLink={{ text: "Read Development Blog", href: "/blog" }}
      />
    </div>
  );
}
