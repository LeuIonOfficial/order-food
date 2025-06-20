# Gustul Casei - Documentation Hub

Welcome to the comprehensive documentation for **Gustul Casei**, a Next.js-based marketplace platform connecting home cooks with customers in Moldova.

## 📚 Documentation Index

### 🎯 Project Overview
- **[Project Overview](./PROJECT_OVERVIEW.md)** - Vision, mission, and high-level architecture
- **[MVP Requirements](./MVP_REQUIREMENTS.md)** - User stories, acceptance criteria, and technical requirements
- **[Technical Architecture](./TECHNICAL_ARCHITECTURE.md)** - System design, database schema, and implementation details

### 🛠️ Development
- **[Development Guidelines](./DEVELOPMENT_GUIDELINES.md)** - Coding standards, best practices, and workflow
- **[API Reference](./API_REFERENCE.md)** - Complete API documentation with examples

### 🚀 Quick Start

#### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

#### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/gustul-casei.git
cd gustul-casei

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database and API keys

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

#### Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gustul_casei"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

## 🏗️ Project Structure

```
gustul-casei/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── explore/           # Product browsing
│   ├── product/           # Product details
│   ├── order/             # Order placement
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   └── explore/          # Explore components
├── lib/                  # Utilities and configs
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth configuration
│   ├── api.ts            # API utilities
│   └── utils.ts          # Helper functions
├── prisma/               # Database schema and migrations
├── docs/                 # Documentation
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) - Warm, appetizing
- **Success**: Green (#22c55e) - Positive actions
- **Warning**: Yellow (#eab308) - Cautions
- **Error**: Red (#ef4444) - Errors and deletions
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter, bold weights
- **Body**: Inter, regular weight
- **Code**: JetBrains Mono

### Components
Built with [shadcn/ui](https://ui.shadcn.com/) for consistency and accessibility.

## 🔐 Authentication & Authorization

### User Roles
1. **Customer** - Browse products, place orders, leave reviews
2. **Cook** - Create products, manage orders, view analytics
3. **Admin** - Platform management, user moderation, content approval

### Authentication Flow
1. User registers with email/password
2. Email verification required
3. Role assignment during registration
4. Session-based authentication with NextAuth.js

## 🍽️ Core Features

### Product Management
- **Product Creation**: Cooks can add products with images and descriptions
- **Approval Workflow**: Admin approval required before products go live
- **Category Organization**: Products organized by food categories
- **Search & Filtering**: Advanced product discovery

### Order System
- **Guest Orders**: Customers can order without creating accounts
- **Order Tracking**: Real-time status updates
- **Order Management**: Cooks can manage incoming orders
- **Status Flow**: PENDING → CONFIRMED → PREPARING → READY → DELIVERED

### Admin Dashboard
- **User Management**: View and manage platform users
- **Product Approval**: Review and approve new products
- **Order Monitoring**: Track all platform orders
- **Analytics**: Platform statistics and insights

## 🧪 Testing

### Test Structure
```bash
npm run test          # Run all tests
npm run test:unit     # Unit tests only
npm run test:e2e      # End-to-end tests
npm run test:coverage # Test coverage report
```

### Testing Strategy
- **Unit Tests**: Components, utilities, API routes
- **Integration Tests**: Database operations, authentication flows
- **E2E Tests**: Complete user journeys with Playwright

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Environment Setup
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Seed initial data
5. Deploy application

## 📊 Monitoring & Analytics

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **API Response Times**: Average < 500ms
- **Database Performance**: Optimized queries
- **Uptime**: 99.9% availability target

### Error Tracking
- **Error Boundaries**: React error handling
- **API Monitoring**: Response time tracking
- **Database Monitoring**: Query performance
- **User Analytics**: Behavior tracking

## 🔒 Security

### Security Measures
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Protection**: Prisma ORM
- **XSS Prevention**: Content Security Policy
- **CSRF Protection**: NextAuth.js built-in
- **Rate Limiting**: API protection
- **Data Encryption**: Sensitive data encryption

### Compliance
- **GDPR**: EU data protection compliance
- **Privacy Policy**: User data handling
- **Terms of Service**: Platform usage terms

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding standards and guidelines
4. Write tests for new functionality
5. Submit pull request with detailed description

### Code Review Process
1. **Functionality**: Does the code work as expected?
2. **Code Quality**: Is the code readable and maintainable?
3. **Performance**: Are there any performance issues?
4. **Security**: Are there any security vulnerabilities?
5. **Testing**: Are there adequate tests?
6. **Documentation**: Is the code well-documented?

## 📞 Support

### Getting Help
- **Documentation**: Check the docs folder for detailed guides
- **Issues**: Report bugs and feature requests on GitHub
- **Discussions**: Join community discussions
- **Email**: support@gustul-casei.md

### Community
- **GitHub**: [gustul-casei](https://github.com/your-username/gustul-casei)
- **Discord**: Join our community server
- **Blog**: Technical articles and updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Deployment platform
- **Prisma** - Database toolkit
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework

---

**Gustul Casei** - Connecting home cooks with food lovers in Moldova 🍽️ 