const express = require('express');
const validate = require('../../middlewares/validate');
const { ingredientValidation } = require('../../validations');
const { ingredientController } = require('../../controllers');
const { auth } = require('../../middlewares/auth');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

const router = express.Router();

router.post(
  '/create',
  auth('manageIngredient'),
  aggregateRequestDataMiddleware,
  validate(ingredientValidation.createIngredient),
  ingredientController.createNewIngredient
);

router
  .route('/list')
  .get(
    auth('getIngredient'),
    aggregateRequestDataMiddleware,
    validate(ingredientValidation.getIngredients),
    ingredientController.getIngredients
  );

router
  .route('/:id')
  .get(
    auth('getIngredient'),
    aggregateRequestDataMiddleware,
    ingredientController.getIngredientByID
  )
  .put(
    auth('manageIngredient'),
    aggregateRequestDataMiddleware,
    validate(ingredientValidation.updateIngredient),
    ingredientController.updateIngredientById
  );

router.delete(
  '/delete',
  auth('manageIngredient'),
  aggregateRequestDataMiddleware,
  validate(ingredientValidation.deleteIngredient),
  ingredientController.deleteIngredient
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Ingredient
 *   description: Ingredient management and retrieval. authenticated using cookies.
 *   summary : Only admin and sales person and create, edit and delete the Ingredient.
 */

/**
 * @swagger
 * /ingredient/create:
 *   post:
 *     summary: Create a new ingredient.
 *     tags: [Ingredient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       '201':
 *         description: The created ingredient object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status :
 *                   type: number
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: 201
 *               message: Ingredient created successfully.
 *               id: 658fc8f65e4c9e21a3102114
 *       "409":
 *         $ref: '#/components/responses/AlreadyExist'
 *       '400':
 *          $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /ingredient/list:
 *   get:
 *     summary: Get Ingredients.
 *     description: Retrieve Ingredients with advanced filtering options. authenticated using cookies.
 *     tags: [Ingredient]
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: object
 *           default: {}
 *           example: {"name": 1 , createdBy : 1}
 *         description: Fields that we want; by default, it will return all fields.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *         description: Optional filters.
 *       - in: query
 *         name: options
 *         schema:
 *           type: object
 *           properties:
 *             search:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: "test"
 *                   description: Text you want to search.
 *                 fields:
 *                   type: array
 *                   example: ["name"]
 *                   description: Fields on which you want to apply search.
 *             sort:
 *               type: object
 *               example: {"name": -1}
 *               description: Field on which you want to sort (for asc(1)/desc(-1)).
 *             limit:
 *               type: integer
 *               example: 15
 *               description: How many results you want per page.
 *             page:
 *               type: integer
 *               example: 1
 *               description: Page number.
 *         description: Additional options for search, sort, limit, and page.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     results:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Ingredient'
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                     totalResults:
 *                       type: integer
 *                       example: 1
 *                     searchingText:
 *                       type: string
 *                       example: test
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /ingredient/{id}:
 *   get:
 *     summary: Get a ingredient by its ID.
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the ingredient.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: object
 *           default: {}
 *           example: {"name": 1}
 *         description: Fields that we want; by default, it will return all fields.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *         description: Optional filters.
 *       - in: query
 *         name: options
 *         schema :
 *           type : object
 *           example: {}
 *     responses:
 *       '200':
 *         description: The Ingredient object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     createdBy:
 *                       type: string
 *                     updatedBy:
 *                       type: string
 *                     id:
 *                       type: string
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *          $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: update an existing Ingredient.
 *     tags: [Ingredient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the ingredient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientUpdate'
 *     responses:
 *       '201':
 *         description: The updated Ingredient object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status :
 *                   type: number
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: 201
 *               message: Ingredient updated successfully.
 *               id: 658fc8f65e4c9e21a3102114
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       '404':
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /ingredient/delete:
 *   delete:
 *     summary: Delete ingredients. only staff can delete it.
 *     tags: [Ingredient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: object
 *                 properties:
 *                  ids:
 *                    type: array
 *                    description : array of ids that you want to delete.
 *                    example : ["6595188c099afe4ad5b4bf43"]
 *                    required : true
 *                 default: {}
 *                 description: Fields for filtering. ids is required field and you can add other filter also.
 *                 example : {ids : ["6595188c099afe4ad5b4bf43"]}
 *               options:
 *                 type: object
 *     responses:
 *       '200':
 *         description: Successful deletion response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example : 200
 *                 message:
 *                   type: string
 *                   example: Ingredients deleted successfully, and references have been removed from dishes.
 *                 metadata :
 *                   type: object
 *                   example : { acknowledged: true,  deletedCount: 1}
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
