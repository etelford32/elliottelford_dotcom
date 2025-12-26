import { PageWrapper } from "@/components/layout/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-accent mb-6">
            Building the Future Through Code & Physics
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Game Developer | Computational Astrophysicist | Systems Engineer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/simulations"
              className="bg-accent text-primary px-8 py-4 rounded-md text-lg font-medium hover:bg-[#52e8c4] transition-colors inline-block"
            >
              Explore Simulations
            </a>
            <a
              href="/game"
              className="border-2 border-accent text-accent px-8 py-4 rounded-md text-lg font-medium hover:bg-accent hover:text-primary transition-colors inline-block"
            >
              View Game
            </a>
          </div>
        </div>

        {/* Placeholder for Hero component with Three.js starfield */}
        <div className="mt-20 text-center text-foreground/60">
          <p className="text-sm">
            🚀 Website under construction - Phase 1 foundation complete!
          </p>
          <p className="text-xs mt-2">
            Coming soon: Interactive Three.js hero, simulation gallery, game hub, and more.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
