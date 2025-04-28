import jwt from 'jsonwebtoken';

export const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access forbidden: wrong role' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
