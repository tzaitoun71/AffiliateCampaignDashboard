import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com/";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// Fetch single product by ID
export const fetchProductById = async (id: number) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}

// Fetch product categories
export const fetchCategories = async () => {
    try {
        const response = await api.get("/products/categories");
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []
    }
}

// Fetch single product by ID
export const fetchProductsByCategory  = async (category: string) => {
    try {
        const response = await api.get(`/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching category ${category}:`, error);
        return [];
    }
}