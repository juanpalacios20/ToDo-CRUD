import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.get('/', taskController.getTasks);
taskRoutes.get('/:id', taskController.getTask);
taskRoutes.post('/', taskController.createTask);
taskRoutes.patch('/:id', taskController.updateTask);
taskRoutes.delete('/:id', taskController.deleteTask);
taskRoutes.patch('/complete/:id', taskController.completeTask);
taskRoutes.patch('/incomplete/:id', taskController.incompleteTask);

export default taskRoutes;