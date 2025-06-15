const express = require('express');
const productRoutes = require('./productRoutes');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

// Root endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Express.js RESTful API is running',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      search: '/api/products/search',
      stats: '/api/products/stats'
    }
  });
});

// Product routes
router.use('/api/products', productRoutes);

// 404 handler for undefined routes
router.all('*', (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});

module.exports = router;