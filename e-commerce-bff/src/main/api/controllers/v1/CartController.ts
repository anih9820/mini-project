import { Request, Response } from "express";
import constants from "../../../constants/generalConstants";
import logger from "../../../config/logger";
import SharedResponses from "../../../shared/sharedResponses";
import CartService from "../../../services/CartService";

/**
 * Add a new item to the cart
 */
const addToCart = async (req: Request, res: Response) => {
  try {
    const responseData = await CartService.addToCart(req.body);
    res.status(constants.HTTP_STATUS_CODES.CREATED).send(responseData);
  } catch (error: any) {
    logger.error(
      "ERROR in BFF when adding item to cart:",
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status,
      "Add to cart failed",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

/**
 * Get all cart items for a user
 */
const getCartItemsByUser = async (req: Request, res: Response) => {
  try {
    const responseData = await CartService.getCartItemsByUser(
      String(req.params.userId)
    );
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when fetching cart items for user ${req.params.userId}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status,
      `Failed to get cart for user ${req.params.userId}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

/**
 * Update an item in the cart
 */
const updateCartItem = async (req: Request, res: Response) => {
  try {
    const responseData = await CartService.updateCartItem(
      Number(req.params.cartItemId),
      req.body
    );
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when updating cart item ${req.params.cartItemId}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status,
      `Failed to update cart item ${req.params.cartItemId}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

/**
 * Delete a specific cart item
 */
const deleteCartItem = async (req: Request, res: Response) => {
  try {
    await CartService.deleteCartItem(Number(req.params.cartItemId));
    res.status(constants.HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when deleting cart item ${req.params.cartItemId}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status,
      `Failed to delete cart item ${req.params.cartItemId}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

/**
 * Clear all cart items for a user
 */
const clearCartForUser = async (req: Request, res: Response) => {
  try {
    await CartService.clearCartForUser(Number(req.params.userId));
    res.status(constants.HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when clearing cart for user ${req.params.userId}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status,
      `Failed to clear cart for user ${req.params.userId}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const CartController = {
  addToCart,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
  clearCartForUser,
};

export default CartController;
