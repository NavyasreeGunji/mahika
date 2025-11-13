import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getAllProducts = () => axios.get(API_URL);
export const getByCategory = (category) => axios.get(`${API_URL}/category/${category}`);
export const addProduct = (product) => axios.post(API_URL, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
