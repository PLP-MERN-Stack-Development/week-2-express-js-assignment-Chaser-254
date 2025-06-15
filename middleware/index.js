const { ValidationError, AuthenticationError } = require('../utils/errors');

// Custom logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return next(new AuthenticationError('API key is required'));
  }
  
  // In production, validate against a secure API key store
  if (apiKey !== 'your-secret-api-key') {
    return next(new AuthenticationError('Invalid API key'));
  }
  
  next();
};

// Validation middleware factory
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new ValidationError(error.details[0].message));
    }
    next();
  };
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', err);
  
  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  // Handle operational errors
  if (err.isOperational) {
    statusCode = err.statusCode;
    message = err.message;
  }
  
  // Handle Joi validation errors
  if (err.isJoi) {
    statusCode = 400;
    message = err.details[0].message;
  }
  
  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON format';
  }
  
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = {
  logger,
  authenticate,
  validateBody,
  asyncHandler,
  errorHandler
};