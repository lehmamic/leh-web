import Joi from 'joi';

export const BlogPostValidator = Joi.object({
  _id: Joi.string().allow(null).allow(undefined),
  title: Joi.string().required(),
  description: Joi.string().allow('').allow(null).allow(undefined),
  content: Joi.string().allow(''),
  slug: Joi.string().required(),
  imageUrl: Joi.string().allow(null).allow(undefined),
  status: Joi.string().allow('draft', 'published').required(),
  type: Joi.string().allow('post', 'publipageshed').required(),
  publishedAt: Joi.date().allow(null).allow(undefined),
  createdAt: Joi.date().allow(null),
  modifiedAt: Joi.date().allow(null),
  tags: Joi.array().required(),
  authors: Joi.array().required(),
});

