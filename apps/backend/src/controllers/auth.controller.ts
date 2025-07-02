import { Request, Response } from "express";
import { handleLogin } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await handleLogin(req.body);
    res.cookie("token", result.token, result.cookieOptions);
    res.status(200).json({ message: "Login success", user: result.safeUser });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


export const logout = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};