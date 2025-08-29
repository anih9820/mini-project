import { ProductApi } from "../apiInstances/apiInstances";
import log from "loglevel";

ProductApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getApprovedProducts = async () => {
  try {
    const response = await ProductApi.get("");
    return response.data;
  } catch (error) {
    log.error("Error fetching approved products:", error);
    throw error;
  }
};

export const getPendingProducts = async () => {
  try {
    const response = await ProductApi.get("/pending");
    return response.data;
  } catch (error) {
    log.error("Error fetching pending products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await ProductApi.get(`/${productId}`);
    return response.data;
  } catch (error) {
    log.error(`Error fetching product by ID (${productId}):`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await ProductApi.post("", productData);
    return response.data;
  } catch (error) {
    log.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await ProductApi.put(`/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    log.error(`Error updating product (${productId}):`, error);
    throw error;
  }
};

export const updateProductStatus = async (productId, status) => {
  try {
    const response = await ProductApi.patch(`/${productId}/status`, null, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    log.error(`Error updating product status (${productId}):`, error);
    throw error;
  }
};

export const updateProductPrice = async (productId, price) => {
  try {
    const response = await ProductApi.patch(`/${productId}/price`, null, {
      params: { price },
    });
    return response.data;
  } catch (error) {
    log.error(`Error updating product price (${productId}):`, error);
    throw error;
  }
};


export const deleteProduct = async (productId) => {
  try {
    const response = await ProductApi.delete(`/${productId}`);
    return response.data;
  } catch (error) {
    log.error(`Error deleting product (${productId}):`, error);
    throw error;
  }
};
