const app = require('./app');

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  console.log(` API Documentation:`);
  console.log(`   GET    /                    - Hello World`);
  console.log(`   GET    /api/products        - List all products`);
  console.log(`   GET    /api/products/:id    - Get product by ID`);
  console.log(`   POST   /api/products        - Create product (requires API key)`);
  console.log(`   PUT    /api/products/:id    - Update product (requires API key)`);
  console.log(`   DELETE /api/products/:id    - Delete product (requires API key)`);
  console.log(`   GET    /api/products/search - Search products`);
  console.log(`   GET    /api/products/stats  - Get product statistics`);
  console.log(`\n🔑 Use header: x-api-key: your-secret-api-key for protected routes`);
});
