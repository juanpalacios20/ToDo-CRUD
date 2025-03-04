import { Request, Response } from 'express';
import User from '../models/User';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.userId;
        const tasks = await Task.find({ user: userId }); 
        if (tasks.length === 0) {
            res.status(404).json({ message: 'Tasks not found' });
            return;
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = (req as any).user.userId;;
        const task = await Task
            .findById(id)
            .populate('user', 'username');
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = (req as any).user.userId;
        const { title, description} = req.body;
        if (!title || !description || !user_id) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const userFound = await User.findById(user_id);
        if (!userFound) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log(userFound);
        const userFound_id = userFound._id;
        const newTask = new Task({ title, description, user: userFound_id, state: false });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = (req as any).user.userId;
        const { id } = req.params;
        const { title, description } = req.body;
        const taskUpdate = await Task.findOneAndUpdate(
            { _id: id, user: userId }, // Solo actualiza si la tarea pertenece al usuario
            { title, description },
            { new: true }
        );
        if (!taskUpdate) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(taskUpdate);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user.userId;
        const { id } = req.params;

        const task = await Task.findOneAndDelete({ _id: id, user: userId });

        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

export const completeTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = (req as any).user.userId;
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, user: user_id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        task.state = true;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

export const incompleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = (req as any).user.userId;
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, user: user_id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        task.state = false;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};