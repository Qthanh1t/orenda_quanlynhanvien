import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://68df56d2898434f413576980.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;
