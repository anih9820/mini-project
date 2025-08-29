import axios from "axios";
import config from "../config.json";

export const syscoShopBff = axios.create({
  baseURL: "http://localhost:5000/bff/api/v1",
  withCredentials: false,
});

export const ProductApi = axios.create({
  baseURL: `${config.productServiceBaseURL}/api/v1/products`,
  withCredentials: false,
});

export const CartApi = axios.create({
  baseURL: `${config.cartServiceBaseURL}/api/v1/cart`,
  withCredentials: false,
});


const applyTokenInterceptor = (apiClient) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

applyTokenInterceptor(syscoShopBff);
applyTokenInterceptor(ProductApi);
applyTokenInterceptor(CartApi);


const mfeApiInstances = {
  syscoShopBff,
  ProductApi,
  CartApi,
};

export default mfeApiInstances;
