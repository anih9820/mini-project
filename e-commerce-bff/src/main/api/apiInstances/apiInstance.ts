import axios from "axios";
// @ts-ignore
import config from "../../../config.json";

export const productServiceApiInstance = axios.create({
  baseURL: `${config.productServiceBaseURL}/api/v1`,
  withCredentials: false,
});

export const cartServiceApiInstance = axios.create({
  baseURL: `${config.cartServiceBaseURL}/api/v1`,
  withCredentials: false,
});

const apiInstances = {
  productServiceApiInstance,
  cartServiceApiInstance,
};

export default apiInstances;
