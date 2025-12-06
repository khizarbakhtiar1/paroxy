# PAROXY Deployment Guide

This guide covers deploying PAROXY to production.

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations run successfully
- [ ] OpenAI API key is valid and has credits
- [ ] Authentication secrets are secure
- [ ] Google OAuth configured (if using)
- [ ] Stripe configured (if using payments)
- [ ] All tests passing
- [ ] No console errors in development

## Recommended Hosting Stack

### Application Hosting: Vercel
- **Why:** Best Next.js integration, automatic deployments, edge functions
- **Cost:** Free tier available, scales with usage
- **Setup time:** 5 minutes

### Database: Neon or Supabase
- **Why:** Serverless PostgreSQL, generous free tier, auto-scaling
- **Cost:** Free tier: 0.5GB storage, then pay-as-you-go
- **Setup time:** 10 minutes

### File Storage: Vercel Blob or S3
- **Why:** CDN integration, easy to use
- **Cost:** Pay per GB
- **Setup time:** 5 minutes

## Deployment Steps

### 1. Database Setup (Neon)

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Create a database named `paroxy`
4. Copy the connection string
5. Add to environment variables as `DATABASE_URL`

**Example:**
```
DATABASE_URL="postgresql://user:pass@host.neon.tech/paroxy?sslmode=require"
```

### 2. Environment Variables

Create a `.env.production` or configure in Vercel dashboard:

```env
# Required
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
OPENAI_API_KEY="sk-your-openai-key"

# Optional
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### 3. Deploy to Vercel

#### Option A: GitHub Integration (Recommended)

1. Push code to GitHub:
```bash
git remote add origin https://github.com/yourusername/paroxy.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

#### Option B: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### 4. Run Database Migrations

After deployment, run migrations on production database:

```bash
# Set DATABASE_URL to production
export DATABASE_URL="your-production-db-url"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

Or use Vercel build command:
```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### 5. Configure Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXTAUTH_URL` to your custom domain

### 6. Set up Monitoring

#### Vercel Analytics
- Enable in Vercel dashboard (free)
- Tracks performance and user metrics

#### Error Tracking (Recommended: Sentry)
1. Create account at [sentry.io](https://sentry.io)
2. Install Sentry:
```bash
npm install @sentry/nextjs
```
3. Configure Sentry:
```bash
npx @sentry/wizard@latest -i nextjs
```

### 7. Performance Optimization

#### Enable Edge Functions
Update `middleware.ts` to run on edge:
```ts
export const config = {
  runtime: 'edge',
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

#### Image Optimization
Images are automatically optimized by Next.js. Ensure proper `next/image` usage.

#### API Response Caching
Add caching headers to API routes:
```ts
return NextResponse.json(data, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
  }
});
```

## Post-Deployment

### 1. Smoke Testing
- [ ] Test sign up flow
- [ ] Test sign in flow
- [ ] Create a test transaction
- [ ] Generate a legal document
- [ ] Chat with AI assistant
- [ ] Navigate all modules
- [ ] Test on mobile devices

### 2. Security Checklist
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React handles this)

### 3. Backup Strategy

#### Database Backups
Neon provides automatic backups. Configure additional backups:
- Daily automated backups
- Point-in-time recovery
- Download backups monthly

### 4. Monitoring Setup

Monitor these metrics:
- **Uptime:** Use UptimeRobot or Vercel monitoring
- **Error rate:** Sentry or Vercel logs
- **API latency:** Vercel Analytics
- **Database performance:** Neon dashboard
- **OpenAI API usage:** OpenAI dashboard

## Scaling Considerations

### Application Scaling
Vercel automatically scales based on traffic. No manual intervention needed.

### Database Scaling
Neon auto-scales. For high traffic:
1. Enable connection pooling
2. Use Prisma connection pool:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  pool_timeout = 20
  connection_limit = 10
}
```

### Cost Optimization
- Use Vercel's Edge Middleware for routing
- Cache API responses where possible
- Optimize OpenAI API calls (use caching)
- Use database indexes for common queries

## Troubleshooting

### Build Failures
```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Database Connection Issues
```bash
# Test connection
npx prisma db pull

# Reset and remigrate
npx prisma migrate reset
npx prisma migrate deploy
```

### Environment Variable Issues
- Double-check all required variables are set
- Ensure no trailing spaces in values
- Redeploy after changing variables

## Continuous Deployment

Vercel automatically deploys:
- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

Configure branch protection:
1. Require PR reviews
2. Require passing checks
3. Require up-to-date branches

## Rollback Procedure

If deployment fails:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find last working deployment
4. Click "..." → "Promote to Production"

## Support

For deployment issues:
- Check Vercel status: [vercel-status.com](https://vercel-status.com)
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Open an issue on GitHub

---

**Congratulations!** 🎉 Your PAROXY instance is now live and ready to help founders succeed!

