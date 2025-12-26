import { PageWrapper } from "@/components/layout/PageWrapper";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Prototype & Development Page",
  description: "Testing and optimization workspace for elliottelford.com",
};

export default function PrototypePage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge text="PROTOTYPE" variant="secondary" className="mb-4" />
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-4">
            Development & Testing Lab
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            This page is used for testing new components, features, and optimizations
            before they go live on the main site.
          </p>
        </div>

        {/* Component Testing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* UI Components Test */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">UI Components</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-foreground/70 mb-2">Buttons:</p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground/70 mb-2">Badges:</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge text="Default" variant="default" />
                  <Badge text="Accent" variant="accent" />
                  <Badge text="Secondary" variant="secondary" />
                </div>
              </div>
            </div>
          </Card>

          {/* Color Palette Test */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Color Palette</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary border border-accent rounded"></div>
                <span className="text-sm">Primary (#0a192f)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded"></div>
                <span className="text-sm">Accent (#64ffda)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded"></div>
                <span className="text-sm">Secondary (#a78bfa)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-card-bg border border-card-border rounded"></div>
                <span className="text-sm">Card BG (#112240)</span>
              </div>
            </div>
          </Card>

          {/* Typography Test */}
          <Card>
            <h3 className="text-xl font-bold text-accent mb-4">Typography</h3>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Heading 1</h1>
              <h2 className="text-2xl font-bold">Heading 2</h2>
              <h3 className="text-xl font-bold">Heading 3</h3>
              <p className="text-base">Body text - Regular paragraph</p>
              <p className="text-sm text-foreground/70">Small text - Muted</p>
              <code className="text-sm bg-card-bg px-2 py-1 rounded">Code text</code>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="mb-16">
          <h3 className="text-2xl font-bold text-accent mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">-</div>
              <p className="text-sm text-foreground/70">Lighthouse Score</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">-</div>
              <p className="text-sm text-foreground/70">Build Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">-</div>
              <p className="text-sm text-foreground/70">Bundle Size</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">-</div>
              <p className="text-sm text-foreground/70">TTI (Time to Interactive)</p>
            </div>
          </div>
          <p className="text-xs text-foreground/50 mt-4 text-center">
            Run performance tests to populate metrics
          </p>
        </Card>

        {/* Test Scenarios */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-accent mb-6 text-center">
            Test Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h4 className="text-lg font-bold mb-2">Responsive Design</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>✓ Mobile (320px - 640px)</li>
                <li>✓ Tablet (641px - 1024px)</li>
                <li>✓ Desktop (1025px+)</li>
                <li>✓ Ultra-wide (1920px+)</li>
              </ul>
            </Card>

            <Card>
              <h4 className="text-lg font-bold mb-2">Browser Testing</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Chrome/Edge (Chromium)</li>
                <li>• Firefox</li>
                <li>• Safari (macOS/iOS)</li>
                <li>• Mobile browsers</li>
              </ul>
            </Card>

            <Card>
              <h4 className="text-lg font-bold mb-2">Accessibility</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• WCAG 2.1 Level AA compliance</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader testing</li>
                <li>• Color contrast ratios</li>
              </ul>
            </Card>

            <Card>
              <h4 className="text-lg font-bold mb-2">Performance</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Core Web Vitals</li>
                <li>• Image optimization</li>
                <li>• Code splitting</li>
                <li>• Lazy loading</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Environment Info */}
        <Card className="bg-card-bg/50">
          <h3 className="text-xl font-bold text-accent mb-4">Environment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-foreground/70">Environment:</span>
              <span className="ml-2 text-accent font-mono">
                {process.env.NEXT_PUBLIC_ENVIRONMENT || 'development'}
              </span>
            </div>
            <div>
              <span className="text-foreground/70">Preview Mode:</span>
              <span className="ml-2 text-accent font-mono">
                {process.env.NEXT_PUBLIC_PREVIEW_MODE || 'false'}
              </span>
            </div>
            <div>
              <span className="text-foreground/70">Site URL:</span>
              <span className="ml-2 text-accent font-mono break-all">
                {process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'}
              </span>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-accent mb-6">Quick Navigation</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/" variant="primary">Home</Button>
            <Button href="/simulations" variant="secondary">Simulations</Button>
            <Button href="/game" variant="secondary">Game Hub</Button>
            <Button href="/blog" variant="secondary">Blog</Button>
            <Button href="/about" variant="secondary">About</Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
