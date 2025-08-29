import express from "express";
import CartController from "../../controllers/v1/CartController";

const router = express.Router();

router.post(`/cart`, CartController.addToCart);
router.get(`/cart/:userId`, CartController.getCartItemsByUser);
router.put(`/cart/:cartItemId`, CartController.updateCartItem);
router.delete(`/cart/:cartItemId`, CartController.deleteCartItem);
router.delete(`/user/:userId`, CartController.clearCartForUser);

const CartRoute = {
  router,
};

export default CartRoute;
