import axiosClient from "./axiosClient.ts";
import type {Employee} from "../model/Employee.ts";

export const employeeApi = {
    getAll: async (): Promise<Employee[]> => {
        return await axiosClient.get('/employees')
    },
    getEmployeeById: async (id: number): Promise<Employee | null> => {
        return await axiosClient.get(`/employees/${id}`)
    },
    createEmployee: async (data: Employee): Promise<Employee | null> => {
        return await axiosClient.post('/employees', data)
    },
    updateEmployee: async (id: number, data: Employee): Promise<Employee | null> => {
        return await axiosClient.put(`/employees/${id}`, data)
    },
    deleteEmployeeById: async (id: number): Promise<Employee | null> => {
        return await axiosClient.delete(`/employees/${id}`)
    }
}