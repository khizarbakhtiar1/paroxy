# Paroxy

Paroxy is a comprehensive platform designed for founders and entrepreneurs. It centralizes essential startup operations including legal compliance, financial management, marketing, team coordination, and mental health support.

## Overview

Paroxy aims to address common startup challenges by consolidating various functions into a unified interface, assisted by context-aware AI capabilities.

## Features

- **AI Assistance**: Context-aware task suggestions and automation.
- **Legal & Compliance**: Jurisdiction-specific documentation and regulatory tracking.
- **Financial Management**: Runway tracking, bookkeeping, and tax insight generation.
- **Product Tools**: MVP building features, landing page generation, and analytics.
- **Well-being**: Support resources and burnout prevention tools.
- **Networking**: Co-founder, mentor, and investor matching.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, tRPC
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT-4, LangChain
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/yourusername/paroxy.git
cd paroxy
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
paroxy/
├── app/               # Next.js App Router
├── components/        # React components
├── lib/               # Utility functions
├── prisma/            # Database schema
├── public/            # Static assets
└── types/             # TypeScript types
```

## Testing

```bash
npm test
npm run test:e2e
npm run test:coverage
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [docs.paroxy.io](https://docs.paroxy.io)
- Contact: support@paroxy.io

## Roadmap

- [x] Project initialization
- [x] Authentication system
- [x] Dashboard UI
- [ ] Legal module
- [ ] Financial module
- [ ] AI Assistant
- [ ] Marketing module
- [ ] Team management
- [ ] Mental health features
- [ ] Networking platform
