# Gustul Casei - Technical Architecture

## 🏗️ System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Authentication│    │   Email Service │    │   File Storage  │
│   (NextAuth)    │    │   (Resend)      │    │   (Vercel)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Database Schema

### Core Entities

#### User
```sql
- id: String (CUID)
- email: String (unique)
- name: String
- password: String (hashed)
- phone: String?
- address: String?
- city: String?
- avatar: String?
- isCook: Boolean (default: false)
- isAdmin: Boolean (default: false)
- isVerified: Boolean (default: false)
- emailVerified: DateTime?
- rating: Float (default: 0)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Product
```sql
- id: String (CUID)
- name: String
- description: String
- price: Float
- currency: String (default: "MDL")
- image: String
- category: String
- isAvailable: Boolean (default: true)
- isApproved: Boolean (default: false)
- cookId: String (FK to User)
- createdAt: DateTime
- updatedAt: DateTime
```

#### Order
```sql
- id: String (CUID)
- customerId: String (FK to User)
- cookId: String (FK to User)
- status: OrderStatus (PENDING, CONFIRMED, PREPARING, READY, DELIVERED, CANCELLED)
- total: Float
- currency: String (default: "MDL")
- address: String
- phone: String
- notes: String?
- createdAt: DateTime
- updatedAt: DateTime
```

#### OrderItem
```sql
- id: String (CUID)
- orderId: String (FK to Order)
- productId: String (FK to Product)
- quantity: Int
- price: Float
```

#### Review
```sql
- id: String (CUID)
- rating: Int (1-5)
- comment: String?
- customerId: String (FK to User)
- cookId: String (FK to User)
- productId: String? (FK to Product)
- createdAt: DateTime
```

## 🔐 Authentication & Authorization

### NextAuth.js Configuration
```typescript
// Authentication providers
- Credentials (email/password)
- Email verification workflow
- Session management
- Role-based access control

// User roles
- CUSTOMER: Can browse, order, review
- COOK: Can create products, manage orders
- ADMIN: Full platform access
```

### Authorization Flow
1. **Public Routes**: Homepage, product browsing, guest orders
2. **Customer Routes**: Order history, profile management
3. **Cook Routes**: Product management, order dashboard
4. **Admin Routes**: User management, product approval, analytics

## 🛣️ API Routes Structure

### Authentication Routes
```
/api/auth/[...nextauth] - NextAuth configuration
/api/auth/register - User registration
/api/auth/verify - Email verification
```

### Product Routes
```
/api/products - GET (list), POST (create)
/api/products/[id] - GET (details), PUT (update), DELETE
/api/products/pending - GET (admin: pending products)
/api/products/approve - POST (admin: approve product)
```

### Order Routes
```
/api/orders - GET (list), POST (create)
/api/orders/[id] - GET (details), PUT (update status)
```

### Admin Routes
```
/api/admin/stats - GET (platform statistics)
/api/admin/users - GET (user management)
/api/admin/orders - GET (order monitoring)
```

## 🎨 Frontend Architecture

### Component Structure
```
components/
├── ui/                    # shadcn/ui components
├── layout/               # Layout components
│   ├── navbar.tsx
│   └── navbar-skeleton.tsx
├── product/              # Product-related components
│   ├── product-card.tsx
│   └── product-grid.tsx
├── explore/              # Explore page components
│   ├── category-group.tsx
│   ├── explore-filters.tsx
│   └── product-grid-by-category.tsx
└── product-card-skeleton.tsx
```

### Page Structure
```
app/
├── page.tsx              # Homepage
├── explore/              # Product browsing
├── product/[id]/         # Product details
├── order/[id]/           # Order placement
├── order-success/        # Order confirmation
├── auth/                 # Authentication pages
│   ├── signin/
│   ├── signup/
│   └── verify/
├── admin/                # Admin dashboard
│   ├── page.tsx
│   ├── products/
│   ├── orders/
│   └── users/
└── api/                  # API routes
```

## 🔄 State Management

### Zustand Store
```typescript
interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // UI state
  isLoading: boolean
  notifications: Notification[]
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Notification) => void
}
```

### React Query
```typescript
// Product queries
useProducts() - Fetch all products
useProduct(id) - Fetch single product
usePendingProducts() - Admin: fetch pending products

// Order queries
useOrders() - Fetch user orders
useOrder(id) - Fetch single order

// User queries
useUsers() - Admin: fetch all users
useUser(id) - Fetch user details
```

## 📧 Email Service Integration

### Resend Configuration
```typescript
// Email templates
- Welcome email (registration)
- Email verification
- Order confirmation
- Order status updates
- Password reset
```

### Email Workflows
1. **Registration**: Welcome email + verification link
2. **Order Confirmation**: Order details to customer
3. **Order Updates**: Status changes to customer
4. **Product Approval**: Notification to cook

## 🗂️ File Management

### Image Upload
```typescript
// Product images
- Upload to Vercel Blob Storage
- Image optimization
- Multiple formats (WebP, JPEG)
- Responsive sizes
```

### File Structure
```
public/
├── images/
│   ├── products/         # Product images
│   ├── avatars/          # User avatars
│   └── placeholders/     # Default images
```

## 🔧 Development Tools

### Code Quality
```json
{
  "eslint": "Next.js + TypeScript rules",
  "prettier": "Code formatting",
  "husky": "Git hooks",
  "lint-staged": "Pre-commit linting"
}
```

### Testing Strategy
```typescript
// Unit tests
- Component testing (React Testing Library)
- API route testing (Jest)
- Utility function testing

// Integration tests
- Database operations
- Authentication flows
- Order workflows

// E2E tests
- User journeys (Playwright)
- Cross-browser testing
- Mobile responsiveness
```

## 🚀 Deployment Architecture

### Vercel Deployment
```yaml
# vercel.json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Environment Variables
```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Email
RESEND_API_KEY=...

# Storage
BLOB_READ_WRITE_TOKEN=...
```

## 📊 Performance Optimization

### Frontend
- **Code Splitting**: Dynamic imports for routes
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Intersection Observer API
- **Caching**: React Query caching strategies

### Backend
- **Database Indexing**: Optimized queries
- **API Caching**: Response caching
- **Rate Limiting**: API protection
- **Connection Pooling**: Database efficiency

## 🔒 Security Measures

### Data Protection
- **Input Validation**: Zod schemas
- **SQL Injection**: Prisma ORM protection
- **XSS Prevention**: Content Security Policy
- **CSRF Protection**: NextAuth.js built-in

### Authentication Security
- **Password Hashing**: bcrypt
- **JWT Tokens**: Secure session management
- **Rate Limiting**: Login attempt protection
- **Email Verification**: Account security

## 📈 Monitoring & Analytics

### Error Tracking
- **Error Boundaries**: React error handling
- **API Monitoring**: Response time tracking
- **Database Monitoring**: Query performance
- **User Analytics**: Behavior tracking

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS
- **API Response Times**: Average < 500ms
- **Database Query Times**: Optimized queries
- **Uptime Monitoring**: 99.9% availability 