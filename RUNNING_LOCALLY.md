# 🎯 PAROXY - Running Locally

## Quick Setup (3 Options)

### ✅ Option 1: Free Cloud Database (Recommended - Easiest)

**Use Neon (Free PostgreSQL in the cloud)**

1. Go to https://neon.tech
2. Sign up (it's free!)
3. Create a new project called "paroxy"
4. Copy the connection string
5. Update `.env` file with the connection string:
   ```bash
   DATABASE_URL="postgresql://user:pass@xxx.neon.tech/paroxy?sslmode=require"
   ```
6. Run setup:
   ```bash
   npx prisma db push
   npx prisma generate
   npm run dev
   ```

### Option 2: Install PostgreSQL Locally

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb paroxy
```

**macOS:**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb paroxy
```

Then update `.env`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/paroxy"
```

### Option 3: Docker (If you have Docker installed)

```bash
docker run --name paroxy-db -e POSTGRES_PASSWORD=paroxy -e POSTGRES_DB=paroxy -p 5432:5432 -d postgres:14

# Update .env
DATABASE_URL="postgresql://postgres:paroxy@localhost:5432/paroxy"
```

---

## Complete Setup Steps

Once you have your database configured:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Push schema to database
npx prisma db push

# 3. Start development server
npm run dev
```

## Important: Add Your OpenAI API Key

The app needs an OpenAI API key for AI features:

1. Go to https://platform.openai.com/api-keys
2. Create an account or sign in
3. Click "Create new secret key"
4. Copy the key
5. Add to `.env`:
   ```
   OPENAI_API_KEY="sk-your-key-here"
   ```

## Running the App

```bash
npm run dev
```

Open: http://localhost:3000

## First Steps

1. **Sign Up** - Create your account
2. **Explore** - Check out all modules
3. **Add Data** - Add transactions, generate documents
4. **Chat with AI** - Talk to your AI Founder Twin

---

## Troubleshooting

### "Can't reach database server"
- Check your DATABASE_URL is correct
- If using cloud: Check your internet connection
- If using local: Make sure PostgreSQL is running

### "OpenAI API error"
- Add your OpenAI API key to `.env`
- Make sure you have credits in your OpenAI account

### "Port 3000 in use"
- Kill the process: `lsof -ti:3000 | xargs kill`
- Or use different port: `PORT=3001 npm run dev`

### Need to reset database?
```bash
npx prisma db push --force-reset
```

---

## Project Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run linter
npm run format       # Format code
npm run db:studio    # Open database GUI
npm run db:push      # Push schema changes
npm run type-check   # Check TypeScript
```

---

**Need help?** Check the documentation:
- QUICKSTART.md
- DEVELOPMENT.md
- DEPLOYMENT.md

