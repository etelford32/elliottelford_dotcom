import { StructuredData } from "@/components/seo/SEOHead";
import { CTABanner } from "@/components/seo/InternalCrossLinks";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "About Elliot Telford | Simulation Engineer & Astrophysics Developer",
  description: "Simulation engineer specializing in computational astrophysics, space mission design, and interactive experiences. Building the future of space exploration through code and physics.",
};

export default function AboutPage() {
  const expertise = [
    {
      title: "Computational Astrophysics",
      icon: "🌌",
      description: "Developing scientifically accurate simulations of celestial mechanics, orbital dynamics, and gravitational interactions using advanced physics engines and numerical methods.",
      gradient: "from-purple-600/20 to-blue-600/20",
    },
    {
      title: "Simulation Engineering",
      icon: "⚙️",
      description: "Building real-time physics simulations with WebGL, Three.js, and custom physics engines. Specializing in n-body problems, particle systems, and fluid dynamics.",
      gradient: "from-cyan-600/20 to-teal-600/20",
    },
    {
      title: "Space Mission Design",
      icon: "🚀",
      description: "Applying orbital mechanics and trajectory optimization to real-world space mission scenarios. Designing systems for spacecraft navigation and celestial body interactions.",
      gradient: "from-orange-600/20 to-red-600/20",
    },
    {
      title: "Interactive Experiences",
      icon: "✨",
      description: "Creating engaging, user-friendly interfaces that make complex physics accessible. Building games and interactive tools that educate and inspire curiosity about the universe.",
      gradient: "from-green-600/20 to-emerald-600/20",
    },
  ];

  const goals = [
    {
      title: "Space Missions",
      icon: "🛰️",
      description: "Contributing to the next generation of space exploration through simulation tools, trajectory planning systems, and mission analysis software.",
      color: "accent",
    },
    {
      title: "Consumer Products",
      icon: "🎮",
      description: "Developing consumer-facing applications and games that bring the wonder of space and physics to everyday users. Making science accessible and fun.",
      color: "secondary",
    },
    {
      title: "Educational Experiences",
      icon: "🎓",
      description: "Creating interactive simulations and visualizations that help people understand complex scientific concepts through hands-on exploration and experimentation.",
      color: "primary",
    },
  ];

  const journey = [
    {
      phase: "Foundation",
      description: "Developed deep expertise in computational physics, orbital mechanics, and software engineering. Built foundational skills in mathematics, simulation design, and systems architecture.",
    },
    {
      phase: "Simulation Mastery",
      description: "Created advanced astrophysics simulations modeling everything from Saturn's rings to black hole gravitational lensing. Mastered real-time physics engines and WebGL rendering.",
    },
    {
      phase: "Production Systems",
      description: "Shipped production-grade applications including Explore the Universe 2175, a physics-based space RTS. Gained experience in full-stack development, game AI, and user experience design.",
    },
    {
      phase: "Future Vision",
      description: "Focused on contributing to space missions, building innovative consumer products, and creating experiences that inspire the next generation of space enthusiasts and engineers.",
    },
  ];

  return (
    <div className="relative">
      {/* Structured Data for SEO */}
      <StructuredData type="person" />

      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-accent font-heading text-shadow-glow tracking-wide">
              About Me
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Simulation Engineer & Astrophysics Developer
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Building the future through computational astrophysics, space mission design,
              and interactive experiences that inspire curiosity about the universe.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative space-y-56 lg:space-y-72 pb-32">
        {/* Mission Statement */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl border border-accent/20 bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading mb-8 text-shadow-glow text-center">
                  My Mission
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                  <p>
                    I&apos;m driven by a singular vision: <strong className="text-accent">to advance humanity&apos;s reach into space</strong> through
                    innovative simulation technology and computational astrophysics. Every project I build serves this greater purpose.
                  </p>
                  <p>
                    Whether it&apos;s developing physics engines that accurately model orbital mechanics, creating interactive
                    simulations that make complex astrophysics accessible, or building consumer products that inspire wonder
                    about the cosmos—my work bridges the gap between <strong className="text-secondary">rigorous science</strong> and
                    <strong className="text-secondary"> engaging user experiences</strong>.
                  </p>
                  <p>
                    I believe the future of space exploration requires not just rockets and satellites, but also the
                    computational tools to plan missions, predict outcomes, and train the next generation of space scientists
                    and engineers. That&apos;s the future I&apos;m building, one simulation at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Expertise */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading text-shadow-glow">
                Core Expertise
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Specialized skills at the intersection of physics, engineering, and interactive design
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {expertise.map((area, index) => (
                <div
                  key={index}
                  className={`
                    relative rounded-3xl border border-foreground/10
                    bg-gradient-to-br ${area.gradient} backdrop-blur-sm
                    p-8 md:p-10 transition-all duration-300
                    hover:border-accent/30 hover:shadow-2xl hover:-translate-y-2
                  `}
                >
                  <div className="text-6xl mb-6">{area.icon}</div>
                  <h3 className="text-3xl font-bold text-accent font-heading mb-4 text-shadow-glow">
                    {area.title}
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Goals & Vision */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-shadow-glow">
                What I&apos;m Building
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Three pillars driving my work forward
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {goals.map((goal, index) => (
                <Card
                  key={index}
                  className="text-center p-10 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-7xl mb-6">{goal.icon}</div>
                  <h3 className={`text-2xl md:text-3xl font-bold text-${goal.color} font-heading mb-4`}>
                    {goal.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                    {goal.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading text-shadow-glow">
                  The Journey
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  From computational physics to space mission engineering
                </p>
              </div>

              <div className="space-y-8">
                {journey.map((phase, index) => (
                  <div
                    key={index}
                    className="relative pl-8 md:pl-12 border-l-4 border-accent/30 hover:border-accent transition-colors duration-300"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accent border-4 border-background" />
                    <h3 className="text-2xl md:text-3xl font-bold text-accent font-heading mb-3">
                      {phase.phase}
                    </h3>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Technologies */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-center mb-16 text-shadow-glow">
                Technical Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Physics & Simulation
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["N-body Dynamics", "Orbital Mechanics", "WebGL/GLSL", "Three.js", "Physics Engines", "Ray Tracing", "Particle Systems", "Fluid Dynamics"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-card-bg border border-accent/30 text-foreground/90 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Software Engineering
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["TypeScript", "React", "Next.js", "Python", "Node.js", "Git", "Docker", "Vercel"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-card-bg border border-secondary/30 text-foreground/90 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Machine Learning
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Neural Networks", "Computer Vision", "Pattern Recognition", "Agent-Based Models", "Evolutionary Algorithms"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-card-bg border border-foreground/30 text-foreground/90 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-secondary font-heading">
                    Game Development
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Game AI", "RTS Design", "User Experience", "Interactive Design", "Real-time Systems"].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-card-bg border border-foreground/30 text-foreground/90 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Focus */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl border border-secondary/20 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 backdrop-blur-sm p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading mb-8 text-shadow-glow text-center">
                  Current Focus
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                  <p>
                    Right now, I&apos;m focused on <strong className="text-accent">contributing to space mission design</strong> through
                    advanced simulation tools and trajectory optimization systems. I&apos;m particularly interested in opportunities
                    with space agencies, aerospace companies, and research institutions working on the next generation of
                    space exploration missions.
                  </p>
                  <p>
                    I&apos;m also developing <strong className="text-secondary">consumer-facing products</strong> that make astrophysics
                    and space science accessible to wider audiences—including games, interactive simulations, and educational tools
                    that inspire curiosity about the universe.
                  </p>
                  <p>
                    If you&apos;re working on space missions, building physics simulations, or creating products that push the
                    boundaries of what&apos;s possible with interactive technology, <strong className="text-accent">let&apos;s connect</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banners */}
        <CTABanner
          title="See My Work in Action"
          description="Explore the interactive simulations and engineering projects that demonstrate these capabilities in production environments."
          primaryLink={{ text: "View Projects", href: "/projects" }}
          secondaryLink={{ text: "Try Simulations", href: "/simulations" }}
        />

        <CTABanner
          title="Let&apos;s Build the Future Together"
          description="Interested in collaboration on space missions, simulation engineering, or innovative consumer products? I&apos;d love to hear from you."
          primaryLink={{ text: "Get in Touch", href: "/contact" }}
          secondaryLink={{ text: "Read Technical Blog", href: "/blog" }}
        />
      </div>
    </div>
  );
}
