# Gustul Casei - Development Guidelines

## 🎯 Development Philosophy

### Code Quality Principles
- **Readability**: Code should be self-documenting
- **Maintainability**: Easy to modify and extend
- **Performance**: Optimized for speed and efficiency
- **Security**: Secure by design
- **Accessibility**: Inclusive for all users

## 📝 Coding Standards

### TypeScript Guidelines

#### Type Definitions
```typescript
// ✅ Good: Explicit interfaces
interface Product {
  id: string;
  name: string;
  price: number;
  cook: {
    id: string;
    name: string;
  };
}

// ❌ Bad: Any types
const product: any = { ... };
```

#### Function Definitions
```typescript
// ✅ Good: Explicit return types
async function getProduct(id: string): Promise<Product | null> {
  // implementation
}

// ✅ Good: Arrow functions for components
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return <div>{product.name}</div>;
};
```

### React Component Guidelines

#### Component Structure
```typescript
// ✅ Good: Organized component structure
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  title: string;
  onAction: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState('');
  const router = useRouter();

  // 2. Effects
  useEffect(() => {
    // effect logic
  }, []);

  // 3. Event handlers
  const handleClick = () => {
    onAction();
  };

  // 4. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
}
```

#### Naming Conventions
```typescript
// ✅ Good: PascalCase for components
const ProductCard = () => {};

// ✅ Good: camelCase for functions and variables
const handleSubmit = () => {};
const productData = {};

// ✅ Good: UPPER_CASE for constants
const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
};
```

### API Route Guidelines

#### Route Structure
```typescript
// ✅ Good: Organized API route
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateRequest } from '@/lib/validation';

export async function GET(request: NextRequest) {
  try {
    // 1. Validate request
    const validation = await validateRequest(request);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // 2. Process request
    const data = await prisma.product.findMany({
      where: { isApproved: true },
    });

    // 3. Return response
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Error Handling
```typescript
// ✅ Good: Consistent error responses
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
  
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
};
```

## 🗂️ File Organization

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── feature/          # Feature-specific components
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API utilities
│   ├── auth.ts          # Auth configuration
│   ├── prisma.ts        # Database client
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── styles/              # Additional styles
```

### Import Order
```typescript
// 1. React and Next.js imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Third-party libraries
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 3. Internal utilities and hooks
import { useProducts } from '@/hooks/use-products';
import { formatPrice } from '@/lib/utils';

// 4. Types
import type { Product } from '@/types';
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage
```typescript
// ✅ Good: Semantic class grouping
<div className="
  flex items-center justify-between
  p-4 bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow duration-200
">
  <h2 className="text-xl font-semibold text-gray-900">
    Product Title
  </h2>
  <span className="text-lg font-bold text-orange-600">
    $25.00
  </span>
</div>

// ❌ Bad: Inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### Component Styling
```typescript
// ✅ Good: Consistent color scheme
const colors = {
  primary: 'bg-orange-500 hover:bg-orange-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
  success: 'bg-green-500 hover:bg-green-600',
  danger: 'bg-red-500 hover:bg-red-600',
};

// ✅ Good: Reusable style variants
const buttonVariants = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white',
  outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50',
  ghost: 'text-orange-500 hover:bg-orange-50',
};
```

## 🔒 Security Guidelines

### Input Validation
```typescript
// ✅ Good: Server-side validation
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  price: z.number().positive('Price must be positive'),
  description: z.string().max(500),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = productSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }
}
```

### Authentication Checks
```typescript
// ✅ Good: Consistent auth checks
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Check role-based permissions
  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
}
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// ✅ Good: Comprehensive component tests
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 25,
    image: '/test-image.jpg',
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockOnClick = jest.fn();
    render(<ProductCard product={mockProduct} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledWith(mockProduct.id);
  });
});
```

### API Testing
```typescript
// ✅ Good: API route testing
import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/products/route';

describe('/api/products', () => {
  it('returns products successfully', async () => {
    const { req } = createMocks({
      method: 'GET',
    });

    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
```

## 📝 Documentation Guidelines

### Code Comments
```typescript
// ✅ Good: JSDoc comments for functions
/**
 * Fetches a product by ID from the database
 * @param id - The product ID to fetch
 * @returns Promise<Product | null> - The product or null if not found
 */
async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { cook: true },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ✅ Good: Inline comments for complex logic
const total = items.reduce((sum, item) => {
  // Calculate total including tax (20% VAT)
  const itemTotal = item.price * item.quantity;
  const tax = itemTotal * 0.2;
  return sum + itemTotal + tax;
}, 0);
```

### README Documentation
```markdown
# Component Name

Brief description of what this component does.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | The title to display |
| onAction | function | No | Callback when action is triggered |

## Usage

```tsx
import { Component } from './Component';

<Component 
  title="My Title"
  onAction={() => console.log('Action triggered')}
/>
```

## Examples

- Basic usage
- With custom styling
- With different variants
```

## 🚀 Performance Guidelines

### Optimization Techniques
```typescript
// ✅ Good: Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return products.filter(p => p.category === selectedCategory);
}, [products, selectedCategory]);

// ✅ Good: Callback memoization
const handleClick = useCallback((id: string) => {
  router.push(`/product/${id}`);
}, [router]);

// ✅ Good: Lazy loading
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

### Image Optimization
```typescript
// ✅ Good: Next.js Image component
import Image from 'next/image';

<Image
  src={product.image}
  alt={product.name}
  width={300}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🔄 Git Workflow

### Commit Messages
```bash
# ✅ Good: Conventional commit format
feat: add product search functionality
fix: resolve order status update issue
docs: update API documentation
style: improve button hover effects
refactor: extract product card component
test: add unit tests for order API
```

### Branch Naming
```bash
# ✅ Good: Descriptive branch names
feature/user-authentication
bugfix/order-confirmation-email
hotfix/security-vulnerability
refactor/product-card-component
```

## 📊 Code Review Checklist

### Before Submitting PR
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console.log statements in production code
- [ ] Error handling is implemented
- [ ] Accessibility requirements met
- [ ] Performance considerations addressed
- [ ] Security measures implemented
- [ ] Documentation updated

### Review Process
1. **Functionality**: Does the code work as expected?
2. **Code Quality**: Is the code readable and maintainable?
3. **Performance**: Are there any performance issues?
4. **Security**: Are there any security vulnerabilities?
5. **Testing**: Are there adequate tests?
6. **Documentation**: Is the code well-documented? 