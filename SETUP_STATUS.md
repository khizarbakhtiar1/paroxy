# Quick Setup Guide for PAROXY

## Current Status: Dependencies Installed 

The project dependencies are installed! Here's what you need to do next:

## Option 1: Quick Start (Without Database - Limited Features)

You can start the dev server now, but some features won't work without a database:

```bash
npm run dev
```

Then open: http://localhost:3000

## Option 2: Full Setup (Recommended)

### Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Create Database:**
```bash
# Switch to postgres user
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE paroxy;
CREATE USER paroxyuser WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE paroxy TO paroxyuser;
\q
```

**Update .env file:**
Edit `.env` and update:
```env
DATABASE_URL="postgresql://paroxyuser:yourpassword@localhost:5432/paroxy?schema=public"
```

**Run Migrations:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Get OpenAI API Key (Required for AI Features)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Update `.env`:
```env
OPENAI_API_KEY="sk-your-actual-key-here"
```

### Start the Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

## What Works Now?

 **Landing Page** - Beautiful homepage
 **Sign Up/Sign In UI** - Authentication pages
 **All Frontend Pages** - Dashboard, modules, etc.

 **Database Operations** - Needs PostgreSQL
 **AI Features** - Needs OpenAI API key

## Troubleshooting

### "Port 3000 already in use"
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill

# Or use a different port
PORT=3001 npm run dev
```

### "Cannot connect to database"
- Make sure PostgreSQL is running: `sudo systemctl status postgresql`
- Check your DATABASE_URL in `.env`
- Verify database exists: `psql -U postgres -l`

### "OpenAI API Error"
- Get a valid API key from https://platform.openai.com
- Make sure you have credits in your OpenAI account
- Update OPENAI_API_KEY in `.env`

## Features You Can Explore

Even without full setup, you can see:
- Landing page
- Sign up/Sign in pages
- Dashboard UI (will need database for data)
- All module pages (static content)

## Need Help?

- Check DEVELOPMENT.md for detailed setup
- Check DEPLOYMENT.md for production deployment
- Open an issue on GitHub

---

**Ready to build?** Start with Option 1 to see the UI, then do Option 2 for full functionality! 

