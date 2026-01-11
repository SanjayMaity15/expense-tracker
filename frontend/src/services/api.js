import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token automatically to all requests
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token"); // your stored JWT
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;
