import { StructuredData } from "@/components/seo/SEOHead";
import { Card } from "@/components/ui/Card";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata = {
  title: "Contact Elliot Telford | Simulation Engineer & Space Mission Developer",
  description: "Get in touch for collaboration on space missions, simulation engineering projects, AI/ML research, or innovative consumer products. Open to consulting and full-time opportunities.",
};

export default function ContactPage() {
  const contactMethods = [
    {
      title: "Email",
      icon: "📧",
      value: SOCIAL_LINKS.email,
      href: `mailto:${SOCIAL_LINKS.email}`,
      description: "Best for detailed inquiries, project proposals, and professional collaboration",
      gradient: "from-purple-600/20 to-blue-600/20",
    },
    {
      title: "LinkedIn",
      icon: "💼",
      value: "elliottelford",
      href: SOCIAL_LINKS.linkedin,
      description: "Connect professionally, view experience, and explore collaboration opportunities",
      gradient: "from-cyan-600/20 to-teal-600/20",
    },
    {
      title: "GitHub",
      icon: "💻",
      value: "@elliottelford",
      href: SOCIAL_LINKS.github,
      description: "View open-source contributions, code samples, and ongoing projects",
      gradient: "from-green-600/20 to-emerald-600/20",
    },
    {
      title: "Twitter/X",
      icon: "🐦",
      value: "@elliottelford",
      href: SOCIAL_LINKS.twitter,
      description: "Follow for updates on simulations, space tech, and astrophysics insights",
      gradient: "from-blue-600/20 to-indigo-600/20",
    },
  ];

  const inquiryTypes = [
    {
      title: "Space Mission Collaboration",
      icon: "🚀",
      description: "Simulation tools for trajectory planning, mission analysis, or orbital mechanics consulting",
      topics: ["Trajectory Optimization", "Mission Planning Tools", "Orbital Mechanics", "Physics Simulation"],
    },
    {
      title: "AI/ML Research",
      icon: "🤖",
      description: "Machine learning systems, computer vision for astronomy, or neural network research projects",
      topics: ["Computer Vision", "Pattern Recognition", "Deep Learning", "Astrophysics AI"],
    },
    {
      title: "Product Development",
      icon: "🎮",
      description: "Consumer products, interactive experiences, or physics-based games and simulations",
      topics: ["Game Development", "Interactive Simulations", "UX Design", "Physics Engines"],
    },
    {
      title: "Technical Consulting",
      icon: "⚙️",
      description: "Simulation engineering, computational physics, or full-stack web development expertise",
      topics: ["WebGL/Three.js", "Physics Engines", "React/Next.js", "System Architecture"],
    },
  ];

  const availability = [
    {
      type: "Full-Time Opportunities",
      description: "Open to roles in space tech, AI labs, simulation engineering, and research institutions",
      icon: "💼",
      status: "Open",
    },
    {
      type: "Contract Projects",
      description: "Available for consulting on simulation development, physics engines, and space mission tools",
      icon: "📋",
      status: "Open",
    },
    {
      type: "Research Collaboration",
      description: "Interested in academic or industry research in computational astrophysics and AI/ML",
      icon: "🔬",
      status: "Open",
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
              Get in Touch
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-body text-shadow-subtle">
              Let&apos;s collaborate on space missions, simulations, and innovative products
            </p>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              I&apos;m always interested in discussing new opportunities, technical challenges,
              and projects that push the boundaries of computational astrophysics and interactive technology.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative space-y-56 lg:space-y-72 pb-32">
        {/* Contact Methods */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading text-shadow-glow">
                How to Reach Me
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Choose your preferred method of communication
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  href={method.href}
                  isExternal
                  className={`
                    relative rounded-3xl border border-foreground/10
                    bg-gradient-to-br ${method.gradient} backdrop-blur-sm
                    p-10 transition-all duration-300
                    hover:border-accent/40 hover:shadow-2xl hover:-translate-y-2
                    group
                  `}
                >
                  <div className="flex items-start gap-6">
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-accent font-heading mb-2 text-shadow-glow">
                        {method.title}
                      </h3>
                      <p className="text-lg text-secondary font-medium mb-3">
                        {method.value}
                      </p>
                      <p className="text-base text-foreground/80 leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  {/* External link indicator */}
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
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Types */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-shadow-glow">
                What I Can Help With
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                Areas of expertise and collaboration opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {inquiryTypes.map((type, index) => (
                <div
                  key={index}
                  className="relative rounded-3xl border border-foreground/10 bg-gradient-to-br from-card-bg/80 to-primary/50 backdrop-blur-sm p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-xl"
                >
                  <div className="text-6xl mb-6">{type.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-accent font-heading mb-4 text-shadow-glow">
                    {type.title}
                  </h3>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {type.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-card-bg/60 border border-secondary/30 text-foreground/90 text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading text-shadow-glow">
                  Current Availability
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Open to new opportunities and collaborations
                </p>
              </div>

              <div className="space-y-8">
                {availability.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-3xl border border-foreground/10 bg-gradient-to-r from-card-bg/90 to-primary/50 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:border-accent/30 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-6">
                      <div className="text-5xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-2xl font-bold text-accent font-heading">
                            {item.type}
                          </h3>
                          <span className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-sm font-semibold">
                            {item.status}
                          </span>
                        </div>
                        <p className="text-lg text-foreground/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Response Time & Expectations */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-3xl border border-secondary/20 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 backdrop-blur-sm p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary font-heading mb-8 text-shadow-glow text-center">
                  What to Expect
                </h2>
                <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
                  <p>
                    I typically respond to emails and messages within <strong className="text-accent">24-48 hours</strong> during
                    business days. For urgent inquiries related to space missions or time-sensitive projects, please
                    indicate &quot;URGENT&quot; in your subject line.
                  </p>
                  <p>
                    When reaching out, please include:
                  </p>
                  <ul className="space-y-3 pl-6">
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>A brief description of your project or opportunity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Specific areas where you need expertise (simulation, AI/ML, development, etc.)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Timeline and engagement type (full-time, contract, consultation, collaboration)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-accent mt-1">▸</span>
                      <span>Any relevant links to your organization or project</span>
                    </li>
                  </ul>
                  <p>
                    I&apos;m particularly excited about opportunities involving <strong className="text-secondary">space missions</strong>,
                    <strong className="text-secondary"> computational astrophysics research</strong>, and
                    <strong className="text-secondary"> innovative consumer products</strong> that inspire curiosity about the universe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading text-shadow-glow mb-6">
                  Before You Reach Out
                </h2>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Learn more about my work and capabilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card
                  href="/projects"
                  className="p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold text-accent font-heading mb-3">
                    View Projects
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Explore my portfolio of simulation engineering, astrophysics, and ML projects
                  </p>
                </Card>

                <Card
                  href="/simulations"
                  className="p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-5xl mb-4">🌌</div>
                  <h3 className="text-2xl font-bold text-accent font-heading mb-3">
                    Try Simulations
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Experience interactive astrophysics simulations demonstrating technical capabilities
                  </p>
                </Card>

                <Card
                  href="/about"
                  className="p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-5xl mb-4">👨‍🚀</div>
                  <h3 className="text-2xl font-bold text-accent font-heading mb-3">
                    About Me
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Learn about my background, mission, and what drives my work in space tech
                  </p>
                </Card>

                <Card
                  href="/blog"
                  className="p-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold text-accent font-heading mb-3">
                    Technical Blog
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Read deep dives into simulation engineering, physics, and software architecture
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative rounded-3xl border border-accent/20 bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-accent font-heading mb-6 text-shadow-glow">
                  Ready to Connect?
                </h2>
                <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-10">
                  Whether you&apos;re planning the next space mission, building cutting-edge AI systems,
                  or creating products that inspire wonder about the universe, I&apos;d love to hear from you.
                </p>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold rounded-xl bg-gradient-to-r from-accent to-secondary text-white border-2 border-accent hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/30"
                >
                  <span>📧</span>
                  <span>Send an Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
