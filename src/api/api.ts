import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8095/api",
    withCredentials: true
});