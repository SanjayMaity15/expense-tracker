import { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionService";
import TransactionCard from "./TransactionCard";
import { toast } from "react-toastify";

const TransactionList = ({ setSummary }) => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		fetchTransactions();
	}, []);

	const fetchTransactions = async () => {
		try {
			const res = await getTransactions();
			setTransactions(res.data);

			calculateSummary(res.data);
		} catch (error) {
			toast.error("Failed to load transactions");
		}
	};

	const calculateSummary = (data) => {
		let income = 0;
		let expense = 0;

		data.forEach((txn) => {
			if (txn.type === "income") {
				income += txn.amount;
			} else {
				expense += txn.amount;
			}
		});

		setSummary({
			income,
			expense,
			balance: income - expense,
		});
	};

	return (
		<div className="bg-white p-4 rounded shadow">
			<h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

			{transactions.length === 0 ? (
				<p className="text-gray-500">No transactions found</p>
			) : (
				transactions.map((txn) => (
					<TransactionCard
						key={txn._id}
						transaction={txn}
						refresh={fetchTransactions}
					/>
				))
			)}
		</div>
	);
};

export default TransactionList;
