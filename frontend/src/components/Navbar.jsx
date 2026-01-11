import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";

const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	useEffect(() => {
		const fetchUserDetailsForDp = async () => {
			try {
				const res = await getUserProfile();
				setUser(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserDetailsForDp();
	}, []);

	console.log(user);

	return (
		<nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
			<Link
				className="font-bold text-3xl text-blue-600 "
				to={"/dashboard"}
			>
				Fin<span className="text-gray-600">Track</span>
			</Link>

			<div className="flex gap-4 items-center">
				<div
					className="px-3
						py-0.5
						bg-cyan-100

						aspect-square flex justify-center items-center
						text-cyan-700
						border
						border-cyan-600
						hover:bg-cyan-200
						transition
						font-medium rounded-full"
					onClick={() => navigate("/profile")}
				>
					<p className="font-bold text-2xl">
						<span>{user?.name?.split("")[0].toUpperCase()}</span>
					</p>
				</div>
				<button
					onClick={handleLogout}
					className="px-5 py-2 rounded-lg
                                bg-red-100 text-red-700 border border-red-600
                                hover:bg-red-200 transition font-medium"
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
