import axios from 'axios'
const API = axios.create({
    baseURL: "https://freelance-platform-ki5q.onrender.com/api",
    withCredentials: true,  
});

export default API