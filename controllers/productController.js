const { v4: uuidv4 } = require('uuid');
const { products } = require('../config/database');
const { NotFoundError } = require('../utils/errors');
const { asyncHandler } = require('../middleware');

// Get all products with filtering and pagination
const getAllProducts = asyncHandler(async (req, res) => {
  const { category, inStock, page = 1, limit = 10, sortBy = 'name', order = 'asc' } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by stock status
  if (inStock !== undefined) {
    const stockFilter = inStock === 'true';
    filteredProducts = filteredProducts.filter(product => product.inStock === stockFilter);
  }
  
  // Sort products
  filteredProducts.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (order === 'desc') {
      return bValue > aValue ? 1 : -1;
    }
    return aValue > bValue ? 1 : -1;
  });
  
  // Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    products: paginatedProducts,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(filteredProducts.length / limitNum),
      totalItems: filteredProducts.length,
      itemsPerPage: limitNum
    },
    filters: {
      category: category || null,
      inStock: inStock || null
    }
  });
});

// Get product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    throw new NotFoundError('Product not found');
  }
  
  res.json(product);
});

// Create new product
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    throw new NotFoundError('Product not found');
  }
  
  products[productIndex] = {
    ...products[productIndex],
    ...req.body
  };
  
  res.json({
    message: 'Product updated successfully',
    product: products[productIndex]
  });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    throw new NotFoundError('Product not found');
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  
  res.json({
    message: 'Product deleted successfully',
    product: deletedProduct
  });
});

// Search products
const searchProducts = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  if (!q) {
    return res.status(400).json({
      error: 'Search query parameter "q" is required'
    });
  }
  
  const searchResults = products.filter(product =>
    product.name.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase())
  );
  
  // Pagination for search results
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  
  const paginatedResults = searchResults.slice(startIndex, endIndex);
  
  res.json({
    query: q,
    results: paginatedResults,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(searchResults.length / limitNum),
      totalItems: searchResults.length,
      itemsPerPage: limitNum
    }
  });
});

// Get product statistics
const getProductStats = asyncHandler(async (req, res) => {
  const stats = {
    totalProducts: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
    categoryCount: {},
    priceRange: {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  };
  
  // Count products by category
  products.forEach(product => {
    stats.categoryCount[product.category] = (stats.categoryCount[product.category] || 0) + 1;
  });
  
  res.json(stats);
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductStats
};
