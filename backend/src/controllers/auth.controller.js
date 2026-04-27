import generateToken from "../utils/generateToken.js";

const FRONTEND_URL = process.env.FRONTEND_URL;

export const googleAuthSuccess = async (req, res) => {
  try {
    if (!FRONTEND_URL) {
      throw new Error("FRONTEND_URL is not defined");
    }

    const user = req.user;

    if (!user || !user._id) {
      return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
    }

    const token = generateToken(user._id);

    if (!token) {
      return res.redirect(`${FRONTEND_URL}/login?error=token_failed`);
    }

    const safeUser = {
      _id: user._id,
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || "",
      isActive: !!user.isActive,
      isVerified: !!user.isVerified,
    };

    const encodedUser = encodeURIComponent(JSON.stringify(safeUser));

    const redirectURL =
      `${FRONTEND_URL}/auth-success?token=${token}&user=${encodedUser}`;

    return res.redirect(redirectURL);

  } catch (error) {
    console.error("Google Auth Success Error:", error);

    const fallbackURL = FRONTEND_URL || "";

    return res.redirect(`${fallbackURL}/login?error=server_error`);
  }
};