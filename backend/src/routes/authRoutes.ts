import express from 'express';
import { register, login, checkSession, logout } from '../controllers/authController';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/check-session', checkSession);
authRoutes.post('/logout', logout);

export default authRoutes;
