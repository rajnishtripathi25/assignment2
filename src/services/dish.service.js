const httpStatus = require('http-status');
const APIError = require('../utils/apiError');
const { Dish } = require('../models');

/**
 * Create a dish
 * @param {Object} dishDetails
 * @returns {Promise<Dish>}
 */

const createDish = ({ document, options = {}, context }) => {
  try {
    const { user: loggedInUser } = context;
    const dishDetails = {
      ...document,
      name_lower: document.name.toLowerCase(),
      createdBy: loggedInUser._id,
      updatedBy: loggedInUser._id,
    };
    if (document.sapId) {
      dishDetails.sapId_lower = document.sapId.toLowerCase();
    }
    const result = new Dish(dishDetails);
    return result.save(options);
  } catch (error) {
    throw new APIError(httpStatus.BAD_REQUEST, error.message);
  }
};

/**
 * Update dish by id
 * @param {ObjectId} dishId
 * @param {Object} updateBody
 * @returns {Promise<Dish>}
 */

const updateDishById = async ({ _id, update, context }) => {
  try {
    const { set, unset, push, pull, options = {} } = update;
    const { user: loggedInUser } = context;

    const updates = { updatedBy: loggedInUser._id };
    if (set) {
      updates.$set = set;
      if (update?.set.name) {
        updates.$set.name_lower = set.name.toLowerCase();
      }
      if (update?.set.sapId) {
        updates.$set.sapId_lower = set.sapId.toLowerCase();
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

    return Dish.findOneAndUpdate({ _id }, updates, options);
  } catch (err) {
    throw new APIError(httpStatus.BAD_REQUEST, err.message);
  }
};

/**
 * Query for dishes
 * @param {Object} filter - Mongo filter
 * @param {Object} fields - Mongo fields
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.search] - Text for searching documents
 * @returns {Promise<QueryResult>}
 */
const queryDishes = async ({ filter, fields, options }) => {
  return await Dish.paginate({ filter, fields, options });
};
/**
 * Get dish by id
 * @param {ObjectId} id
 * @returns {Promise<Dish>}
 */
const getDishById = async ({ _id, fields, options }) => {
  try {
    const { populate, ...queryOptions } = options;
    let query = Dish.findById(_id, fields, queryOptions);

    if (populate) {
      query = Object.entries(populate).reduce(
        (currentQuery, [path, selectFields]) => {
          const select = selectFields.join(' ');
          return currentQuery.populate({ path, select });
        },
        query
      );
    }

    return query.exec();
  } catch (err) {
    throw new APIError(httpStatus.BAD_REQUEST, err.message);
  }
};

const updateStatus = async ({ ids, updates, options = {} }) => {
  try {
    return Dish.updateMany({ _id: { $in: ids } }, updates, options);
  } catch (err) {
    throw new APIError(httpStatus.BAD_REQUEST, err.message);
  }
};

module.exports = {
  createDish,
  updateDishById,
  queryDishes,
  getDishById,
  updateStatus,
};
