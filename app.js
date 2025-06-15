const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { logger, errorHandler } = require('./middleware');

// Initialize Express app
const app = express();

// Security and CORS middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom middleware
app.use(logger); // Custom logger

// Routes
app.use('/', routes);

// Global error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;