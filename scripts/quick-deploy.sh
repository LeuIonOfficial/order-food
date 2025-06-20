#!/bin/bash

# Quick Deploy Script for Gustul Casei
# This script provides step-by-step deployment instructions

echo "🚀 Gustul Casei - Quick Deploy to Vercel"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Step 1: Database Setup${NC}"
echo "1. Go to https://neon.tech and sign up (free)"
echo "2. Create a new project"
echo "3. Copy the connection string"
echo ""

echo -e "${BLUE}Step 2: Email Service Setup${NC}"
echo "1. Go to https://resend.com and sign up (free - 100 emails/day)"
echo "2. Get your API key"
echo "3. Use their test domain or verify your own"
echo ""

echo -e "${BLUE}Step 3: Environment Variables${NC}"
echo "Create a .env.local file with:"
echo ""
echo "DATABASE_URL=\"your-neon-connection-string\""
echo "NEXTAUTH_URL=\"https://your-app-name.vercel.app\""
echo "NEXTAUTH_SECRET=\"p7gLU2nbdNUVQwUaFj4bwxsTxNEf68u9rn6DGZh5O8A=\""
echo "RESEND_API_KEY=\"your-resend-api-key\""
echo "EMAIL_FROM=\"noreply@yourdomain.com\""
echo ""

echo -e "${BLUE}Step 4: Deploy to Vercel${NC}"
echo "1. Push your code to GitHub"
echo "2. Go to https://vercel.com"
echo "3. Click 'New Project'"
echo "4. Import your GitHub repository"
echo "5. Add environment variables in Vercel dashboard"
echo "6. Deploy!"
echo ""

echo -e "${BLUE}Step 5: Post-Deployment${NC}"
echo "1. Run database migration in Vercel dashboard"
echo "2. Test your app"
echo "3. Set up admin user"
echo ""

echo -e "${YELLOW}Generated NEXTAUTH_SECRET:${NC}"
echo "p7gLU2nbdNUVQwUaFj4bwxsTxNEf68u9rn6DGZh5O8A="
echo ""

echo -e "${GREEN}For detailed instructions, see:${NC}"
echo "- docs/DEPLOYMENT_GUIDE.md"
echo "- DEPLOYMENT_CHECKLIST.md"
echo ""

echo -e "${GREEN}Ready to deploy? Run:${NC}"
echo "npm run build  # Test build locally"
echo "./scripts/deploy-vercel.sh  # Use deployment script"
echo "" 