import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Middleware para verificar si el usuario está autenticado
export const authenticateUser = (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {
        const token = req.cookies.token; // Extraer el token de la cookie

        if (!token) {
            res.status(401).json({ message: 'Acceso no autorizado. Inicia sesión.' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET); // Verificar el token
        (req as any).user = decoded; // Guardar el usuario en la solicitud

        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(401).json({ message: 'Sesión expirada o token inválido.' });
        return;
    }
};
