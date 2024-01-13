const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createIngredient = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
};

const updateIngredient = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    set: Joi.object()
      .keys({
        name: Joi.string().trim(),
      })
      .default({}),
    unset: Joi.object().default({}),
    pull: Joi.object().default({}),
    push: Joi.object().default({}),
    options: Joi.object().default({}),
  }),
};

const deleteIngredient = {
  body: Joi.object().keys({
    ids: Joi.array().items(Joi.string().custom(objectId)),
    filter: Joi.object().keys({
      ids: Joi.array().items(Joi.string().custom(objectId)).required(),
    }),
    options: Joi.object().default({}),
  }),
};
const getIngredients = {
  params: Joi.object({
    fields: Joi.object().default({}),
    filter: Joi.object({
      _id: Joi.string().custom(objectId).allow(''),
      name: Joi.string().allow(''),
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
    }),
  }),
};

module.exports = {
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredients,
};
