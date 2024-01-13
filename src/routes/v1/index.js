const express = require('express');
const customerAuthRoute = require('./auth.route');
const staffAuthRoute = require('./staffAuth.route');
const customerRoute = require('./customer.route');
const staffRoute = require('./staff.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const dishRoute = require('./dishes.route');
const IngredientRoute = require('./ingredient.route');
const allergensRoute = require('./allergens.route');
const categoryRoute = require('./category.route');
const companyRoute = require('./company.route');
const addOn = require('./addOn.route');
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: customerAuthRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/staff-auth',
    route: staffAuthRoute,
  },
  {
    path: '/staff',
    route: staffRoute,
  },
  {
    path: '/dish',
    route: dishRoute,
  },
  {
    path: '/ingredient',
    route: IngredientRoute,
  },
  {
    path: '/allergens',
    route: allergensRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/company',
    route: companyRoute,
  },
  {
    path: '/addon',
    route: addOn,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
