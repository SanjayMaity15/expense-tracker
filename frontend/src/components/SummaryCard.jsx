const SummaryCard = ({ title, amount, color }) => {
	return (
		<div className="bg-white p-4 rounded shadow">
			<h3 className="text-gray-500">{title}</h3>
			<p className={`text-2xl font-bold mt-2 ${color	}`}>₹ {amount}</p>
		</div>
	);
};

export default SummaryCard;
