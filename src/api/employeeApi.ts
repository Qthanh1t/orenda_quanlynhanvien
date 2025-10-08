import baseApi from "./baseApi.ts";
import type {Employee} from "../model/Employee.ts";

export const employeeApi = {
    getAll: async (): Promise<Employee[]> => {
        return await baseApi.get<Employee[]>('/employees')
    },
    getEmployeeById: async (id: number): Promise<Employee | null> => {
        return await baseApi.get<Employee>(`/employees/${id}`)
    },
    createEmployee: async (data: Employee): Promise<Employee | null> => {
        return await baseApi.post<Employee>('/employees', data)
    },
    updateEmployee: async (id: number, data: Employee): Promise<Employee | null> => {
        return await baseApi.put<Employee>(`/employees/${id}`, data)
    },
    deleteEmployeeById: async (id: number): Promise<Employee | null> => {
        return await baseApi.delete<Employee>(`/employees/${id}`)
    }
}