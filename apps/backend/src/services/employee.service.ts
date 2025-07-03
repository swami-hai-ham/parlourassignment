import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createEmployeeInput, updateEmployeeInput } from "../types/types";

const prisma = new PrismaClient();

export const fetchAllEmployeesService = async () => {
  const employees = await prisma.employee.findMany({
    select: {
      id: true,
      name: true,
      role: true,
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
        }
      },
      punches: {
        select: {
          id: true,
          punchType: true,
          timestamp: true,
        }
      }
    }
  });

  return employees;
};

export const createEmployeeService = async (req: Request) => {
  const parsed = createEmployeeInput.safeParse(req.body);
  if (!parsed.success) {
    throw { status: 400, message: "Invalid input" };
  }

  const { name, pin, role } = parsed.data;

  const newEmployee = await prisma.employee.create({
    data: {
      name,
      pin,
      role: role || "employee"
    }
  });

  return newEmployee;
};

export const getEmployeeByIdService = async (req: Request) => {
  const { id } = req.params;

  if (!id) {
    throw { status: 400, message: "Employee ID is required" };
  }

  const employee = await prisma.employee.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      role: true,
      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
        }
      },
      punches: {
        select: {
          id: true,
          punchType: true,
          timestamp: true,
        }
      }
    }
  });

  if (!employee) {
    throw { status: 404, message: "Employee not found" };
  }

  return employee;
};


export const updateEmployeeService = async (req: Request) => {
  const id = req.params.id;
  const parsed = updateEmployeeInput.safeParse(req.body);
  if (!parsed.success) {
    throw { status: 400, message: "Invalid input" };
  }

  const updated = await prisma.employee.update({
    where: { id },
    data: parsed.data
  });

  return updated;
};


export const deleteEmployeeService = async (req: Request) => {
  const id = req.params.id;

  const existing = await prisma.employee.findUnique({ where: { id } });
  if (!existing) {
    throw { status: 404, message: "Employee not found" };
  }

  await prisma.employee.delete({ where: { id } });
};