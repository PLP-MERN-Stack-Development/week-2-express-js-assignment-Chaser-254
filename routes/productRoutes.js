const express = require('express');
const { authenticate, validateBody } = require('../middleware');
const { productSchema, updateProductSchema } = require('../utils/validation');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
} = require('../controllers/productController');

const router = express.Router();

// Important: Specific routes must come BEFORE parameterized routes
// GET /api/products/search - Search products
router.get('/search', searchProducts);

// GET /api/products/stats - Get product statistics
router.get('/stats', getProductStats);

// GET /api/products - List all products
router.get('/', getAllProducts);

// POST /api/products - Create new product
router.post('/', authenticate, validateBody(productSchema), createProduct);

// GET /api/products/:id - Get specific product by ID
router.get('/:id', getProductById);

// PUT /api/products/:id - Update existing product
router.put('/:id', authenticate, validateBody(updateProductSchema), updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;