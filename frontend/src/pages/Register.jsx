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
			await registerUser(formData);
			toast.success("Registration successful. Please login.");
			navigate("/login");
		} catch (error) {
			toast.error(error.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded-lg shadow-md w-96"
			>
				<h2 className="text-2xl font-bold mb-4 text-center">
					Register
				</h2>

				<input
					type="text"
					name="name"
					placeholder="Full Name"
					className="w-full p-2 mb-3 border rounded"
					onChange={handleChange}
				/>

				<input
					type="email"
					name="email"
					placeholder="Email"
					className="w-full p-2 mb-3 border rounded"
					onChange={handleChange}
				/>

				<input
					type="password"
					name="password"
					placeholder="Password"
					className="w-full p-2 mb-4 border rounded"
					onChange={handleChange}
				/>

				<button
					type="submit"
					className="w-full px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
				>
					Register
				</button>

				<p className="text-center mt-3 text-sm">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-600">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
