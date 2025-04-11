// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

exports.protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Access Denied" });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid Token" });
    }
  };
};
