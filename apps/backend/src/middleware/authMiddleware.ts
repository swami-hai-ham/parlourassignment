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
} catch (err: any) {
  if (err.name === 'TokenExpiredError') {
    res.status(401).json({ message: "Token expired" });
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ message: "Invalid token" });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
  return;
}

};
