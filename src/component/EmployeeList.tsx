import EmployeeCard from "./EmployeeCard";
import type {Employee} from "../model/Employee";
import EmployeeTable from './EmployeeTable';
import React, {useState} from "react";
import UpdateEmployeeModal from "./UpdateEmployeeModal.tsx";
import {employeeApi} from "../api/employeeApi.ts";
import EmployeeDetailModal from "./EmployeeDetailModal.tsx";

interface EmployeeListProps {
    employees: Employee[],
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
    viewCard: boolean,
}

function EmployeeList({employees, setEmployees, viewCard}: EmployeeListProps) {

    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showDetailModal, setShowDetailModal] = useState(false)

    const handleUpdateEmployee = async (data: Employee) => {
        await employeeApi.updateEmployee(data.id, data)
        setEmployees((prev) =>
            prev.map((e) => (e.id === data.id ? data : e))
        );
    }
    return (
        <>

            {viewCard
                ? <div className="p-6 bg-gray-50 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {employees.map(
                        (e) => (
                            <EmployeeCard
                                key={e.id}
                                employee={e}
                                highlight={e.title == "Manager"}
                                setSelectedEmployee={setSelectedEmployee}
                                setShowModalUpdate={setShowModalUpdate}
                                setShowDetailModal={setShowDetailModal}
                            />
                        )
                    )}
                </div>
                : <EmployeeTable
                    employees={employees}
                />
            }

            <UpdateEmployeeModal employee={selectedEmployee} showModalUpdate={showModalUpdate}
                                 setShowModalUpdate={setShowModalUpdate} handleUpdateEmployee={handleUpdateEmployee}/>
            <EmployeeDetailModal showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}
                                 employee={selectedEmployee}/>
        </>
    );
}

export default EmployeeList;