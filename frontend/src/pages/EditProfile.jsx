import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserProfile, updateUserProfile } from "../services/userService";
import Navbar from "../components/Navbar";

const EditProfile = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);

	// Load existing user data
	useEffect(() => {
		const loadProfile = async () => {
			try {
				const { data } = await getUserProfile();
				setFormData({
					name: data.name,
					email: data.email,
					password: "",
				});
			} catch (error) {
				toast.error("Failed to load profile");
			} finally {
				setLoading(false);
			}
		};
		loadProfile();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.email) {
			return toast.error("Name and Email are required");
		}

		try {
			setUpdating(true);
			await updateUserProfile(formData);
			toast.success("Profile updated successfully");
			navigate("/profile");
		} catch (error) {
			toast.error(error.response?.data?.message || "Update failed");
		} finally {
			setUpdating(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-lg font-semibold">Loading...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />

			<div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
				<h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
					Edit Profile
				</h2>

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm text-gray-600 mb-1">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg
							focus:ring-1 focus:ring-green-500 outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm text-gray-600 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg
							focus:ring-1 focus:ring-green-500 outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm text-gray-600 mb-1">
							New Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Leave blank to keep current password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-4 py-2 border rounded-lg
							focus:ring-1 focus:ring-green-500 outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={updating}
						className="w-full px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
					>
						{updating ? "Updating..." : "Update Profile"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
