import {employeesList, IdsList} from "../data/employees.ts";
import {useState} from "react";

export function useEmployee() {

    const [employees, setEmployees] = useState(employeesList);
    const [ids, setIds] = useState(IdsList);

    function addSampleEmployee() {
        let newId: number;
        do {
            newId = Math.floor(Math.random() * (100) + 1)
        } while (ids.has(newId));
        setIds((prev) => new Set(prev).add(newId))
        const formattedId: string = newId.toString().padStart(3, '0');
        setEmployees((prev) => [...prev,
            {
                id: newId,
                code: `EMP${formattedId}`,
                name: "tourist",
                title: "Backend Dev",
                phone: "0123 456 789",
                email: "tourist@company.com"
            }])

    }

    const deleteAllEmployee = () => {
        setIds(new Set());
        setEmployees([]);
    }

    return {employees, addSampleEmployee, deleteAllEmployee};
}