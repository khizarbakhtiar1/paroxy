#!/bin/bash

echo "🔧 Setting up PAROXY Environment..."
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
fi

# Update .env with working values
cat > .env << 'EOF'
# Database (SQLite for local development - no PostgreSQL needed!)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="aAUeQoLviSjtR70VZe2RfoWv3/VY7B9R8Gvf9H8AV+c="

# OpenAI (Required - Get from https://platform.openai.com/api-keys)
# Replace with your actual key or leave as is to run without AI features
OPENAI_API_KEY="sk-proj-placeholder-key"

# Optional: Uncomment and configure if needed
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
EOF

echo "✅ Environment file created!"
echo ""
echo "⚠️  IMPORTANT: To use AI features, update OPENAI_API_KEY in .env"
echo "   Get your key from: https://platform.openai.com/api-keys"
echo ""

