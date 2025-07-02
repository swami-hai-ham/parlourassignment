import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    res.locals.user = decoded; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
};
