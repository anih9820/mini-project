import constants from "../constants/generalConstants";
import apiInstances from "../api/apiInstances/apiInstance";
import logger from "../config/logger";

const ProductService = {
  getApprovedProducts: async () => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/approved`,
        method: constants.HTTP_METHODS.GET,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        "ERROR in BFF when fetching approved products:",
        error?.response?.data || error
      );
      throw error;
    }
  },

  getPendingProducts: async () => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/pending`,
        method: constants.HTTP_METHODS.GET,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        "ERROR in BFF when fetching pending products:",
        error?.response?.data || error
      );
      throw error;
    }
  },

  getProductById: async (id: string) => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/${id}`,
        method: constants.HTTP_METHODS.GET,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        `ERROR in BFF when fetching product by ID ${id}:`,
        error?.response?.data || error
      );
      throw error;
    }
  },

  createProduct: async (productData: any) => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products`,
        method: constants.HTTP_METHODS.POST,
        data: productData,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        "ERROR in BFF when creating product:",
        error?.response?.data || error
      );
      throw error;
    }
  },

  updateProduct: async (id: string, productData: any) => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/${id}`,
        method: constants.HTTP_METHODS.PUT,
        data: productData,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        `ERROR in BFF when updating product ${id}:`,
        error?.response?.data || error
      );
      throw error;
    }
  },

 
  updateProductStatus: async (id: string, status: string) => {
    try {
      const normalized = (status || "").toUpperCase();
      const url =
        normalized === "APPROVE"
          ? `/products/${id}/approve`
          : normalized === "REJECT"
          ? `/products/${id}/reject`
          : null;

      if (!url) {
        throw new Error("Invalid status; must be APPROVE or REJECT");
      }

      const response = await apiInstances.productServiceApiInstance.request({
        url,
        method: constants.HTTP_METHODS.PUT,
      });
      return response.data; 
    } catch (error: any) {
      logger.error(
        `ERROR in BFF when updating status for product ${id}:`,
        error?.response?.data || error
      );
      throw error;
    }
  },

  updateProductPrice: async (id: string, price: number) => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/${id}/price`,
        method: constants.HTTP_METHODS.PATCH,
        params: { price },
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        `ERROR in BFF when updating price for product ${id}:`,
        error?.response?.data || error
      );
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const response = await apiInstances.productServiceApiInstance.request({
        url: `/products/${id}`,
        method: constants.HTTP_METHODS.DELETE,
      });
      return response.data;
    } catch (error: any) {
      logger.error(
        `ERROR in BFF when deleting product ${id}:`,
        error?.response?.data || error
      );
      throw error;
    }
  },
};

export default ProductService;
