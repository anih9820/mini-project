import constants from "../constants/generalConstants";
import apiInstances from "../api/apiInstances/apiInstance";
import logger from "../config/logger";

/**
 * Create a new cart item
 */
const addToCart = async (payload: any) => {
  try {
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/cart`,
      method: constants.HTTP_METHODS.POST,
      data: payload,
    });

    return response?.data;
  } catch (error) {
    logger.error(
      "ERROR in BFF when adding item to cart:",
      error.response?.data || error
    );
    throw error;
  }
};

/**
 * Get all cart items for a user
 */
const getCartItemsByUser = async (userId: string) => {
  try {
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/cart/${userId}`,
      method: constants.HTTP_METHODS.GET,
    });

    return response?.data;
  } catch (error) {
    logger.error(
      `ERROR in BFF when fetching cart items for user ${userId}:`,
      error.response?.data || error
    );
    throw error;
  }
};

/**
 * Update cart item by cart item ID
 */
const updateCartItem = async (cartItemId: number, payload: any) => {
  try {
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/cart/${cartItemId}`,
      method: constants.HTTP_METHODS.PUT,
      data: payload,
    });

    return response?.data;
  } catch (error) {
    logger.error(
      `ERROR in BFF when updating cart item ${cartItemId}:`,
      error.response?.data || error
    );
    throw error;
  }
};

/**
 * Delete a specific cart item
 */
const deleteCartItem = async (cartItemId: number) => {
  try {
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/cart/${cartItemId}`,
      method: constants.HTTP_METHODS.DELETE,
    });

    return response?.data;
  } catch (error) {
    logger.error(
      `ERROR in BFF when deleting cart item ${cartItemId}:`,
      error.response?.data || error
    );
    throw error;
  }
};

/**
 * Clear cart for a user
 */
const clearCartForUser = async (userId: number) => {
  try {
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/user/${userId}`,
      method: constants.HTTP_METHODS.DELETE,
    });

    return response?.data;
  } catch (error) {
    logger.error(
      `ERROR in BFF when clearing cart for user ${userId}:`,
      error.response?.data || error
    );
    throw error;
  }
};

const CartService = {
  addToCart,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
  clearCartForUser,
};

export default CartService;
