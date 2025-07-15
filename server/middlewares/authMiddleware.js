import { clerkClient } from "@clerk/express";

// Middleware to protect educator-only routes
export const protectEducator = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user session found",
      });
    }

    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata.role !== "educator") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Educator role required",
      });
    }

    // User is an educator, continue
    next();
  } catch (error) {
    console.error("ProtectEducator Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while checking educator access",
      error: error.message,
    });
  }
};
