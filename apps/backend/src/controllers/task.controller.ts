import { Request, Response } from "express";
import { createTaskService, deleteTaskService, fetchAllTasksService, getTaskByIdService, updateTaskService } from "../services/task.service";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await fetchAllTasksService();
    res.status(200).json({ tasks });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};


export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await createTaskService(req);
    res.status(201).json({ task });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await getTaskByIdService(req);
    res.status(200).json({ task });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updated = await updateTaskService(req);
    res.status(200).json({ message: "Task updated", task: updated });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};



export const deleteTask = async (req: Request, res: Response) => {
  try {
    await deleteTaskService(req);
    res.status(200).json({ message: "Task deleted" });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};