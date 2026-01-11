import Transaction from "../models/Transaction.js";

// @desc  Get all transactions for logged-in user
// @route GET /api/transactions
export const getTransactions = async (req, res) => {
	try {
		const transactions = await Transaction.find({
			user: req.user._id,
		}).sort({ createdAt: -1 });
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// @desc  Add a new transaction
// @route POST /api/transactions
export const addTransaction = async (req, res) => {
	const { type, amount, category, description } = req.body;

	if (!type || !amount || !category) {
		return res
			.status(400)
			.json({ message: "Type, amount, and category required" });
	}

	try {
		const transaction = await Transaction.create({
			user: req.user._id,
			type,
			amount,
			category,
			description,
		});

		res.status(201).json(transaction);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

// @desc  Delete a transaction
// @route DELETE /api/transactions/:id
// export const deleteTransaction = async (req, res) => {
// 	try {
// 		const transaction = await Transaction.findById(req.params.id);

// 		if (!transaction) {
// 			return res.status(404).json({ message: "Transaction not found" });
// 		}

// 		// Check if user owns the transaction
// 		if (transaction.user.toString() !== req.user._id.toString()) {
// 			return res.status(401).json({ message: "Not authorized" });
// 		}

// 		await transaction.remove();
// 		res.json({ message: "Transaction removed" });
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error" });
// 	}
// };



export const deleteTransaction = async (req, res) => {
    try {
        
     
        
        const transaction = await Transaction.findById(req.params.id);
        
     
        
		if (!transaction) {
			return res.status(404).json({ message: "Transaction not found" });
		}

        
		if (transaction.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({ message: "Not authorized" });
		}

		await transaction.deleteOne();
		res.json({ message: "Transaction removed" });
	} catch (error) {
		console.error("DELETE ERROR:", error.message); // <-- log error
		res.status(500).json({ message: "Server error" });
	}
};
