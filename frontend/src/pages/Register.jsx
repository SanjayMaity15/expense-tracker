import { useState } from "react";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.password) {
			toast.error("All fields are required");
			return;
		}

		if (formData.password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}

		try {
			setLoading(true)
			await registerUser(formData);
			toast.success("Registration successful. Please login.");
			setLoading(false)
			navigate("/login");
		} catch (error) {
			setLoading(false)
			toast.error(error.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white/80 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-2xl w-96"
			>
				<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Register
				</h2>

				<input
					type="text"
					name="name"
					placeholder="Full Name"
					className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
					onChange={handleChange}
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full p-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
					onChange={handleChange}
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					className="w-full p-3 mb-5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
					onChange={handleChange}
				/>

				<button
					type="submit"
					className="w-full px-5 py-3 rounded-lg bg-linear-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
				>
					{loading ? "Please wait..." : "Register"}
				</button>

				<p className="text-center mt-4 text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-green-600 font-medium hover:underline"
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
