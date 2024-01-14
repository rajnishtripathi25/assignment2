const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      default: true,
    },
    title_lower: {
      type: String,
      maxlength: 255,
    },
    title: {
      type: String,
      maxlength: 255,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true,
    },
    productMetadata: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.index({ title_lower: 1 }, { unique: true, name: 'Title' });
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
