const httpStatus = require('http-status');
const { Product } = require('../models');
const { PurchaseProduct } = require('../models');
const { productMessages } = require('../config/httpMessages');

const createProduct = async (req, res) => {
  try {
    const { context, options = {}, ...document } = req.allParams || {};

    document.createdBy = context?.user.id;
    document.updatedBy = context?.user.id;
    document.title_lower = document.title.toLowerCase();

    const product = new Product(document);
    const result = await product.save();

    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: productMessages.CREATED,
      id: result.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductStatus = async (req, res) => {
  try {
    const { id, status } = req.allParams || {};
    const result = await Product.findByIdAndUpdate(
      id,
      { isActive: status },
      { new: true }
    );
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: productMessages.UPDATED,
      id: result.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewSoldProducts = async (req, res) => {
  try {
    const { startDate, endDate } = req.allParams || {};

    // Find orders that have a saleDate between startDate and endDate
    const orders = await PurchaseProduct.find({
      saleDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate('product');

    // You might want to transform the data to fit your needs before sending the response
    const soldProducts = orders.map((order) => ({
      productId: order.product._id,
      name: order.product.name,
      quantity: order.quantity,
      saleDate: order.saleDate,
    }));

    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: soldProducts,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: error.message,
    });
  }
};

const viewTopSellingProducts = async (req, res) => {
  // Implement logic to get top-selling products by day/week/month
};

const viewPurchaseHistory = async (req, res) => {
  // Implement logic to get purchase history with basic filters
};

module.exports = {
  createProduct,
  updateProductStatus,
  viewPurchaseHistory,
  viewSoldProducts,
  viewSoldProducts,
  viewTopSellingProducts,
};
