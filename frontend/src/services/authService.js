import API from "./api";

// Register user
export const registerUser = (userData) => {
	return API.post("/auth/register", userData);
};

// Login user
export const loginUser = (userData) => {
	return API.post("/auth/login", userData);
};
