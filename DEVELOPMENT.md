# PAROXY Development Guide

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** or **pnpm**

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd paroxy
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:
```bash
cp env.example .env
```

Edit `.env` and configure the following:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/paroxy?schema=public"

# NextAuth - Generate a secure random string
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"  # Generate with: openssl rand -base64 32

# OpenAI - Get your API key from https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. **Set up the database**

Create a PostgreSQL database:
```bash
createdb paroxy
```

Run Prisma migrations:
```bash
npx prisma migrate dev
```

Generate Prisma Client:
```bash
npx prisma generate
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Database Management

**View database in Prisma Studio:**
```bash
npm run db:studio
```

**Create a new migration:**
```bash
npx prisma migrate dev --name your_migration_name
```

**Reset database (WARNING: Deletes all data):**
```bash
npx prisma migrate reset
```

### Code Quality

**Run linter:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

**Type checking:**
```bash
npm run type-check
```

## Project Structure

```
paroxy/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth-related pages (signin, signup)
│   ├── dashboard/           # Dashboard pages
│   │   ├── legal/          # Legal & Compliance module
│   │   ├── financial/      # Financial Management module
│   │   ├── marketing/      # Marketing & Analytics module
│   │   ├── team/           # Team Management module
│   │   ├── ai/             # AI Assistant Chat
│   │   ├── wellness/       # Mental Health & Wellness
│   │   ├── network/        # Networking module
│   │   ├── notifications/  # Notifications
│   │   └── settings/       # Settings
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── ai/             # AI-related endpoints
│   │   ├── legal/          # Legal module endpoints
│   │   └── financial/      # Financial module endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── modules/            # Feature-specific components
│   └── shared/             # Shared components
├── lib/                     # Utility libraries
│   ├── ai/                 # AI/OpenAI utilities
│   ├── db/                 # Database utilities
│   └── auth.ts             # NextAuth configuration
├── prisma/                  # Prisma schema and migrations
│   └── schema.prisma       # Database schema
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Features Overview

### 1. Authentication
- Email/password authentication
- Google OAuth integration
- Session management with NextAuth.js
- Protected routes with middleware

### 2. Legal & Compliance Module
- AI-powered document generation
- Document templates (NDA, contracts, etc.)
- Compliance task tracking
- Jurisdiction-specific documents

### 3. Financial Management
- Transaction tracking (income, expenses, investments)
- Cash flow analysis
- Runway calculations
- Financial insights with AI

### 4. AI Founder Twin
- Context-aware AI assistant
- Personalized business insights
- Cross-domain recommendations
- Natural language chat interface

### 5. Marketing & Analytics
- Campaign tracking
- Performance metrics
- Growth analytics
- AI-powered marketing suggestions

### 6. Team Management
- Co-founder invitations
- Equity distribution tracking
- Team member management
- Role-based access (future)

### 7. Mental Health & Wellness
- Mood tracking
- Stress level monitoring
- Wellness goals
- Burnout prevention insights

### 8. Smart Networking
- AI-powered connection matching
- Investor/mentor recommendations
- Network quality scoring
- Connection management

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Configure environment variables in Vercel dashboard
4. Deploy!

### Database Hosting

**Recommended Options:**
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with extras
- [Railway](https://railway.app) - Easy PostgreSQL hosting

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- `DATABASE_URL` - Production database connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Secure random string
- `OPENAI_API_KEY` - Your OpenAI API key
- Other optional keys (Stripe, Google OAuth, etc.)

## Troubleshooting

### Common Issues

**1. Database connection error**
- Ensure PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Verify database exists: `psql -l`

**2. Prisma Client errors**
- Regenerate client: `npx prisma generate`
- Reset database: `npx prisma migrate reset`

**3. Build errors**
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**4. TypeScript errors**
- Run type check: `npm run type-check`
- Ensure all dependencies are installed

## Contributing

This is a solo/small team project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL + Prisma ORM
- **Authentication:** NextAuth.js v5
- **AI:** OpenAI GPT-4
- **Deployment:** Vercel (recommended)
- **State Management:** React Server Components + Client Components

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues or questions:
- Open an issue on GitHub
- Email: support@paroxy.io
- Discord: [Join our community](https://discord.gg/paroxy)

---

Built with ❤️ for founders, by founders.

