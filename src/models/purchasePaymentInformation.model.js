const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { v4: uuidv4 } = require('uuid');

const purchasePaymentInformationSchema = new mongoose.Schema(
  {
    payment_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    transaction_id: {
      type: String, // Assuming transaction_id is of type String (UUID)
      ref: 'PurchaseTransaction',
      required: true,
    },
    is_successful: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
purchasePaymentInformationSchema.plugin(toJSON);
purchasePaymentInformationSchema.plugin(paginate);

const PurchasePaymentInformation = mongoose.model(
  'PurchasePaymentInformation',
  purchasePaymentInformationSchema
);

module.exports = PurchasePaymentInformation;
