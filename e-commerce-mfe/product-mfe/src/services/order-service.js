import axios from "axios";
import log from "loglevel";
import { CartApi } from "../apiInstances/apiInstances";

CartApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const addToCart = async (payload) => {
  try {
    const response = await CartApi.post("/cart", payload);
    return response.data;
  } catch (error) {
    log.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCartByUserId = async (userId) => {
  try {
    const response = await CartApi.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    log.error(`Error fetching cart for user ${userId}:`, error);
    throw error;
  }
};

export const updateCartItem = async (cartItemId, updatedItem) => {
  try {
    const response = await CartApi.put(`/${cartItemId}`, updatedItem);
    return response.data;
  } catch (error) {
    log.error(`Error updating cart item ${cartItemId}:`, error);
    throw error;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    await CartApi.delete(`/${cartItemId}`);
  } catch (error) {
    log.error(`Error deleting cart item ${cartItemId}:`, error);
    throw error;
  }
};

export const clearCartByUserId = async (userId) => {
  try {
    await CartApi.delete(`/user/${userId}`);
  } catch (error) {
    log.error(`Error clearing cart for user ${userId}:`, error);
    throw error;
  }
};
