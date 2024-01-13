const httpStatus = require('http-status');
const APIError = require('../utils/apiError');
const { Ingredient } = require('../models');
const { Dish } = require('../models');

/**
 * Create an ingredient
 * @param {Object} ingredientDetails
 * @returns {Promise<Ingredient>}
 */

const createIngredient = ({ document, options = {}, context }) => {
  try {
    const { user: loggedInUser } = context;
    const ingredientDetails = new Ingredient({
      ...document,
      name_lower: document.name.toLowerCase(),
      createdBy: loggedInUser._id,
      updatedBy: loggedInUser._id,
    });
    return ingredientDetails.save(options);
  } catch (error) {
    throw new APIError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Update ingredient by id
 * @param {ObjectId} ingredientId
 * @param {Object} updateBody
 * @returns {Promise<Ingredient>}
 */
const updateIngredientById = async ({ _id, update, context }) => {
  try {
    const { set, unset, push, pull, options = {} } = update;
    const { user: loggedInUser } = context;

    const updates = { updatedBy: loggedInUser._id };
    if (set) {
      updates.$set = set;
      if (update?.set.name) {
        updates.$set.name_lower = set.name.toLowerCase();
      }
    }
    if (unset) {
      updates.$unset = unset;
    }
    if (pull) {
      updates.$pull = pull;
    }
    if (push) {
      updates.$push = push;
    }

    return Ingredient.findOneAndUpdate({ _id }, updates, options);
  } catch (err) {
    throw new APIError(httpStatus.BAD_REQUEST, err.message);
  }
};

/**
 * Query for Ingredient
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryIngredients = async ({ filter, fields, options }) => {
  return await Ingredient.paginate({ filter, fields, options });
};
/**
 * Get Ingredient by id
 * @param {ObjectId} id
 * @returns {Promise<Ingredient>}
 */
const getIngredientById = async ({ _id, fields, options }) => {
  try {
    return Ingredient.findById(_id, fields, options);
  } catch (err) {
    throw new APIError(httpStatus.BAD_REQUEST, err.message);
  }
};

const deleteIngredient = async ({ ids, options }) => {
  try {
    const result = await Ingredient.deleteMany(
      {
        _id: { $in: ids },
      },
      options
    );
    await Dish.updateMany(
      { ingredients: { $in: ids } },
      { $pull: { ingredients: { $in: ids } } }
    );

    return result;
  } catch (error) {
    throw new APIError(httpStatus.BAD_REQUEST, error.message);
  }
};

module.exports = {
  createIngredient,
  updateIngredientById,
  queryIngredients,
  getIngredientById,
  deleteIngredient,
};
