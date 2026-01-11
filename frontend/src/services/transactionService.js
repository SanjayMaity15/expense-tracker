import API from "./api";

// Add income or expense
export const addTransaction = (data) => {
	return API.post("/transactions", data);
};

// Get all transactions
export const getTransactions = () => {
	return API.get("/transactions");
};



export const deleteTransaction = (id) => {
	return API.delete(`/transactions/${id}`);
};
