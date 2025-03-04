import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { authenticateUser } from '../middleware/authMiddleware';

const taskRoutes = Router();

taskRoutes.get('/', authenticateUser ,taskController.getTasks);
taskRoutes.get('/:id', authenticateUser ,taskController.getTask);
taskRoutes.post('/', authenticateUser ,taskController.createTask);
taskRoutes.patch('/:id', authenticateUser ,taskController.updateTask);
taskRoutes.delete('/:id', authenticateUser ,taskController.deleteTask);
taskRoutes.patch('/complete/:id', authenticateUser ,taskController.completeTask);
taskRoutes.patch('/incomplete/:id', authenticateUser ,taskController.incompleteTask);

export default taskRoutes;