const jwt = require("jsonwebtoken");

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

module.exports = { generateToken, verifyToken };
