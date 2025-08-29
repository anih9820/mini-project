import { syscoShopBff } from "../apiInstances/apiInstance";
import log from "loglevel";

const handleError = (error: any) => {
  if (error.response) {
    log.error("Server Error:", error.response.data);2
    throw new Error(
      error.response.data?.message || "An error occurred on the server."
    );
  } else if (error.request) {
    log.error("Network Error:", error.request);
    throw new Error("Unable to connect to the server.");
  } else {
    log.error("Error:", error.message);
    throw new Error(error.message || "Unexpected error.");
  }
};

export const getAllProducts = async (page = 0, size = 10) => {
  try {
    const response = await syscoShopBff.get("/products", {
      params: { page, size },
    });
    const content = Array.isArray(response.data?.content)
      ? response.data.content
      : Array.isArray(response.data)
      ? response.data
      : [];
    return { content, totalPages: response.data?.totalPages || 1 };
  } catch (error) {
    handleError(error);
  }
};

export const submitChangeRequests = async (product: any, productId: string) => {
  try {
    const response = await syscoShopBff.put(`/products/${productId}`, product); 
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await syscoShopBff.post("/products", product);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const downloadPendingProducts = async () => {
  try {
    const response = await syscoShopBff.get("/products/pending/download", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "pending_products.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
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

    return response.data;
  } catch (error) {
    handleError(error);
  }
};
