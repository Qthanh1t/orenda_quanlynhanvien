import EmployeeCard from "./EmployeeCard";
import type { Employee } from "../model/Employee";
import EmployeeTable from './EmployeeTable';
import { useState } from "react";

interface EmployeeListProps{
    employees: Employee[]
}

function EmployeeList({employees}: EmployeeListProps) {
    const [viewCard, setViewCard] = useState(false);
    return (
        <>
            {viewCard == true
            ?<div className="p-6 bg-gray-50 min-h-screen flex items-start justify-center gap-3">
                {employees.map(
                (e) => (
                    <EmployeeCard
                    key={e.id}
                    employee={e}
                    highlight = {e.title == "Manager" ? true:false}
                    />
                )
                )}
            </div>
            :<EmployeeTable
            employees = {employees}
            />
            }
            
            
        </>
    );
}

export default EmployeeList;