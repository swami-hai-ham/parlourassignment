import { Request, Response } from "express";
import { fetchAllEmployeesService } from "../services/employee.service";
import { createEmployeeService } from "../services/employee.service";
import { getEmployeeByIdService } from "../services/employee.service";
import { updateEmployeeService } from "../services/employee.service";
import { deleteEmployeeService } from "../services/employee.service";


export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await fetchAllEmployeesService();
    res.status(200).json({ employees });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};


export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await createEmployeeService(req);
    res.status(201).json({ employee });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await getEmployeeByIdService(req);
    res.status(200).json({ employee });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const updated = await updateEmployeeService(req);
    res.status(200).json({ message: "Employee updated", employee: updated });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};



export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    await deleteEmployeeService(req);
    res.status(200).json({ message: "Employee deleted" });
    return;
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || "Server error" });
    return;
  }
};