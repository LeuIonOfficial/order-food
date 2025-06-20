# Gustul Casei - API Reference

## 🔗 Base URL
```
Production: https://gustul-casei.vercel.app
Development: http://localhost:3000
```

## 🔐 Authentication

### Authentication Headers
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification."
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Validation error
- `409` - Email already exists
- `500` - Server error

#### POST /api/auth/verify
Verify email address with token.

**Request Body:**
```json
{
  "token": "verification_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Status Codes:**
- `200` - Verification successful
- `400` - Invalid token
- `404` - Token not found
- `500` - Server error

## 🍽️ Product Endpoints

### GET /api/products
Get all approved products with optional filtering.

**Query Parameters:**
- `category` (optional) - Filter by category
- `search` (optional) - Search in product names
- `page` (optional) - Page number for pagination
- `limit` (optional) - Items per page (default: 20)

**Response:**
```json
{
  "products": [
    {
      "id": "cmc52z10x0011xnash75xbds8",
      "name": "Sarmale Casei",
      "description": "Traditional Romanian cabbage rolls",
      "price": 25.00,
      "currency": "MDL",
      "image": "/images/products/sarmale.jpg",
      "category": "Traditional",
      "isAvailable": true,
      "isApproved": true,
      "cook": {
        "id": "cmc52z1030000xnasx2zyuwv9",
        "name": "Maria Bucătar",
        "avatar": "/images/avatars/maria.jpg",
        "city": "Chișinău"
      },
      "reviews": [
        {
          "id": "review_id",
          "rating": 5,
          "comment": "Excellent taste!",
          "customer": {
            "name": "Andrei Customer"
          },
          "createdAt": "2024-01-15T10:30:00Z"
        }
      ],
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-10T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

### GET /api/products/[id]
Get a specific product by ID.

**Response:**
```json
{
  "id": "cmc52z10x0011xnash75xbds8",
  "name": "Sarmale Casei",
  "description": "Traditional Romanian cabbage rolls with pork and rice...",
  "price": 25.00,
  "currency": "MDL",
  "image": "/images/products/sarmale.jpg",
  "category": "Traditional",
  "isAvailable": true,
  "isApproved": true,
  "cook": {
    "id": "cmc52z1030000xnasx2zyuwv9",
    "name": "Maria Bucătar",
    "avatar": "/images/avatars/maria.jpg",
    "city": "Chișinău",
    "rating": 4.8
  },
  "reviews": [...],
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-10T08:00:00Z"
}
```

**Status Codes:**
- `200` - Success
- `404` - Product not found
- `500` - Server error

### POST /api/products
Create a new product (requires cook authentication).

**Request Body:**
```json
{
  "name": "Sarmale Casei",
  "description": "Traditional Romanian cabbage rolls",
  "price": 25.00,
  "category": "Traditional",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

**Response:**
```json
{
  "product": {
    "id": "new_product_id",
    "name": "Sarmale Casei",
    "description": "Traditional Romanian cabbage rolls",
    "price": 25.00,
    "currency": "MDL",
    "image": "/images/products/new_image.jpg",
    "category": "Traditional",
    "isAvailable": true,
    "isApproved": false,
    "cookId": "cook_user_id",
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  },
  "message": "Product created successfully. Awaiting approval."
}
```

**Status Codes:**
- `201` - Product created
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

### PUT /api/products/[id]
Update an existing product (requires cook authentication).

**Request Body:**
```json
{
  "name": "Updated Sarmale Casei",
  "description": "Updated description",
  "price": 30.00,
  "category": "Traditional",
  "image": "new_image_data"
}
```

**Response:**
```json
{
  "product": {
    "id": "product_id",
    "name": "Updated Sarmale Casei",
    "description": "Updated description",
    "price": 30.00,
    "updatedAt": "2024-01-15T13:00:00Z"
  },
  "message": "Product updated successfully"
}
```

**Status Codes:**
- `200` - Product updated
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not the product owner)
- `404` - Product not found
- `500` - Server error

### DELETE /api/products/[id]
Delete a product (requires cook authentication).

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

**Status Codes:**
- `200` - Product deleted
- `401` - Unauthorized
- `403` - Forbidden (not the product owner)
- `404` - Product not found
- `500` - Server error

## 🛒 Order Endpoints

### GET /api/orders
Get orders for the authenticated user.

**Query Parameters:**
- `status` (optional) - Filter by order status
- `page` (optional) - Page number
- `limit` (optional) - Items per page

**Response:**
```json
{
  "orders": [
    {
      "id": "order_id",
      "status": "PENDING",
      "total": 50.00,
      "currency": "MDL",
      "address": "Strada Test 123, Chișinău",
      "phone": "+37360000000",
      "notes": "Please deliver after 6 PM",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "items": [
        {
          "id": "item_id",
          "productId": "product_id",
          "quantity": 2,
          "price": 25.00,
          "product": {
            "name": "Sarmale Casei",
            "image": "/images/products/sarmale.jpg"
          }
        }
      ],
      "cook": {
        "id": "cook_id",
        "name": "Maria Bucătar"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "pages": 2
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

### POST /api/orders
Create a new order (supports both authenticated and guest users).

**Request Body (Authenticated User):**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "address": "Strada Test 123, Chișinău",
  "phone": "+37360000000",
  "notes": "Please deliver after 6 PM"
}
```

**Request Body (Guest User):**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "address": "Strada Test 123, Chișinău",
  "phone": "+37360000000",
  "notes": "Please deliver after 6 PM",
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}
```

**Response:**
```json
{
  "order": {
    "id": "new_order_id",
    "customerId": "customer_id",
    "cookId": "cook_id",
    "status": "PENDING",
    "total": 50.00,
    "currency": "MDL",
    "address": "Strada Test 123, Chișinău",
    "phone": "+37360000000",
    "notes": "Please deliver after 6 PM",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "isGuestOrder": false,
  "message": "Order created successfully"
}
```

**Status Codes:**
- `201` - Order created
- `400` - Validation error
- `404` - Product not found
- `500` - Server error

### GET /api/orders/[id]
Get a specific order by ID.

**Response:**
```json
{
  "id": "order_id",
  "status": "PENDING",
  "total": 50.00,
  "currency": "MDL",
  "address": "Strada Test 123, Chișinău",
  "phone": "+37360000000",
  "notes": "Please deliver after 6 PM",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z",
  "items": [...],
  "customer": {
    "id": "customer_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "cook": {
    "id": "cook_id",
    "name": "Maria Bucătar"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Order not found
- `500` - Server error

### PUT /api/orders/[id]
Update order status (requires cook or admin authentication).

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

**Response:**
```json
{
  "order": {
    "id": "order_id",
    "status": "CONFIRMED",
    "updatedAt": "2024-01-15T11:00:00Z"
  },
  "message": "Order status updated successfully"
}
```

**Status Codes:**
- `200` - Order updated
- `400` - Invalid status
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Order not found
- `500` - Server error

## 👨‍🍳 Admin Endpoints

### GET /api/admin/stats
Get platform statistics (requires admin authentication).

**Response:**
```json
{
  "stats": {
    "totalUsers": 150,
    "totalProducts": 89,
    "totalOrders": 234,
    "pendingProducts": 12,
    "pendingOrders": 8,
    "revenue": {
      "total": 12500.00,
      "currency": "MDL",
      "thisMonth": 3200.00
    },
    "topCategories": [
      {
        "name": "Traditional",
        "count": 45
      },
      {
        "name": "Desserts",
        "count": 23
      }
    ]
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### GET /api/admin/users
Get all users (requires admin authentication).

**Query Parameters:**
- `role` (optional) - Filter by user role
- `page` (optional) - Page number
- `limit` (optional) - Items per page

**Response:**
```json
{
  "users": [
    {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "isCook": false,
      "isAdmin": false,
      "isVerified": true,
      "rating": 0,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### GET /api/admin/products/pending
Get pending products for approval (requires admin authentication).

**Response:**
```json
{
  "products": [
    {
      "id": "product_id",
      "name": "New Product",
      "description": "Product description",
      "price": 25.00,
      "image": "/images/products/new.jpg",
      "category": "Traditional",
      "cook": {
        "id": "cook_id",
        "name": "Maria Bucătar",
        "email": "maria@example.com"
      },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `500` - Server error

### POST /api/admin/products/approve
Approve or reject a product (requires admin authentication).

**Request Body:**
```json
{
  "productId": "product_id",
  "approved": true,
  "reason": "Product meets quality standards"
}
```

**Response:**
```json
{
  "message": "Product approved successfully",
  "product": {
    "id": "product_id",
    "isApproved": true,
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

**Status Codes:**
- `200` - Product status updated
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (not admin)
- `404` - Product not found
- `500` - Server error

## ⭐ Review Endpoints

### POST /api/reviews
Create a new review (requires customer authentication).

**Request Body:**
```json
{
  "cookId": "cook_id",
  "productId": "product_id",
  "rating": 5,
  "comment": "Excellent food and service!"
}
```

**Response:**
```json
{
  "review": {
    "id": "review_id",
    "rating": 5,
    "comment": "Excellent food and service!",
    "customerId": "customer_id",
    "cookId": "cook_id",
    "productId": "product_id",
    "createdAt": "2024-01-15T14:00:00Z"
  },
  "message": "Review submitted successfully"
}
```

**Status Codes:**
- `201` - Review created
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

## 📊 Error Responses

### Standard Error Format
```json
{
  "error": "Error message description",
  "details": {
    "field": "Specific field error"
  },
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication required
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict
- `INTERNAL_ERROR` - Server error

## 🔄 Order Status Flow

### Status Transitions
```
PENDING → CONFIRMED → PREPARING → READY → DELIVERED
    ↓
CANCELLED
```

### Status Descriptions
- **PENDING**: Order received, awaiting cook confirmation
- **CONFIRMED**: Cook has confirmed the order
- **PREPARING**: Food is being prepared
- **READY**: Food is ready for delivery
- **DELIVERED**: Order has been delivered
- **CANCELLED**: Order has been cancelled

## 📝 Rate Limiting

### Limits
- **Authentication endpoints**: 5 requests per minute
- **Product endpoints**: 100 requests per minute
- **Order endpoints**: 20 requests per minute
- **Admin endpoints**: 50 requests per minute

### Rate Limit Headers
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## 🔒 Security

### CORS Configuration
```javascript
{
  origin: ['https://gustul-casei.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Data Validation
- All inputs are validated using Zod schemas
- SQL injection protection via Prisma ORM
- XSS protection via input sanitization
- CSRF protection via NextAuth.js

## 📞 Support

For API support or questions:
- **Email**: api-support@gustul-casei.md
- **Documentation**: https://docs.gustul-casei.md
- **Status Page**: https://status.gustul-casei.md 