const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { v4: uuidv4 } = require('uuid');

const purchaseTransactionSchema = new mongoose.Schema(
  {
    tid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    originalTransactionId: {
      type: String, // Assuming transaction id is of type String
    },
    amount: {
      type: Number,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['purchase', 'refund'],
      required: true,
    },
    transactionStatus: {
      type: String,
      enum: ['pending', 'completed', 'failure'],
      required: true,
    },
    paymentPurchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PurchasePaymentInformation',
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'wallet', 'card', 'net-banking', 'UPI'],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
purchaseTransactionSchema.plugin(toJSON);
purchaseTransactionSchema.plugin(paginate);

const PurchaseTransaction = mongoose.model(
  'PurchaseTransaction',
  purchaseTransactionSchema
);

module.exports = PurchaseTransaction;
