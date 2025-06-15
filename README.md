# Express.js RESTful API

A complete RESTful API built with Express.js featuring CRUD operations, authentication, validation, error handling, and advanced features like filtering, pagination, and search.

## Project Structure

```
├── package.json              # Project dependencies and scripts
├── server.js                 # Server entry point
├── app.js                    # Express app configuration
├── config/
│   └── database.js          # Database configuration (in-memory store)
├── controllers/
│   └── productController.js # Product route handlers
├── middleware/
│   └── index.js             # Custom middleware functions
├── routes/
│   ├── index.js             # Main router
│   └── productRoutes.js     # Product-specific routes
└── utils/
    ├── errors.js            # Custom error classes
    └── validation.js        # Joi validation schemas
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start        
   npm run dev      
   ```

## API Endpoints

### Public Endpoints
- `GET /` - Hello World and API overview
- `GET /api/products` - List all products (with filtering & pagination)
- `GET /api/products/:id` - Get specific product
- `GET /api/products/search` - Search products
- `GET /api/products/stats` - Get product statistics

### Protected Endpoints (require API key)
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Authentication

Protected routes require an API key in the headers:
```
x-api-key: your-secret-api-key
```

## Query Parameters

### Filtering & Pagination
```
GET /api/products?category=Electronics&inStock=true&page=1&limit=10&sortBy=price&order=desc
```

### Search
```
GET /api/products/search?q=laptop&page=1&limit=5
```

## Example Product Object

```json
{
  "id": "uuid-here",
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true
}
```

## Features

-  RESTful API design
-  CRUD operations
-  Authentication middleware
-  Input validation with Joi
-  Custom error handling
-  Filtering and pagination
-  Search functionality
-  Product statistics
-  Security headers with Helmet
-  CORS support
-  Async error handling
- Modular file structure