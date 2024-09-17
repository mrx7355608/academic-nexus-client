import axios from "axios";

const NODE_ENV = import.meta.env.VITE_NODE_ENV;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: NODE_ENV === "production" ? "" : BASE_URL,
    validateStatus: (status) => (status >= 500 ? false : true),
});

export default axiosInstance;
