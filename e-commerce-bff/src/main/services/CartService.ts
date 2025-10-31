import constants from "../constants/generalConstants";
import apiInstances from "../api/apiInstances/apiInstance";
import logger from "../config/logger";

/**
 * Create a new cart item
 */
const addToCart = async (payload: any) => {
  try {
    // Fetch product details from product microservice
    const productId = payload.productId;
    let price = 0;
    if (productId) {
      try {
        const productResp =
          await apiInstances.productServiceApiInstance.request({
            url: `/products/${productId}`,
            method: constants.HTTP_METHODS.GET,
          });
        price = productResp?.data?.price || 0;
      } catch (err) {
        logger.error(
          `Failed to fetch product price for productId ${productId}:`,
          err?.response?.data || err
        );
      }
    }
    const cartPayload = { ...payload, price };
    const response = await apiInstances.cartServiceApiInstance.request({
      url: `/cart`,
      method: constants.HTTP_METHODS.POST,
      data: cartPayload,
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
/**
 * Get all cart items for a user (enriched with product info)
 */
const getCartItemsByUser = async (userId) => {
  try {
    // 1️⃣ Fetch cart items from the Cart microservice
    const cartResponse = await apiInstances.cartServiceApiInstance.request({
      url: `/cart/${userId}`,
      method: constants.HTTP_METHODS.GET,
    });

    const cartItems = cartResponse?.data || [];

    // 2️⃣ For each cart item, fetch product details
    const enrichedItems = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const productResp =
            await apiInstances.productServiceApiInstance.request({
              url: `/products/${item.productId}`,
              method: constants.HTTP_METHODS.GET,
            });

          const product = productResp?.data || {};

          // 3️⃣ Merge cart data + product info
          return {
            ...item,
            name: product.name || "Unnamed Product",
            imageUrl: product.image || "https://via.placeholder.com/150?text=No+Image",
            price: product.price ?? item.price ?? 0,
          };
        } catch (err) {
          // Even if product fetch fails, return cart item safely
          logger.error(`Failed to enrich product ${item.productId}:`, err);
          return { ...item, name: "Unnamed Product", imageUrl: "", price: item.price ?? 0 };
        }
      })
    );

    return enrichedItems;
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
