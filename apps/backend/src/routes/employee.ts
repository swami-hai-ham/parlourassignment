import { Router } from "express"; 
import { authMiddleware } from "../middleware/authMiddleware";
import {requireRole} from "../middleware/roleMiddleware"
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get('/all', authMiddleware, getAllEmployees);

employeeRouter.post('/new',authMiddleware, requireRole("SUPER_ADMIN"), createEmployee);

employeeRouter.get('/:id', authMiddleware, getEmployeeById);
employeeRouter.put('/:id',authMiddleware, requireRole("SUPER_ADMIN"), updateEmployee);
employeeRouter.delete('/:id',authMiddleware, requireRole("SUPER_ADMIN"), deleteEmployee);


export default employeeRouter;
