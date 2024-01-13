const express = require('express');
const validate = require('../../middlewares/validate');
const { dishValidation } = require('../../validations');
const { dishController } = require('../../controllers');
const { auth } = require('../../middlewares/auth');
const aggregateRequestDataMiddleware = require('../../middlewares/requestParameterHandler');

const router = express.Router();

router.post(
  '/create',
  auth('manageDish'),
  aggregateRequestDataMiddleware,
  validate(dishValidation.createDish),
  dishController.createNewDish
);

router.get(
  '/list',
  auth('getDish'),
  aggregateRequestDataMiddleware,
  validate(dishValidation.getDishes),
  dishController.getDishes
);

router.put(
  '/status',
  auth('manageDish'),
  aggregateRequestDataMiddleware,
  validate(dishValidation.updateStatus),
  dishController.updateStatus
);

router.get(
  '/:id',
  auth('getDish'),
  aggregateRequestDataMiddleware,
  validate(dishValidation.getDishById),
  dishController.getDishByID
);

router.put(
  '/:id',
  auth('manageDish'),
  aggregateRequestDataMiddleware,
  validate(dishValidation.updateDish),
  dishController.updateDishById
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Dishes
 *   description: Dish management and retrieval.
 */

/**
 * @swagger
 * /dish/create:
 *   post:
 *     summary: Create a new dish.
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DishCreation'
 *     responses:
 *       '201':
 *         description: The creat dish object.
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
 *               message: Dish created successfully.
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
 * /dish/list:
 *   get:
 *     summary: Get all dishes.
 *     description: Retrieve dish with advanced filtering options. Authenticated using cookies.
 *     tags: [Dishes]
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: object
 *           default: {}
 *           example: {"name": 1, "description": 1, "price": 1 , "quantity" : 1 }
 *         description: Fields that we want; by default, it will return all fields.
 *       - in: query
 *         name: filter
 *         schema:
 *           type: object
 *           example: {"active": "true"}
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
 *                   example: "paneer"
 *                   description: Text you want to search.
 *                 fields:
 *                   type: array
 *                   example: ["name", "description"]
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
 *             populate:
 *               type : object
 *               example : {'ingredients': ["name"], 'allergens': ["name", "description"]}
 *               description : fields that you want to populate.
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
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "CHOOLE bhatoore"
 *                           description:
 *                             type: string
 *                             example: "A delicious curry made with roasted chicken chunks in a spicy sauce."
 *                           quantity:
 *                             type: integer
 *                             example: 0
 *                           moreInformation:
 *                             type: string
 *                             example: "Served with basmati rice or naan bread."
 *                           category:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "test"
 *                               id:
 *                                 type: string
 *                                 example: "6597cfe28519a25dc272f746"
 *                           subCategory:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "test"
 *                               id:
 *                                 type: string
 *                                 example: "6597cfe28519a25dc272f746"
 *                           ingredients:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "check5 ingredient"
 *                                 id:
 *                                   type: string
 *                                   example: "6596ad509b3b5c76fce0ea82"
 *                           pictures:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "raj"
 *                                 url:
 *                                   type: string
 *                                   format: uri
 *                                   example: "https://example.com/images/chicken_tikka_masala.png"
 *                                 type:
 *                                   type: string
 *                                   example: "png"
 *                                 _id:
 *                                   type: string
 *                                   example: "6597c19550fc054f5fefb3c9"
 *                           price:
 *                             type: number
 *                             example: 12.99
 *                           minimum:
 *                             type: integer
 *                             example: 1
 *                           multiplyBy:
 *                             type: integer
 *                             example: 1
 *                           maximum:
 *                             type: integer
 *                             example: 5
 *                           sapId:
 *                             type: string
 *                             example: "2e4r523434534"
 *                           allergens:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 name:
 *                                   type: string
 *                                   example: "ALLERGENS"
 *                                 id:
 *                                   type: string
 *                                   example: "6597bf1524095c3b666aa15d"
 *                           byBrand:
 *                             type: string
 *                             example: "Blast Food Inc."
 *                           createdBy:
 *                             type: string
 *                             example: "65966761a183b521b079f175"
 *                           updatedBy:
 *                             type: string
 *                             example: "65966761a183b521b079f175"
 *                           active:
 *                             type: boolean
 *                             example: true
 *                           id:
 *                             type: string
 *                             example: "6597c19550fc054f5fefb3c8"
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
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /dish/{id}:
 *   get:
 *     summary: Get a dish by its ID.
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the dish.
 *       - in: query
 *         name: fields
 *         schema:
 *           type: object
 *           default: {}
 *           example: {"name": 1, "description": 1}
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
 *           properties :
 *             populate:
 *               type : object
 *               example : {'ingredients': ["name"], 'allergens': ["name", "description"]}
 *               description : fields that you want to populate.
 *     responses:
 *       '200':
 *         $ref: '#components/schemas/DishResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *   put:
 *     summary: update an existing dish
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the dish.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DishUpdate'
 *     responses:
 *       '200':
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
 *               status: 200
 *               message: Dish updated successfully.
 *               id: 658fc8f65e4c9e21a3102114
 *       '400':
 *         $ref: '#/components/responses/BadRequest'
 *       '404':
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /dish/status:
 *   put:
 *     summary: Update dish status.
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusRequest'
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status :
 *                   type: number
 *                 message:
 *                   type: string
 *                 data :
 *                   type: object
 *             example:
 *               status: 200
 *               message: Dish updated successfully
 *               data : { acknowledged: true, modifiedCount: 0, upsertedId: null, upsertedCount: 0, matchedCount: 0}
 *       '400':
 *          $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
