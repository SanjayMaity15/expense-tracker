import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import Navbar from "../components/Navbar";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const { data } = await getUserProfile();
				setUser(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<p className="text-lg font-semibold">Loading profile...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />

			<div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
				<h2 className="text-2xl font-bold text-gray-600 mb-6 text-center">
					My Profile
				</h2>

				<div className="space-y-4">
					<div>
						<label className="text-gray-500 text-sm">Name</label>
						<p className="text-lg font-medium">{user?.name}</p>
					</div>

					<div>
						<label className="text-gray-500 text-sm">Email</label>
						<p className="text-lg font-medium">{user?.email}</p>
					</div>
				</div>

				<button
					onClick={() => navigate("/edit-profile")}
					className="w-full mt-4 px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
				>
					Edit Profile
				</button>
			</div>
		</div>
	);
};

export default Profile;
