import baseApi from "./baseApi.ts";
import type {Employee} from "../model/Employee.ts";
import {employeesFilter} from "../utils/util.ts";

export const employeeApi = {
    getAll: async (): Promise<Employee[]> => {
        return await baseApi.get<Employee[]>("/employees");
    },
    getFilteredEmployees: async (page: number = 1,
                                 pageSize: number = 8,
                                 selectedTitle: string = "",
                                 searchTerm: string = ""): Promise<{
        data: Employee[],
        numberOfFilteredEmployees: number,
        totalEmployees: number
    }> => {

        const res = await baseApi.get<Employee[]>('/employees')
        const filteredEmployees = employeesFilter(res, searchTerm, selectedTitle);
        const startIndex = (page - 1) * pageSize;
        return {
            data: filteredEmployees.slice(startIndex, startIndex + pageSize),
            numberOfFilteredEmployees: filteredEmployees.length,
            totalEmployees: res.length
        };
    },
    getEmployeeById: async (id: number): Promise<Employee> => {
        return await baseApi.get<Employee>(`/employees/${id}`)
    },
    createEmployee: async (data: Employee): Promise<Employee> => {
        return await baseApi.post<Employee>('/employees', data)
    },
    updateEmployee: async (id: number, data: Employee): Promise<Employee> => {
        return await baseApi.put<Employee>(`/employees/${id}`, data)
    },
    deleteEmployeeById: async (id: number): Promise<Employee | null> => {
        return await baseApi.delete<Employee>(`/employees/${id}`)
    }
}