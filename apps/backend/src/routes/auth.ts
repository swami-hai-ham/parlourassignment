import { Router } from "express"; 
import { login, logout } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/roleMIddleware";

const authRouter = Router();

authRouter.post('/login', login);

authRouter.post('/logout', logout);


export default authRouter;
