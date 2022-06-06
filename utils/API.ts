import axios from "axios";

const base_url = `https://shop-next-shariflo.vercel.app/api/`


// get all products
export const getAllProducts = ()=> axios.get(`${base_url}/products`)
// get product by id
export const getProductById = ({id}:{id:string})=> axios.get(`${base_url}/products/${id}`)

// signup
export const signUpApi = (data:{})=> axios.post(`${base_url}/signup`,data)
export const loginApi = (data:{})=> axios.post(`${base_url}/login`,data)
export const generateTokenApi = ()=> axios.get(`${base_url}/accessToken`)