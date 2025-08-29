import { RequestHandler } from "express";
import constants from "../../../constants/generalConstants";
import logger from "../../../config/logger";
import SharedResponses from "../../../shared/sharedResponses";
import ProductService from "../../../services/ProductService";

const getApprovedProducts: RequestHandler = async (_req, res) => {
  try {
    const responseData = await ProductService.getApprovedProducts();
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send({
      content: Array.isArray(responseData) ? responseData : [],
      totalPages: 1,
    });
  } catch (error: any) {
    logger.error(
      "ERROR in BFF when fetching approved products:",
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      "Failed to fetch approved products",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const getPendingProducts: RequestHandler = async (_req, res) => {
  try {
    const responseData = await ProductService.getPendingProducts();
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      "ERROR in BFF when fetching pending products:",
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      "Failed to fetch pending products",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const getProductById: RequestHandler = async (req, res) => {
  try {
    const responseData = await ProductService.getProductById(req.params.id);
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when fetching product ${req.params.id}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      `Failed to fetch product ${req.params.id}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const createProduct: RequestHandler = async (req, res) => {
  try {
    const responseData = await ProductService.createProduct(req.body);
    res.status(constants.HTTP_STATUS_CODES.CREATED).send(responseData);
  } catch (error: any) {
    logger.error(
      "ERROR in BFF when creating product:",
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      "Product creation failed",
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const updateProduct: RequestHandler = async (req, res) => {
  try {
    const responseData = await ProductService.updateProduct(
      req.params.id,
      req.body
    );
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when updating product ${req.params.id}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      `Failed to update product ${req.params.id}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const updateProductStatus: RequestHandler = async (req, res) => {
  try {
    const statusParam = req.query.status?.toString().toUpperCase();
    if (!["APPROVE", "REJECT"].includes(statusParam || "")) {
      SharedResponses.ErrorResponse(
        res,
        constants.HTTP_STATUS_CODES.BAD_REQUEST,
        "Invalid status value",
        "Status must be 'APPROVE' or 'REJECT'"
      );
      return;
    }

    await ProductService.updateProductStatus(req.params.id, statusParam);
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send({ success: true });
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when updating product status ${req.params.id}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      `Failed to update product status ${req.params.id}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const updateProductPrice: RequestHandler = async (req, res) => {
  try {
    const price = parseFloat(req.query.price as string);
    if (isNaN(price)) {
      SharedResponses.ErrorResponse(
        res,
        constants.HTTP_STATUS_CODES.BAD_REQUEST,
        "Invalid price value",
        "Price must be a number"
      );
      return;
    }

    const responseData = await ProductService.updateProductPrice(
      req.params.id,
      price
    );
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).send(responseData);
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when updating product price ${req.params.id}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      `Failed to update product price ${req.params.id}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const deleteProduct: RequestHandler = async (req, res) => {
  try {
    await ProductService.deleteProduct(req.params.id);
    res.status(constants.HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error: any) {
    logger.error(
      `ERROR in BFF when deleting product ${req.params.id}:`,
      error?.response?.data || error
    );
    SharedResponses.ErrorResponse(
      res,
      error?.response?.status || constants.HTTP_STATUS_CODES.ERROR,
      `Failed to delete product ${req.params.id}`,
      error?.response?.data?.message || "Something went wrong"
    );
  }
};

const ProductController = {
  getApprovedProducts,
  getPendingProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  updateProductPrice,
  deleteProduct,
};

export default ProductController;
