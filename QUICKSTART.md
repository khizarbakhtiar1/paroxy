# 🚀 PAROXY - Quick Start Guide

Get PAROXY running in 5 minutes!

## Step 1: Prerequisites

Make sure you have these installed:
- Node.js 18+ → [Download](https://nodejs.org/)
- PostgreSQL 14+ → [Download](https://www.postgresql.org/download/)

## Step 2: Clone & Install

```bash
# Navigate to the project
cd paroxy

# Install dependencies
npm install
```

## Step 3: Configure Environment

```bash
# Copy environment template
cp env.example .env

# Edit .env with your favorite editor
nano .env
```

**Minimum required configuration:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/paroxy"
NEXTAUTH_SECRET="any-random-string-here"
OPENAI_API_KEY="sk-your-key-from-openai"
```

## Step 4: Setup Database

```bash
# Create database
createdb paroxy

# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

## Step 5: Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000** 🎉

## First Steps in the App

1. **Sign Up** → Create your founder account
2. **Explore Dashboard** → See all 10+ modules
3. **Chat with AI** → Ask your AI Founder Twin anything
4. **Add Transaction** → Track your first income/expense
5. **Generate Document** → Create your first legal document

## Common Commands

```bash
# Start dev server
npm run dev

# View database
npm run db:studio

# Format code
npm run format

# Type check
npm run type-check

# Build for production
npm run build
```

## Getting Your API Keys

### OpenAI (Required for AI features)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys
4. Create new key
5. Add to `.env` as `OPENAI_API_KEY`

### Google OAuth (Optional)
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create project
3. Enable OAuth 2.0
4. Add credentials
5. Add to `.env`

## Troubleshooting

### "Database connection failed"
```bash
# Check if PostgreSQL is running
pg_isready

# If not, start it
# macOS:
brew services start postgresql

# Linux:
sudo systemctl start postgresql
```

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Port 3000 already in use"
```bash
# Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill

# Or use different port:
PORT=3001 npm run dev
```

## What's Included?

✅ **10+ Feature Modules**
- Legal & Compliance
- Financial Management  
- Marketing & Analytics
- Team Management
- AI Assistant Chat
- Mental Health & Wellness
- Smart Networking
- Notifications
- Settings
- And more!

✅ **AI-Powered Everything**
- Document generation
- Financial insights
- Marketing suggestions
- Business recommendations

✅ **Beautiful UI**
- Modern, responsive design
- Dark mode ready
- Mobile optimized

✅ **Developer Friendly**
- TypeScript
- Prisma ORM
- Modular architecture
- Well documented

## Need Help?

📖 **Full Documentation**
- [DEVELOPMENT.md](DEVELOPMENT.md) - Complete setup guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guide

💬 **Support**
- GitHub Issues
- Discord Community
- Email: support@paroxy.io

## Next Steps

Once you're up and running:

1. **Customize for your startup**
   - Update company info in Settings
   - Add your actual financial data
   - Configure AI context with your business details

2. **Explore all modules**
   - Generate legal documents
   - Track your finances
   - Chat with AI assistant
   - Manage your team

3. **Deploy to production**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy to Vercel in 5 minutes
   - Use Neon for database hosting

## Pro Tips 💡

- The AI gets smarter as you add more data
- Set up notifications for important deadlines
- Use the wellness tracker to prevent burnout
- Generate all your legal docs early
- Track every transaction for accurate insights

---

**Ready to build your dream?** Let's go! 🚀

*Built with ❤️ for founders, by founders.*

