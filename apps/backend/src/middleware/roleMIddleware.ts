import { Request, Response, NextFunction } from "express";

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user?.role !== role) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
