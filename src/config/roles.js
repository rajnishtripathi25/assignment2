const allRoles = {
  buyer: ['getProduct'],
  seller: ['manageProduct', 'getProduct', 'getUser'],
  admin: ['getProduct', 'manageProduct', 'getUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
