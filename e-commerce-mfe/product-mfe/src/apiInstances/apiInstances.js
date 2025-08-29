import axios from "axios";
import config from "../config.json";

export const ProductApi = axios.create({
  baseURL: `http://localhost:5000/bff/api/v1/products`,
  withCredentials: false,
});

export const CartApi = axios.create({
  baseURL: `http://localhost:5000/bff/api/v1/cart`,
  withCredentials: false,
});

const mfeApiInstances = {
  ProductApi,
  CartApi,
};

export default mfeApiInstances;
