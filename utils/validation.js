const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(500).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().min(1).max(50).required(),
  inStock: Joi.boolean().required()
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  description: Joi.string().min(1).max(500),
  price: Joi.number().positive(),
  category: Joi.string().min(1).max(50),
  inStock: Joi.boolean()
}).min(1);

module.exports = {
  productSchema,
  updateProductSchema
};