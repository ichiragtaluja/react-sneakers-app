import axios from "axios";

export const getAllCategories = async () => await axios.get("/api/categories");

export const getAllProducts = async () => await axios.get("/api/products");
