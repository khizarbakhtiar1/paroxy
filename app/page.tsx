import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">PAROXY</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            The Ultimate Operating System for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solo Founders
            </span>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            From legal compliance to financial management, marketing to mental
            health—all in one AI-powered platform. Your Founder Twin handles
            everything so you can focus on building.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700"
            >
              Start Building Now
            </Link>
            <Link
              href="#features"
              className="rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-600">10+</div>
            <div className="mt-2 text-gray-600">Integrated Modules</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-purple-600">24/7</div>
            <div className="mt-2 text-gray-600">AI Assistant</div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-600">100%</div>
            <div className="mt-2 text-gray-600">Founder Focused</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Everything You Need in One Place
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Build Your Dream?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Join thousands of founders who are building smarter, not harder.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 hover:bg-gray-100"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 PAROXY. Built with ❤️ for founders, by founders.</p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "⚖️",
    title: "Legal & Compliance",
    description:
      "Auto-generate legal docs, track compliance, and resolve disputes with AI.",
  },
  {
    icon: "💰",
    title: "Financial Intelligence",
    description:
      "Real-time cash flow, automated bookkeeping, and fundraising insights.",
  },
  {
    icon: "📈",
    title: "Marketing & Growth",
    description:
      "Customer acquisition, analytics, and growth strategies powered by AI.",
  },
  {
    icon: "👥",
    title: "Team Management",
    description:
      "Find co-founders, manage equity, and build your dream team.",
  },
  {
    icon: "🤖",
    title: "AI Founder Twin",
    description:
      "Your digital twin that learns your business and automates tasks.",
  },
  {
    icon: "🧠",
    title: "Mental Health",
    description:
      "AI therapist, burnout prevention, and founder well-being support.",
  },
  {
    icon: "🚀",
    title: "Product Builder",
    description:
      "Build MVPs, landing pages, and deploy with integrated no-code tools.",
  },
  {
    icon: "🤝",
    title: "Smart Networking",
    description:
      "Match with investors, mentors, and peers based on your needs.",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description:
      "Track everything that matters with beautiful, actionable dashboards.",
  },
];

