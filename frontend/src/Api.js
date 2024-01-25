import axios from "axios";

export const BASE_URL = "http://localhost:8000/posts";
const api = axios.create({
    baseURL: BASE_URL,
});

export const allPosts = () => api.get("/");
export const getPostId = (id) => api.get(`/${id}`);
export const createPost = (data) => api.post("/", data);
export const updatePost = (id, data) => api.put(`/${id}`, data);
export const deletePost = (id) => api.delete(`/${id}`);
