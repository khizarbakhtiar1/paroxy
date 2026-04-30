import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
              P
            </div>
            <span className="font-bold tracking-tight">Paroxy</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Button asChild size="sm" className="h-8">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
            Paroxy 1.0 is now live
          </div>
          
          <h1 className="max-w-[800px] text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Startup operations,
            <br />
            <span className="text-muted-foreground">simplified.</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-[600px] text-base text-muted-foreground md:text-lg">
            An all-in-one legal, financial, and compliance operating system designed 
            exclusively for fast-moving founders. 
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8">
              <Link href="/dashboard">View demo</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-24 border-t">
          <div className="grid gap-12 md:grid-cols-3 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Legal & Compliance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Generate NDAs, founder agreements, and track your cap table with AI-powered diligence.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Financial Pulse</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Real-time runway calculations, burn rate analysis, and automated bookkeeping.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Founder Hub</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Access mental health resources, network with investors, and manage team payroll in one place.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Paroxy Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
