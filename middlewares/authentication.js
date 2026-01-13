
const { validateToken } = require("../services/authentication");

function checkAuth(cookieName = "token") {
  return function (req, res, next) {
    const token = req.cookies?.[cookieName];

    if (!token) return next();

    try {
      req.user = validateToken(token);
    } catch (err) {
      // Invalid or expired token → remove cookie
      res.clearCookie(cookieName);
    }

    next();
  };
}
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.redirect("/signin"); // or res.status(401).json({ message: "Unauthorized" })
  }
  next();
}


module.exports = {
  checkAuth,
  requireAuth,
};
