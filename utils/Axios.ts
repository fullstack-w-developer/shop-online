import axios from 'axios';
const base_url = `https://shop-next-shariflo.vercel.app/api/`


const app = axios.create({
    baseURL: base_url,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default app;