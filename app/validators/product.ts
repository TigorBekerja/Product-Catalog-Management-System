import Joi from 'joi'

export const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  type: Joi.string().required().messages({
    'string.empty': 'Type is required',
  }),
  description: Joi.string().allow(null, '').optional(),
  price: Joi.number()
  .precision(2)
  .max(9999999999.99)
  .required()
  .messages({
    'number.base': 'Price must be a number',
    'number.max': 'Price cannot exceed 9999999999.99',
    'any.required': 'Price is required',
  })
})

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().optional(),
  description: Joi.string().allow(null, '').optional(),
  price: Joi.number().precision(2).max(9999999999.99).optional(),
})
