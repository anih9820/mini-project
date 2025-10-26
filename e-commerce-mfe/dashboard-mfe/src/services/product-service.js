export const approveProduct = async (productId) => {
  try {
    const response = await syscoShopBff.post(`/products/${productId}/approve`);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const rejectProduct = async (productId) => {
  try {
    const response = await syscoShopBff.post(`/products/${productId}/reject`);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};
import { syscoShopBff } from "../apiInstances/apiInstance";
import log from "loglevel";

const handleError = (error) => {
  if (error?.response) {
    log.error("Server Error:", error.response.data);
    throw new Error(
      error.response.data?.message || "An error occurred on the server."
    );
  } else if (error?.request) {
    log.error("Network Error:", error.request);
    throw new Error("Unable to connect to the server.");
  } else {
    log.error("Error:", error?.message);
    throw new Error(error?.message || "Unexpected error.");
  }
};

export const getAllProducts = async (page = 0, size = 10) => {
  try {
    const response = await syscoShopBff.get("/products", {
      params: { page, size },
    });
    const data = response?.data;

    const content = Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data)
      ? data
      : [];

    const totalPages = Number.isFinite(data?.totalPages) ? data.totalPages : 1;

    return { content, totalPages };
  } catch (error) {
    handleError(error);
  }
};

export const submitChangeRequests = async (product, productId) => {
  try {
    const response = await syscoShopBff.put(`/products/${productId}`, product);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await syscoShopBff.post("/products", product);
    return response?.data;
  } catch (error) {
    handleError(error);
  }
};

export const downloadPendingProducts = async () => {
  try {
    const response = await syscoShopBff.get("/products/pending/download", {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pending_products.csv";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    handleError(error);
  }
};

export const uploadApprovedProducts = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await syscoShopBff.post("/products/approve", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response?.data;
  } catch (error) {
    handleError(error);
  }
};
