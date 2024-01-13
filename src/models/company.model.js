const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const campanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
campanySchema.plugin(toJSON);
campanySchema.plugin(paginate);

const Campany = new mongoose.model('Company', campanySchema);

module.exports = Campany;
