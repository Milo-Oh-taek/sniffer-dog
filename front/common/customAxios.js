import axios from "axios";
import { backUrl } from "../config/config";

const axiosInstance = axios.create({
    // // baseURL: process.env.NEXT_PUBLIC_DOMAIN,
    // headers: { 
    //     'content-Type' : 'application/json',
    //     'Accept': '*/*',
    // }
});
axiosInstance.defaults.baseURL=backUrl;
axiosInstance.defaults.withCredentials = true;


export default axiosInstance;
