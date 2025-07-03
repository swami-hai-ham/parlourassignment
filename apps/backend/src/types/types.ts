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

export const createTaskInput = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  status: z.enum(["pending", "in_progress", "completed"]).default("pending"),
  employeeId: z.string().uuid()
});


export const updateTaskInput = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(500).optional(),
  status: z.enum(["pending", "in_progress", "completed"]).optional(),
  employeeId: z.string().uuid().optional()
});
