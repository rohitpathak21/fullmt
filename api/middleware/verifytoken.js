import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Verifying token...");
  const token = req.cookies.token; // Check here if token is undefined or null

  if (!token) {
    console.log("No token found. Headers:", req.headers);
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Token not valid" });
    }
    req.userId = payload.id;
    next();
  });
};
