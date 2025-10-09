import EmployeeCard from "./EmployeeCard";
import type {Employee} from "../model/Employee";
import EmployeeTable from './EmployeeTable';
import React, {useState} from "react";
import EmployeeDetailModal from "./EmployeeDetailModal.tsx";
import DeleteEmployeeModal from "./DeleteEmployeeModal.tsx";

interface EmployeeListProps {
    employees: Employee[],
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
    viewCard: boolean,
}

function EmployeeList({employees, setEmployees, viewCard}: EmployeeListProps) {

    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const deleteEmployee = (employee: Employee) => {
        setEmployees((prev) => prev.filter((e: Employee) => e.id !== employee.id));
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
                                setShowDetailModal={setShowDetailModal}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        )
                    )}
                </div>
                : <EmployeeTable
                    employees={employees}
                />
            }

            <EmployeeDetailModal showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}
                                 employee={selectedEmployee}/>
            <DeleteEmployeeModal employee={selectedEmployee} showDeleteModal={showDeleteModal}
                                 setShowDeleteModal={setShowDeleteModal} deleteEmployee={deleteEmployee}/>
        </>
    );
}

export default EmployeeList;