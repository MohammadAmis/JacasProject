// user.routes.js
import express from 'express';
import { registerUser, loginUser, logoutUser, getCurrentUser } from '../controllers/auth.controllers.js';
import { fetchProduct } from '../controllers/user.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protectRoute, getCurrentUser);
router.get('/fetch-products',fetchProduct)

export default router;
