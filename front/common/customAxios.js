import axios from "axios";

const axiosInstance = axios.create({
    // // baseURL: process.env.NEXT_PUBLIC_DOMAIN,
    // headers: { 
    //     'content-Type' : 'application/json',
    //     'Accept': '*/*',
    // }
});
axiosInstance.defaults.baseURL=process.env.NEXT_PUBLIC_DOMAIN;
axiosInstance.defaults.withCredentials = true;


export default axiosInstance;
