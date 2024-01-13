const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ingredientService } = require('../services');
const { ingredientMessages } = require('../config/httpMessages');

const createNewIngredient = catchAsync(async (req, res) => {
  try {
    const { context, options = {}, ...document } = req.allParams;
    const Ingredient = await ingredientService.createIngredient({
      document,
      options,
      context,
    });
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: ingredientMessages.CREATED,
      id: Ingredient.id,
    });
  } catch (error) {
    if (error?.code === 11000) {
      res.status(httpStatus.CONFLICT).json({
        status: httpStatus.CONFLICT,
        message: ingredientMessages.ALREADY_EXIST,
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

const updateIngredientById = catchAsync(async (req, res) => {
  const { id: _id, context, ...update } = req.allParams;
  const document = await ingredientService.updateIngredientById({
    _id,
    update,
    context,
  });
  if (document) {
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: ingredientMessages.UPDATED,
      id: document.id,
    });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: ingredientMessages.NOT_FOUND,
    });
  }
});

const getIngredients = catchAsync(async (req, res) => {
  let { fields = { name_lower: 0 }, filter, options = {} } = req.allParams;

  let search = options.search;
  if (search) {
    const searchText = typeof search === 'object' ? search.text : search;
    let searchFields = search.fields || ['name'];
    options.search = { text: searchText, fields: searchFields };
  }

  const result = await ingredientService.queryIngredients({
    filter,
    fields,
    options,
  });
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    data: result,
  });
});

const getIngredientByID = catchAsync(async (req, res) => {
  const { fields = {}, options = {}, id: _id } = req.allParams;
  if (Object.keys(fields).length === 0) {
    fields.name_lower = 0;
  }
  const document = await ingredientService.getIngredientById({
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
      message: ingredientMessages.NOT_FOUND,
    });
  }
});

const deleteIngredient = catchAsync(async (req, res) => {
  let {
    ids,
    filter: { ids: filterIds } = {},
    options = {},
  } = req.allParams || {};
  ids = ids || filterIds || [];
  const result = await ingredientService.deleteIngredient({
    ids,
    options,
  });
  res.status(httpStatus.OK).json({
    status: httpStatus.OK,
    message: ingredientMessages.DELETED,
    metadata: result,
  });
});

module.exports = {
  createNewIngredient,
  updateIngredientById,
  getIngredients,
  getIngredientByID,
  deleteIngredient,
};
