import { deleteTransaction } from "../services/transactionService";
import { toast } from "react-toastify";

const TransactionCard = ({ transaction, refresh }) => {
	const isExpense = transaction.type === "expense";

	const handleDelete = async () => {
		try {
			await deleteTransaction(transaction._id);
			toast.success("Transaction deleted");
			refresh();
		} catch {
			toast.error("Failed to delete transaction");
		}
	};

	console.log(transaction);
	

	return (
		<div className="flex justify-between items-center border-b py-2">
			<div className="flex-1">
				<p className="font-medium">{transaction.category}</p>
				<p className="text-sm text-gray-500">{transaction.type}</p>
			</div>

			<div className="flex-1 flex justify-center">
				<p className="text-xs font-semibold">
					{`${new Date(
						transaction.createdAt
					).toLocaleDateString()}  - ${new Date(
						transaction.createdAt).toLocaleTimeString()
					} `}
				</p>
			</div>

			<div className="flex flex-1 items-center gap-4 justify-end">
				<p
					className={`font-bold ${
						isExpense ? "text-red-500" : "text-green-600"
					}`}
				>
					{isExpense ? "-" : "+"}₹ {transaction.amount}
				</p>

				<button
					onClick={handleDelete}
					className="text-sm px-5 py-2 rounded-lg
                                bg-red-100 text-red-700 border border-red-600
                                hover:bg-red-200 transition font-medium"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TransactionCard;
