import { useState } from "react";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			toast.error("All fields are required");
			return;
		}

		try {
			setLoading(true)

			const res = await loginUser(formData);

			localStorage.setItem("token", res.data.token);
			toast.success("Login successful");

			setLoading(false)
			navigate("/");
		} catch (error) {
			setLoading(false)
			toast.error(error.response?.data?.message || "Invalid credentials");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-blue-50">
			<form
				onSubmit={handleSubmit}
				className="bg-white/80 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-2xl w-96"
			>
				<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
					Login
				</h2>

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
					{loading ? "Please wait..." : "Login"}
				</button>

				<p className="text-center mt-4 text-sm text-gray-600">
					Don’t have an account?{" "}
					<Link
						to="/register"
						className="text-green-600 font-medium hover:underline"
					>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
