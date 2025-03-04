import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// **Registro de usuario**
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, first_name, last_name, email, phone, password } = req.body;

        if (!username || !email || !password || !first_name || !last_name || !phone) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'El nombre de usuario ya existe' });
            return;
        }

        const newUser = new User({ username, first_name, last_name, phone, email, password });
        await newUser.save();
        res.cookie('id_user', newUser._id, { maxAge: 3600000 });

        res.status(201).json({ message: 'Usuario registrado correctamente' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
        return;
    }
};

// **Login de usuario**
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' });
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        // **Generar token**
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        // **Guardar token en cookies**
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.cookie('id_user', user._id, { maxAge: 3600000 });

        res.json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// **Verificar sesión**
export const checkSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'No hay sesión activa' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'Sesión válida', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Sesión expirada o inválida' });
    }
};

// **Logout**
export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Sesión cerrada correctamente' });
};
