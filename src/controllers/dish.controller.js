const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dishService } = require('../services');
const { dishMessages } = require('../config/httpMessages');

const createNewDish = catchAsync(async (req, res) => {
  try {
    const { context, options = {}, ...document } = req.allParams;
    const result = await dishService.createDish({ document, options, context });
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: dishMessages.CREATED,
      id: result.id,
    });
  } catch (error) {
    if (error?.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: dishMessages.ALREADY_EXIST,
        metadata: { message: error.message, ...error },
      });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
});

const updateDishById = catchAsync(async (req, res) => {
  const { id: _id, context, ...update } = req.allParams;
  const document = await dishService.updateDishById({ _id, update, context });
  if (document) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: dishMessages.UPDATED,
      id: document.id,
    });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: dishMessages.NOT_FOUND,
    });
  }
});

const getDishes = catchAsync(async (req, res) => {
  let {
    fields = { name_lower: 0, sapId_lower: 0 },
    filter,
    options = {},
  } = req.allParams;
  let { search, populate = [] } = options;

  if (search) {
    const searchText = typeof search === 'object' ? search.text : search;
    let searchFields = search.fields || ['name', 'description'];
    options.search = { text: searchText, fields: searchFields };
  }

  if (Object.keys(populate).length === 0) {
    populate = {
      ...(fields.ingredients && { ingredients: ['name'] }),
      ...(fields.allergens && { allergens: ['name'] }),
      ...(fields.category && { category: ['name'] }),
      ...(fields.subCategory && { subCategory: ['name'] }),
    };
  }
  options.populate = populate;

  const result = await dishService.queryDishes({ filter, fields, options });
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    data: result,
  });
});

const getDishByID = catchAsync(async (req, res) => {
  const { fields = {}, options = {}, id: _id } = req.allParams;
  if (Object.keys(fields).length === 0) {
    fields.name_lower = 0;
    fields.sapId_lower = 0;
  }
  let { populate = [] } = options;

  if (Object.keys(populate).length === 0) {
    populate = {
      ...(fields.ingredients && { ingredients: ['name'] }),
      ...(fields.allergens && { allergens: ['name'] }),
      ...(fields.category && { category: ['name'] }),
      ...(fields.subCategory && { subCategory: ['name'] }),
    };
  }
  options.populate = populate;
  const document = await dishService.getDishById({
    _id,
    fields,
    options,
  });
  if (document) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: document,
    });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: dishMessages.NOT_FOUND,
    });
  }
});

const updateStatus = catchAsync(async (req, res) => {
  const {
    ids: filterIds = [],
    filter: { ids: reqIds = filterIds } = {},
    options = {},
    status,
    context,
  } = req.allParams;
  const active = !!status;
  const updates = { active, updatedBy: context.user._id };
  const result = await dishService.updateStatus({
    ids: reqIds,
    updates,
    options,
  });
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: dishMessages.UPDATED,
    metadata: result,
  });
});

module.exports = {
  createNewDish,
  updateDishById,
  getDishes,
  getDishByID,
  updateStatus,
};
