# Deployment Guide - Gustul Casei to Vercel

## 🎯 Overview
This guide will help you deploy Gustul Casei to Vercel using free resources:
- **Vercel**: Free hosting for Next.js apps
- **Neon/Supabase**: Free PostgreSQL database
- **Resend**: Free email service (100 emails/day)

## 📋 Prerequisites
- GitHub account
- Vercel account (free)
- Neon or Supabase account (free)

## 🗄️ Step 1: Database Setup

### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create a new project
4. Copy the connection string
5. Format: `postgresql://user:password@host:port/database`

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string

## 📧 Step 2: Email Service Setup

### Option A: Resend (Recommended)
1. Go to [resend.com](https://resend.com)
2. Sign up for free account (100 emails/day)
3. Verify your domain or use their test domain
4. Get your API key

### Option B: Gmail (Alternative)
1. Use Gmail SMTP with app passwords
2. Less reliable for production

## 🔧 Step 3: Environment Variables

Create a `.env.local` file with these variables:

```env
# Database
DATABASE_URL="your-neon-or-supabase-connection-string"

# NextAuth
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Email (Gmail alternative)
# EMAIL_SERVER_HOST="smtp.gmail.com"
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER="your-email@gmail.com"
# EMAIL_SERVER_PASSWORD="your-app-password"
```

## 🚀 Step 4: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables in Vercel dashboard
6. Deploy!

### Method 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## ⚙️ Step 5: Vercel Configuration

Your `vercel.json` is already configured correctly:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "PRISMA_GENERATE_DATAPROXY": "true"
  }
}
```

## 🗃️ Step 6: Database Migration

After deployment, run database migrations:

```bash
# In Vercel dashboard or locally
npx prisma db push
npx prisma generate
```

## 🔍 Step 7: Verify Deployment

1. Check your app URL: `https://your-app.vercel.app`
2. Test the homepage
3. Test product browsing
4. Test user registration
5. Test admin panel

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Prisma Client Error
```bash
# Solution: Add to package.json scripts
"postinstall": "prisma generate"
```

#### 2. Database Connection Error
- Check DATABASE_URL in Vercel environment variables
- Ensure database is accessible from Vercel

#### 3. Email Not Working
- Verify email service credentials
- Check email service limits

#### 4. Build Failures
- Check Vercel build logs
- Ensure all dependencies are in package.json

## 📊 Free Tier Limits

### Vercel Free Tier:
- 100GB bandwidth/month
- 100 serverless function executions/day
- 10GB storage
- Custom domains

### Neon Free Tier:
- 0.5GB storage
- 10GB transfer/month
- 2 projects

### Supabase Free Tier:
- 500MB database
- 2GB bandwidth/month
- 50,000 monthly active users

### Resend Free Tier:
- 100 emails/day
- 3,000 emails/month

## 🔄 Continuous Deployment

Once set up, every push to your main branch will automatically deploy to Vercel.

## 📈 Monitoring

- Use Vercel Analytics (free tier)
- Monitor function execution times
- Check database usage
- Monitor email delivery rates

## 🚨 Important Notes

1. **Environment Variables**: Never commit `.env` files to Git
2. **Database Backups**: Set up regular backups
3. **Monitoring**: Keep an eye on usage limits
4. **Security**: Use strong secrets and HTTPS
5. **Performance**: Optimize images and bundle size

## 🎉 Success!

Your Gustul Casei marketplace is now live on Vercel with free resources! 