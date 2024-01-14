const express = require('express');
const validate = require('../../middlewares/validate');
const { userValidation } = require('../../validations');
const { userController } = require('../../controllers');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

const router = express.Router();

router.post(
  '/register',
  aggregateRequestDataMiddleware,
  validate(userValidation.createUser),
  userController.createNewUser
);

router.post('/login', aggregateRequestDataMiddleware, userController.login);

router.get(
  '/list',
  aggregateRequestDataMiddleware,
  validate(userValidation.getUsers),
  userController.getUsers
);
router
  .route('/:id')
  .get(aggregateRequestDataMiddleware, userController.getUser)
  .put(
    aggregateRequestDataMiddleware,
    validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(aggregateRequestDataMiddleware, userController.deleteUser);

module.exports = router;
