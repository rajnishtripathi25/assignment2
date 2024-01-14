const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const purchaseProductInformationSchema = new mongoose.Schema(
  {
    tid: {
      type: String,
      ref: 'PurchaseTransaction',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    saleDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
purchaseProductInformationSchema.plugin(toJSON);
purchaseProductInformationSchema.plugin(paginate);

const PurchaseProductInformation = mongoose.model(
  'PurchaseProductInformation',
  purchaseProductInformationSchema
);

module.exports = PurchaseProductInformation;
