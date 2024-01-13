const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createDish = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    moreInformation: Joi.string().trim(),
    quantity: Joi.number().integer().required(),
    category: Joi.string().trim().required(),
    subCategory: Joi.string().trim(),
    ingredients: Joi.array().items(Joi.string().trim()),
    pictures: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
        url: Joi.string().uri().trim(),
        type: Joi.string(),
      })
    ),
    price: Joi.number().greater(0).required(),
    minimum: Joi.number().min(0).default(1),
    multiplyBy: Joi.number().min(1).default(1),
    maximum: Joi.number().min(0),
    sapId: Joi.string().trim(),
    active: Joi.boolean().default(true),
    allergens: Joi.array().items(Joi.string().trim()),
    byBrand: Joi.string().trim(),
  }),
};

const updateDish = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    set: Joi.object()
      .keys({
        name: Joi.string().trim(),
        description: Joi.string().trim(),
        moreInformation: Joi.string().trim(),
        quantity: Joi.number().integer(),
        category: Joi.string().trim(),
        subCategory: Joi.string().trim(),
        ingredients: Joi.array().items(Joi.string().trim()),
        pictures: Joi.array().items(
          Joi.object().keys({
            name: Joi.string(),
            url: Joi.string().uri().trim(),
            type: Joi.string(),
          })
        ),
        price: Joi.number().greater(0),
        minimum: Joi.number().min(0),
        multiplyBy: Joi.number().min(1),
        maximum: Joi.number().min(0),
        sapId: Joi.string().trim(),
        active: Joi.boolean(),
        allergens: Joi.array().items(Joi.string().trim()),
        byBrand: Joi.string().trim(),
      })
      .default({}),
    unset: Joi.object().default({}),
    pull: Joi.object().default({}),
    push: Joi.object().default({}),
    options: Joi.object().default({}),
  }),
};

const getDishById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
    fields: Joi.object().default({}),
    options: Joi.object().keys({
      populate: Joi.object().default({}),
    }),
  }),
};
const updateStatus = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(objectId)),
    filter: Joi.object().keys({
      ids: Joi.array().items(Joi.string().custom(objectId)),
    }),
    status: Joi.boolean().required(),
    options: Joi.object().default({}),
  }),
};

const getDishes = {
  params: Joi.object({
    fields: Joi.object().default({}),
    filter: Joi.object({
      _id: Joi.string().custom(objectId).allow(''),
      name: Joi.string().allow(''),
      description: Joi.string().allow(''),
      quantity: Joi.number().integer(),
      category: Joi.string().trim(),
      subCategory: Joi.string().trim(),
      ingredients: Joi.array().items(Joi.string().trim()),
      price: Joi.number().greater(0),
      sapId: Joi.string().trim(),
      allergens: Joi.array().items(Joi.string().trim()),
      byBrand: Joi.string().trim(),
      active: Joi.boolean(),
    }),
    options: Joi.object({
      sort: Joi.object(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
      search: Joi.alternatives(
        Joi.string().default(''),
        Joi.object({
          text: Joi.string().default(''),
          fields: Joi.array().default([]),
        })
      ),
      populate: Joi.object().default({}),
    }),
  }),
};

module.exports = {
  createDish,
  updateDish,
  updateStatus,
  getDishes,
  getDishById,
};
