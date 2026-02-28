#!/bin/bash

# PAROXY Local Setup Script

echo "🚀 Setting up PAROXY for local development..."
echo ""

# Create .env file
cat > .env << 'EOF'
# Database - Using SQLite for local development
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="i2SFOKwgYwJWBJ4dqgAIk9IFOZmDcKCI9BoZDJXpxmU="

# OpenAI - Add your key here
OPENAI_API_KEY="sk-your-openai-api-key"

# Optional: Google OAuth (leave empty if not using)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Optional: Stripe (leave empty if not using)
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF

echo "✅ Created .env file"
echo ""

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Setting up database..."
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "⚠️  IMPORTANT: Add your OpenAI API key to .env file"
echo "   Get it from: https://platform.openai.com/api-keys"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""

