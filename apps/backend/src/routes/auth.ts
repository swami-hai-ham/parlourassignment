import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const authRouter = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;


export default authRouter;