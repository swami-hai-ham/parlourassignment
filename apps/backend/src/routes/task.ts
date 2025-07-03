import { Router } from "express"; 
import { authMiddleware } from "../middleware/authMiddleware";
import {requireRole} from "../middleware/roleMiddleware"
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller";

const taskRouter = Router();

taskRouter.get('/all', authMiddleware, getAllTasks);

taskRouter.post('/new',authMiddleware, requireRole("SUPER_ADMIN"), createTask);

taskRouter.get('/:id', authMiddleware, getTaskById);
taskRouter.put('/:id',authMiddleware, requireRole("SUPER_ADMIN"), updateTask);
taskRouter.delete('/:id',authMiddleware, requireRole("SUPER_ADMIN"), deleteTask);


export default taskRouter;
