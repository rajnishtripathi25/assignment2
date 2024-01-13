const allRoles = {
  user: ['getCompanies'],
  staff: [],
  sales: [
    'getCustomers',
    'manageCustomers',
    'getStaff',
    'manageStaff',
    'manageDish',
    'manageIngredient',
    'manageAllergens',
    'getDish',
    'getAllergens',
    'getIngredient',
    'manageCategory',
    'getCategory',
    'getCompanies',
    'getAddOn',
    'manageAddOn',
  ],
  admin: [
    'getCustomers',
    'manageCustomers',
    'getStaff',
    'manageStaff',
    'manageDish',
    'manageIngredient',
    'manageAllergens',
    'getDish',
    'getAllergens',
    'getIngredient',
    'manageCategory',
    'getCategory',
    'getCompanies',
    'getAddOn',
    'manageAddOn',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
