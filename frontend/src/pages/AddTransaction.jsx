import { useState } from "react";
import { addTransaction } from "../services/transactionService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddTransaction = () => {
	const [formData, setFormData] = useState({
		type: "expense",
		category: "",
		amount: "",
		description: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

    const handleSubmit = async (e) => {
        console.log(formData);
        
		e.preventDefault();

		if (!formData.category || !formData.amount) {
			toast.error("Category and amount are required");
			return;
		}

		try {
			await addTransaction(formData);
			toast.success("Transaction added successfully");
			navigate("/dashboard");
		} catch (error) {
			toast.error("Failed to add transaction");
		}
	};

	return (
		<>
			<Navbar />
			<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
				<h2 className="text-xl font-bold mb-4">Add Transaction</h2>

				<form onSubmit={handleSubmit}>
					{/* Type */}
					<select
						name="type"
						className="w-full p-2 border rounded mb-3"
						onChange={handleChange}
					>
						<option value="expense">Expense</option>
						<option value="income">Income</option>
					</select>

					{/* Category */}
					<input
						type="text"
						name="category"
						placeholder="Category (Food, Salary...)"
						className="w-full p-2 border rounded mb-3"
						onChange={handleChange}
					/>

					{/* Amount */}
					<input
						type="number"
						name="amount"
						placeholder="Amount"
						className="w-full p-2 border rounded mb-3"
						onChange={handleChange}
					/>

					{/* Description */}
					<textarea
						name="description"
						placeholder="Description (optional)"
						className="w-full p-2 border rounded mb-4"
						onChange={handleChange}
					/>

					<button
						type="submit"
						className="w-full px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
					>
						Add Transaction
					</button>
				</form>
			</div>
		</>
	);
};

export default AddTransaction;
