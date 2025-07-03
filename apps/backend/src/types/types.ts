import z from "zod";

export const loginInput = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(20)
});



export const createEmployeeInput = z.object({
  name: z.string().min(2).max(50),
  pin: z.string().min(3).max(10), 
  role: z.string().optional() 
});

export const updateEmployeeInput = z.object({
  name: z.string().min(2).max(50).optional(),
  pin: z.string().min(3).max(10).optional(),
  role: z.string().optional()
});