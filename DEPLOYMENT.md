# Deploying Gustul Casei to Vercel

This guide will help you deploy your Next.js marketplace app to Vercel with a PostgreSQL database.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub/GitLab/Bitbucket**: Your code should be in a Git repository
3. **PostgreSQL Database**: You'll need a PostgreSQL database (we'll use Vercel Postgres)

## Step 1: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Create a new project or select existing one
3. Go to the "Storage" tab
4. Click "Create Database" → "Postgres"
5. Choose a plan (Hobby plan is free)
6. Note down the connection details

### Option B: External PostgreSQL (Railway, Supabase, etc.)

If you prefer external providers:
- **Railway**: [railway.app](https://railway.app) (free tier available)
- **Supabase**: [supabase.com](https://supabase.com) (free tier available)
- **Neon**: [neon.tech](https://neon.tech) (free tier available)

## Step 2: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? `[Your account]`
   - Link to existing project? `N`
   - Project name: `gustul-casei` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings? `N`

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Configure project settings

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to "Settings" → "Environment Variables" and add:

### Required Variables

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (for registration verification)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@your-domain.com"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Step 4: Database Migration

After deployment, you need to run database migrations:

1. Go to your Vercel project dashboard
2. Go to "Functions" → "View Function Logs"
3. The first deployment should automatically run `prisma generate`
4. You may need to manually run migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma db push --schema=./prisma/schema.prisma
```

## Step 5: Seed Database (Optional)

If you want to add sample data:

```bash
# Using Vercel CLI
vercel env pull .env.local
npm run db:seed
```

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check `DATABASE_URL` format
   - Ensure database is accessible from Vercel
   - Verify SSL settings if required

2. **Prisma Client Errors**
   - The `postinstall` script should handle this
   - Check build logs for Prisma generation errors

3. **Email Sending Issues**
   - Verify email credentials
   - Check if your email provider allows SMTP
   - Consider using services like SendGrid or Resend

4. **NextAuth Issues**
   - Ensure `NEXTAUTH_URL` matches your domain
   - Check `NEXTAUTH_SECRET` is set correctly

## Post-Deployment Checklist

- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Email service working
- [ ] Authentication working
- [ ] Admin user created
- [ ] Sample data added (optional)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review environment variable configuration
3. Verify database connectivity
4. Check NextAuth configuration
5. Review Prisma schema and migrations 