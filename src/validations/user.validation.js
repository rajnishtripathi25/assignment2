const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    userType: Joi.string().required().valid('buyer', 'seller'),
    isActive: Joi.boolean().default(true).valid(true, false),
    walletBalance: Joi.number(),
  }),
};

const getUsers = {
  params: Joi.object({
    fields: Joi.object().default({}),
    filter: Joi.object({
      id: Joi.string().custom(objectId).allow(''),
      firstName: Joi.string().allow(''),
      userType: Joi.alternatives().try(
        Joi.string().allow(''),
        Joi.array().items(Joi.string())
      ),
      email: Joi.string().allow(''),
      isActive: Joi.boolean(),
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

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    set: Joi.object()
      .keys({
        firstName: Joi.string(),
        userType: Joi.string().valid('buyer', 'seller'),
        isActive: Joi.boolean().default(true).valid(true, false),
      })
      .default({}),
    unset: Joi.object().default({}),
    pull: Joi.object().default({}),
    push: Joi.object().default({}),
    options: Joi.object().default({}),
  }),
};

const deleteUser = {
  body: Joi.object().keys({
    filter: Joi.object()
      .keys({
        id: Joi.string().custom(objectId).required(),
      })
      .required(),
    options: Joi.object(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
