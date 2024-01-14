const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productCategorySchema = new mongoose.Schema(
  {
    category_id: {
      type: Number,
      required: true,
      unique: true,
    },
    category_display_name: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productCategorySchema.plugin(toJSON);
productCategorySchema.plugin(paginate);

const ProductCategory = mongoose.model(
  'ProductCategory',
  productCategorySchema
);

module.exports = ProductCategory;
