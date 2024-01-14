const express = require('express');
const router = express.Router();
const { productController } = require('../../controllers');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

router.post(
  '/create',
  aggregateRequestDataMiddleware,
  productController.createProduct
);

router.put(
  '/status/:id',
  aggregateRequestDataMiddleware,
  productController.updateProductStatus
);

router.get(
  '/sold',
  aggregateRequestDataMiddleware,
  productController.viewSoldProducts
);

router.get(
  '/top-selling',
  aggregateRequestDataMiddleware,
  productController.viewTopSellingProducts
);

router.get(
  '/history',
  aggregateRequestDataMiddleware,
  productController.viewPurchaseHistory
);

module.exports = router;
