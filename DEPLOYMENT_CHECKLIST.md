# 🚀 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Database Setup
- [ ] Sign up for Neon (neon.tech) or Supabase (supabase.com)
- [ ] Create a new PostgreSQL project
- [ ] Copy the connection string
- [ ] Test database connection locally

### 2. Email Service Setup
- [ ] Sign up for Resend (resend.com) - 100 emails/day free
- [ ] Get API key
- [ ] Verify domain or use test domain
- [ ] Test email sending locally

### 3. Environment Variables
- [ ] Create `.env.local` file
- [ ] Add DATABASE_URL
- [ ] Add NEXTAUTH_URL (will be your Vercel app URL)
- [ ] Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- [ ] Add RESEND_API_KEY
- [ ] Add EMAIL_FROM

### 4. Code Preparation
- [ ] Ensure all code is committed to Git
- [ ] Test build locally: `npm run build`
- [ ] Check that `vercel.json` is configured
- [ ] Verify `package.json` has `postinstall` script

## 🚀 Deployment Steps

### 1. GitHub Setup (Recommended)
- [ ] Push code to GitHub repository
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure environment variables in Vercel dashboard
- [ ] Deploy!

### 2. Vercel CLI (Alternative)
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Login: `vercel login`
- [ ] Deploy: `vercel --prod`

## 🔧 Post-Deployment Setup

### 1. Database Migration
- [ ] Run database migration in Vercel dashboard
- [ ] Or run locally: `npx prisma db push`
- [ ] Verify tables are created

### 2. Environment Variables in Vercel
- [ ] Go to Vercel dashboard > Settings > Environment Variables
- [ ] Add all variables from your `.env.local`
- [ ] Redeploy if needed

### 3. Testing
- [ ] Test homepage loads
- [ ] Test product browsing
- [ ] Test user registration
- [ ] Test email verification
- [ ] Test admin panel
- [ ] Test order placement

## 🛠️ Troubleshooting

### Common Issues:
- [ ] **Prisma Client Error**: Check `postinstall` script in package.json
- [ ] **Database Connection**: Verify DATABASE_URL in Vercel
- [ ] **Email Not Working**: Check RESEND_API_KEY and limits
- [ ] **Build Failures**: Check Vercel build logs
- [ ] **Environment Variables**: Ensure all are set in Vercel dashboard

## 📊 Free Tier Monitoring

### Vercel Limits:
- [ ] 100GB bandwidth/month
- [ ] 100 serverless function executions/day
- [ ] 10GB storage

### Database Limits:
- [ ] Neon: 0.5GB storage, 10GB transfer/month
- [ ] Supabase: 500MB database, 2GB bandwidth/month

### Email Limits:
- [ ] Resend: 100 emails/day, 3,000 emails/month

## 🎯 Success Criteria

Your deployment is successful when:
- [ ] App loads without errors
- [ ] Database operations work
- [ ] Email verification works
- [ ] Admin panel is accessible
- [ ] Orders can be placed
- [ ] All features function as expected

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables
4. Test database connection
5. Check email service status

## 🎉 Congratulations!

Once all checkboxes are marked, your Gustul Casei marketplace is live on Vercel! 