import axios from "axios";
import app from "./Axios";

// get all products
export const getAllProducts = () => app.get(`/products`);
// get product by id
export const getProductById = ({ id }: { id: string }) =>
  app.get(`/products/${id}`);

// signup
export const signUpApi = (data: {}) =>
  app.post(`/signup`, data);
export const loginApi = (data: {}) =>
  app.post(`/login`, data);
export const generateTokenApi = () =>
  app.get(`/accessToken`);
