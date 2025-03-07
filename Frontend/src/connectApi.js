import axios from 'axios'
const API = axios.create({
    baseURL: "https://freelancebackend-gamma.vercel.app/api",
    withCredentials: true,  
});

export default API