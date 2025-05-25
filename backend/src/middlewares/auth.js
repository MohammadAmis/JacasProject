// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

/**
 * protectRoute
 * — Checks for a “Bearer <token>” header (or cookie!)
 * — Verifies the token against your JWT_SECRET
 * — Attaches the decoded payload to req.user
 * — Calls next() if valid, or returns a 401 if not
 */
export function protectRoute(req, res, next) {
  // 1. Grab the token (from header or cookie)
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];

  // 2. Verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;           // e.g. { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * adminOnly
 * — Assumes protectRoute has already populated req.user
 * — Checks req.user.role === 'admin'
 * — Returns 403 if not, otherwise next()
 */
export function adminOnly(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
}
