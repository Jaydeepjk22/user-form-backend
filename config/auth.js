import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, "secret-key-test", { expiresIn: "7d" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "secret-key-test");
    return decoded.userId;
  } catch (error) {
    return "Invalid token";
  }
};

export { generateToken, verifyToken };
