const jwt = require("jsonwebtoken");
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d"; // change as needed

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/* ================= CREATE TOKEN ================= */

function createTokenforUser(user) {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: "HS256",
  });
}

/* ================= VERIFY TOKEN ================= */

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });
}

module.exports = {
  createTokenforUser,
  validateToken,
};
