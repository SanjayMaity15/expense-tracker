import API from "./api";

// Get logged-in user profile
export const getUserProfile = () => {
	return API.get("/users/profile");
};

// Update logged-in user profile
export const updateUserProfile = (userData) => {
	return API.put("/users/profile", userData);
};
