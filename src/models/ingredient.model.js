const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ingredientSchema = new mongoose.Schema(
  {
    name_lower: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index with a custom name
ingredientSchema.index(
  { name_lower: 1 },
  { unique: true, name: 'Ingredient_Name' }
);

// add plugin that converts mongoose to json
ingredientSchema.plugin(toJSON);
ingredientSchema.plugin(paginate);

const Ingredient = new mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
