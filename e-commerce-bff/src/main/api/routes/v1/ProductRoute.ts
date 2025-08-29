import express from "express";
import ProductController from "../../controllers/v1/ProductController";
import { authenticate } from "../../../middleware/authMiddleware";
import { authorizeRole } from "../../../middleware/authorizeRole";


const router = express.Router();

router.get(`/products`, ProductController.getApprovedProducts);
router.get(`/products/:id`, ProductController.getProductById);

router.get(
  `/products/pending`,
  authenticate,
  authorizeRole("ADMIN"),
  ProductController.getPendingProducts
);
router.patch(
  `/products/:id/status`,
  authenticate,
  authorizeRole("ADMIN"),
  ProductController.updateProductStatus
);
router.patch(
  `/products/:id/price`,
  authenticate,
  authorizeRole("ADMIN"),
  ProductController.updateProductPrice
);
router.delete(
  `/products/:id`,
  authenticate,
  authorizeRole("ADMIN"),
  ProductController.deleteProduct
);

router.post(
  `/products`,
  authenticate,
  authorizeRole("VENDOR", "ADMIN"),
  ProductController.createProduct
);
router.put(
  `/products/:id`,
  authenticate,
  authorizeRole("VENDOR", "ADMIN"),
  ProductController.updateProduct
);

const ProductRoute = { router };
export default ProductRoute;
