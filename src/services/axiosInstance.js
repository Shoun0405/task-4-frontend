import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'https://auth-backend-2014.onrender.com/api/auth'
}) 

export default axiosInstance