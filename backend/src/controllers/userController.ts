import User from "../models/User";
import { Request, Response } from "express";

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404).json({ message: "Users not found" });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Obtener un usuario por ID con validación
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};


// Crear usuario con validación
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, first_name, last_name, email, phone, password, state } = req.body;

    if (!username || !email || !password || !first_name || !last_name || !phone) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newUser = new User({ username, first_name, last_name, email, phone, password, state: state ?? true });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Actualizar usuario por ID con validación
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userUpdate) 
      res.status(404).json({ message: "User not found" });

    res.status(200).json(userUpdate);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

// Eliminación lógica del usuario (desactivar)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) 
      res.status(404).json({ message: "User not found" });

    user.state = false;
    await user.save();

    res.status(204).send(); // No devuelve contenido, solo indica éxito
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
  }
};

const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;