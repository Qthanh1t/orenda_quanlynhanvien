import {employeesList} from "../data/employees.ts";
import {useEffect, useState} from "react";
import {employeeApi} from "../api/employeeApi.ts"
import type {Employee} from "../model/Employee.ts";

export function useEmployee() {

    const [employees, setEmployees] = useState<Employee[]>(employeesList);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchEmployees = async () => {
        setIsLoading(true);
        try {
            const res = await employeeApi.getAll()
            setEmployees(res)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(String(error))
            }
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        (async () => {
            await fetchEmployees()
        })();
    }, []);

    const addSampleEmployee = async () => {
        const newId: number = Number(employees[employees.length - 1].id) + 1;
        const formattedId: string = newId.toString().padStart(3, '0');
        await employeeApi.createEmployee({
            id: newId,
            code: `EMP${formattedId}`,
            name: "tourist",
            title: "Backend Dev",
            phone: "0123 456 789",
            email: "tourist@company.com"
        })
        //await fetchEmployees()
        setEmployees((prev) => [...prev, {
            id: newId,
            code: `EMP${formattedId}`,
            name: "tourist",
            title: "Backend Dev",
            phone: "0123 456 789",
            email: "tourist@company.com"
        }])
    }

    const deleteAllEmployee = () => {
        setEmployees([]);
    }

    return {employees, isLoading, error, addSampleEmployee, deleteAllEmployee};
}