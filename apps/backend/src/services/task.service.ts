import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createTaskInput, updateTaskInput } from "../types/types";

const prisma = new PrismaClient();

export const fetchAllTasksService = async () => {
  return await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });
};



export const createTaskService = async (req: Request) => {
  const parsed = createTaskInput.safeParse(req.body);
  if (!parsed.success) {
    throw { status: 400, message: "Invalid input" };
  }

  const { title, description, status, employeeId } = parsed.data;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      employeeId
    }
  });

  return task;
};


export const getTaskByIdService = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    throw { status: 400, message: "Task ID is required" };
  }

  const task = await prisma.task.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      assignedTo: {
        select: {
          id: true,
          name: true,
          role: true
        }
      }
    }
  });

  if (!task) {
    throw { status: 404, message: "Task not found" };
  }

  return task;
};


export const updateTaskService = async (req: Request) => {
  const id = req.params.id;
  const parsed = updateTaskInput.safeParse(req.body);
  if (!parsed.success) {
    throw { status: 400, message: "Invalid input" };
  }

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    throw { status: 404, message: "Task not found" };
  }

  const updated = await prisma.task.update({
    where: { id },
    data: parsed.data,
  });

  return updated;
};



export const deleteTaskService = async (req: Request) => {
  const id = req.params.id;

  const existing = await prisma.task.findUnique({ where: { id } });
  if (!existing) {
    throw { status: 404, message: "Task not found" };
  }

  await prisma.task.delete({ where: { id } });
};
