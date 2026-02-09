import User from "../models/User.js";

export const getUserDetails = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      plan: user.plan || "Free Plan",
      isVerified: user.isVerified
    });
  } catch (error) {
    console.error("getUserDetails error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteUser = async (req, res) => {

    try {
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("deleteUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}