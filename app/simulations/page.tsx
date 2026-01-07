import { StructuredData } from "@/components/seo/SEOHead";
import { CTABanner } from "@/components/seo/InternalCrossLinks";

export const metadata = {
  title: "Interactive Simulations | Elliot Telford",
  description: "Explore scientifically accurate computational astrophysics, quantum physics, biological evolution, and physics-based game simulations.",
};

export default function SimulationsPage() {
  const simulationShowcases = [
    {
      category: "computational-astrophysics",
      title: "Computational Astrophysics",
      description: "Scientifically accurate simulations of celestial mechanics, orbital dynamics, gravitational interactions, and stellar phenomena.",
      icon: "🌌",
      examples: [
        "N-body gravitational simulations with real-time orbital mechanics",
        "Black hole accretion disks with gravitational lensing effects",
        "Stellar evolution and lifecycle modeling",
        "Galaxy formation and dark matter dynamics",
        "Binary star systems and gravitational wave predictions"
      ],
      techStack: ["WebGL", "Three.js", "TypeScript", "Physics Engines"],
      gradient: "from-purple-600/20 to-blue-600/20",
      accentColor: "accent",
    },
    {
      category: "quantum-physics",
      title: "Quantum Physics Simulations",
      description: "Visualizations of quantum mechanical phenomena, wave functions, particle interactions, and quantum field theory concepts.",
      icon: "⚛️",
      examples: [
        "Wave-particle duality demonstrations",
        "Quantum tunneling visualizations",
        "Schrödinger equation solvers",
        "Quantum entanglement and superposition",
        "Particle collision simulations"
      ],
      techStack: ["GLSL Shaders", "WebGPU", "Mathematical Physics"],
      gradient: "from-cyan-600/20 to-teal-600/20",
      accentColor: "secondary",
    },
    {
      category: "biological-evolution",
      title: "Biological & Naturalistic Evolution",
      description: "Agent-based models demonstrating evolutionary algorithms, natural selection, emergent behaviors, and ecosystem dynamics.",
      icon: "🧬",
      examples: [
        "Genetic algorithm optimization with fitness landscapes",
        "Predator-prey population dynamics (Lotka-Volterra)",
        "Neural network evolution for adaptive behavior",
        "Swarm intelligence and collective behavior",
        "Ecosystem simulation with resource competition"
      ],
      techStack: ["JavaScript", "Canvas API", "Machine Learning", "Agent-Based Modeling"],
      gradient: "from-green-600/20 to-emerald-600/20",
      accentColor: "primary",
    },
    {
      category: "physics-games",
      title: "Physics-Based Games",
      description: "Interactive games that leverage realistic physics engines for engaging gameplay experiences grounded in scientific principles.",
      icon: "🎮",
      examples: [
        "Explore the Universe 2175 - Space RTS with realistic orbital mechanics",
        "Gravity well puzzle games with Newtonian dynamics",
        "Rocket trajectory simulations and landing challenges",
        "Orbital rendezvous and docking missions",
        "Collision physics and momentum conservation games"
      ],
      techStack: ["React Three Fiber", "Cannon.js", "Rapier Physics", "Game AI"],
      gradient: "from-orange-600/20 to-red-600/20",
      accentColor: "foreground",
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
              Interactive Simulations
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Scientifically accurate visualizations of physics, quantum mechanics, evolution, and interactive games
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              All simulations run directly in your browser using WebGL and modern web technologies. No downloads required.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative space-y-56 lg:space-y-72 pb-32">
        {/* Simulation Categories */}
        {simulationShowcases.map((showcase) => (
          <section key={showcase.category} className="relative py-20">
            <div className="container mx-auto px-6 lg:px-8">
              <div className={`
                relative rounded-3xl border border-foreground/10
                bg-gradient-to-br ${showcase.gradient} backdrop-blur-sm
                p-8 md:p-12 lg:p-16
                transition-all duration-300 hover:border-${showcase.accentColor}/30 hover:shadow-2xl
              `}>
                {/* Category Header */}
                <div className="flex items-start gap-6 mb-10">
                  <div className="text-6xl md:text-7xl lg:text-8xl">
                    {showcase.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent font-heading mb-4 text-shadow-glow">
                      {showcase.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-body">
                      {showcase.description}
                    </p>
                  </div>
                </div>

                {/* Examples */}
                <div className="mb-10">
                  <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-6 font-heading">
                    Featured Simulations
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {showcase.examples.map((example, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-lg text-foreground/90"
                      >
                        <span className="text-accent mt-1 flex-shrink-0">▸</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xl font-semibold text-foreground/70 mb-4 font-heading">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {showcase.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-card/50 border border-foreground/20 text-foreground/90 text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coming Soon Badge (for now) */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="px-6 py-3 rounded-lg bg-accent/20 border border-accent/40 text-accent font-semibold text-lg">
                    🚀 Simulations launching soon
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Banner */}
        <CTABanner
          title="Want to Build Your Own?"
          description="Check out my technical blog for tutorials on WebGL programming, physics simulation, and interactive visualizations. Learn how these simulations are built from the ground up."
          primaryLink={{ text: "Read the Blog", href: "/blog" }}
          secondaryLink={{ text: "View Source Code", href: "/projects" }}
        />

        {/* About Simulations */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-12">
                Why Simulations?
              </h2>

              <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                <p>
                  Interactive simulations are a powerful tool for understanding complex systems.
                  By visualizing abstract concepts in physics, quantum mechanics, and biology,
                  we can develop intuition for how the universe works at different scales.
                </p>

                <p>
                  All simulations on this site prioritize <strong className="text-accent">scientific accuracy</strong> while
                  maintaining real-time performance. Whether it&apos;s calculating gravitational N-body interactions,
                  solving differential equations for quantum wave functions, or modeling evolutionary fitness landscapes,
                  the math and physics are grounded in established scientific principles.
                </p>

                <p>
                  These projects sit at the intersection of <strong className="text-secondary">software engineering</strong>,
                  <strong className="text-secondary"> computational physics</strong>, and
                  <strong className="text-secondary"> interactive design</strong> - combining
                  rigorous science with engaging user experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA to Game */}
        <CTABanner
          title="Ready for a Full Game Experience?"
          description="Explore the Universe 2175 is a physics-based space RTS that takes these simulation concepts to the next level. Command fleets using real orbital mechanics and adaptive AI."
          primaryLink={{ text: "Play Explore the Universe 2175!", href: "https://exploretheuniverse2175.com" }}
          secondaryLink={{ text: "Learn More About the Game", href: "/projects" }}
        />
      </div>
    </div>
  );
}
