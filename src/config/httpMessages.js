const authMessage = {
  UNAUTHORIZED: 'Unauthorized: Please authenticate.',
  SESSION_EXPIRED: 'Session has expired. Please log in again.',
  FORBIDDEN: 'Forbidden: You do not have permission to access this resource.',
  USER_NOT_FOUND: 'User not found.',
  USER_IS_DISABLED: 'User is disabled.',
  RESET_PASSWORD_FAILED: 'Failed to reset password.',
  EMAIL_VERIFICATION_FAILED: 'Email verification failed.',
  EMAIL_ALREADY_REGISTERED: 'Email is already registered.',
  PHONE_ALREADY_REGISTERED: 'Phone number is already registered.',
  PHONE_ALREADY_EXIST: 'Phone number already exist.',
  USER_CREATED_SUCCESSFULLY: 'User created successfully.',
  USER_UPDATED_SUCCESSFULLY: 'User updated successfully.',
  USER_LOGGED_IN_SUCCESSFULLY: 'User logged in successfully.',
  USER_LOGGED_OUT_SUCCESSFULLY: 'User logged out successfully.',
  USER_DELETED_SUCCESSFULLY: 'User deleted successfully.',
  TOKEN_REFRESHED_SUCCESSFULLY: 'Token refreshed successfully.',
  EMPTY_EMAIL_PHONE_NUMBER: 'Please provide either email or phone number.',
  EMPTY_EMAIL: 'Email cannot be empty.',
  EMAIL_OTP_SENT_SUCCESSFULLY:
    'OTP sent successfully, please check your email.',
  MAX_OTP_ATTEMPTS_REACHED:
    'Maximum OTP verification attempts reached. Please try again later.',
  OTP_EXPIRED: 'OTP has expired. Please request a new one.',
  INCORRECT_OTP: 'Incorrect OTP.',
  COMPANY_NOT_FOUND: 'Company not found.',
};

const dishMessages = {
  CREATED: 'Dish created successfully.',
  UPDATED: 'Dish updated successfully.',
  DELETED: 'Dish deleted successfully.',
  NOT_FOUND: 'Dish not found.',
  UNABLE_TO_DELETE: 'Unable to delete dish.',
  ALREADY_EXIST: 'Dish with same [Name/SapId] already exist.',
  UNABLE_TO_EDIT: 'Unable to update dish.',
};
const addOnMessages = {
  CREATED: 'AddOn created successfully.',
  UPDATED: 'AddOn updated successfully.',
  DELETED: 'AddOn deleted successfully.',
  NOT_FOUND: 'AddOn not found.',
  UNABLE_TO_DELETE: 'Unable to delete addOn.',
  ALREADY_EXIST: 'AddOn with same [Name/SapId] already exist.',
  UNABLE_TO_EDIT: 'Unable to update addOn.',
};
const ingredientMessages = {
  CREATED: 'Ingredient created successfully.',
  UPDATED: 'Ingredient updated successfully.',
  DELETED:
    'Ingredient deleted successfully , and references have been removed from dishes',
  NOT_FOUND: 'Ingredient not found.',
  UNABLE_TO_DELETE: 'Unable to delete Ingredient.',
  ALREADY_EXIST: 'Ingredient with same [Name] already exist.',
  UNABLE_TO_EDIT: 'Unable to update Ingredient.',
};
const allergensMessages = {
  CREATED: 'Allergens created successfully.',
  UPDATED: 'Allergens updated successfully.',
  DELETED:
    'Allergen deleted successfully, and references have been removed from dishes.',
  NOT_FOUND: 'Allergens not found.',
  UNABLE_TO_DELETE: 'Unable to delete Allergens.',
  ALREADY_EXIST: 'Allergens with same [Name] already exist.',
  UNABLE_TO_EDIT: 'Unable to update Allergens.',
};
const categoryMessages = {
  CREATED: 'Category created successfully.',
  UPDATED: 'Category updated successfully.',
  DELETED: 'Category deleted successfully.',
  NOT_FOUND: 'Category not found.',
  UNABLE_TO_DELETE: 'Unable to delete Category.',
  UNABLE_TO_EDIT: 'Unable to update Category.',
  ALREADY_EXIST: 'Category with same [Name] already exist.',
  BELONGS_TO_DISHES: 'Category belongs to one/more dishes.',
  BELONGS_TO_SUBCATEGORY: 'Category belongs to one/more subCategories.',
  BELONGS_TO_ADDONS: 'Category belongs to one/more add-ons.',
  NOT_EDITABLE_CATEGORY_DISH:
    "Can't edit parent of a category, because it is belongs to some dishes.",
  NOT_EDITABLE_CATEGORY_ADDONS:
    "Can't edit parent of a category, because it is belongs to some add-ons.",
  NOT_EDITABLE_CATEGORY_SUBCATEGORY:
    "Can't edit parent of a category, because it is belongs to some subcategories.",
  NOT_EDITABLE_SUBCATEGORY_DISH:
    "Can't edit parent of a subcategory, because it is belongs to some dishes.",
  NOT_EDITABLE_SUBCATEGORY_ADDONS:
    "Can't edit parent of a subcategory, because it is belongs to some add-ons.",
  CATEGORY_NOT_FOUND: 'Category not found.',
};

const genericMessages = {
  REQUEST_SUCCESS: 'Request successful.',
  REQUEST_FAILED: 'Request failed.',
  NOT_FOUND: 'The requested resource was not found.',
};

const otpMessages = {
  MAX_OTP_RESENDS: 'Maximum OTP resends reached. Please try again later.',
  MAX_OTP_ATTEMPTS: 'Maximum OTP attempts reached. Please request a new OTP.',
  OTP_EXPIRED: 'OTP has expired.',
  INCORRECT_OTP: 'Incorrect OTP.',
  OTP_SUCCESS: 'OTP sent successfully, please check your email',
};

module.exports = {
  authMessage,
  genericMessages,
  dishMessages,
  otpMessages,
  ingredientMessages,
  allergensMessages,
  categoryMessages,
  addOnMessages,
};
