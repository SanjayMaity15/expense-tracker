import { useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [summary, setSummary] = useState({
		income: 0,
		expense: 0,
		balance: 0,
	});

	return (
		<>
			<Navbar />
			<div className="p-6 max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Dashboard</h1>

					<Link
						to="/add-transaction"
						className="px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
					>
						+ Add Transaction
					</Link>
				</div>

				{/* Summary */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<SummaryCard
						title="Income"
						color="text-green-500"
						amount={summary.income}
					/>
					<SummaryCard
						title="Expense"
						color="text-red-500"
						amount={summary.expense}
					/>
					<SummaryCard
						title="Balance"
						color="text-yellow-500"
						amount={summary.balance}
					/>
				</div>

				{/* Transactions */}
				<TransactionList setSummary={setSummary} />
			</div>
		</>
	);
};

export default Dashboard;
