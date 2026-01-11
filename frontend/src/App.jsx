import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTransaction from "./pages/AddTransaction";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" />} />

			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/add-transaction"
				element={
					<ProtectedRoute>
						<AddTransaction />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/edit-profile"
				element={
					<ProtectedRoute>
						<EditProfile />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
