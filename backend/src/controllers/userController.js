import User from "../models/User.js";
import bcrypt from "bcryptjs";

// @desc    Get logged-in user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");

		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// @desc    Update logged-in user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update fields
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;

		// Update password only if provided
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(req.body.password, salt);
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			message: "Profile updated successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
