import EmployeeCard from "./EmployeeCard";
import type {Employee} from "../model/Employee";
import EmployeeTable from './EmployeeTable';
import React, {useEffect, useState} from "react";
import EmployeeDetailModal from "./EmployeeDetailModal.tsx";
import DeleteEmployeeModal from "./DeleteEmployeeModal.tsx";
import {Pagination} from "antd";

interface EmployeeListProps {
    employees: Employee[],
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
    viewCard: boolean,
}

function EmployeeList({employees, setEmployees, viewCard}: EmployeeListProps) {

    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [employeesInPage, setEmployeesInPage] = useState<Employee[]>(employees)
    const [page, setPage] = useState(1);

    useEffect(() => {
        const startIndex = (page - 1) * 8;
        const data = employees.slice(startIndex, startIndex + 8)
        setEmployeesInPage(data)
    }, [page, employees]);
    useEffect(() => {
        setPage(1)
    }, [employees]);

    const deleteEmployee = (employee: Employee) => {
        setEmployees((prev) => prev.filter((e: Employee) => e.id !== employee.id));
    }

    return (
        <>

            {viewCard
                ? <div className="p-6 bg-gray-50 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {employeesInPage.map(
                        (e) => (
                            <EmployeeCard
                                key={e.id}
                                employee={e}
                                highlight={e.title.includes("Manager")}
                                setSelectedEmployee={setSelectedEmployee}
                                setShowDetailModal={setShowDetailModal}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        )
                    )}
                </div>
                : <EmployeeTable
                    employees={employeesInPage}
                    setSelectedEmployee={setSelectedEmployee}
                    setShowDetailModal={setShowDetailModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            }
            <div className="flex justify-center mt-4">
                <Pagination
                    defaultCurrent={1}
                    current={page}
                    pageSize={8}
                    total={employees.length}
                    onChange={(p) => {
                        setPage(p);
                    }}
                    showTotal={(total) => `Tổng cộng ${total} nhân viên`}
                />
            </div>

            <EmployeeDetailModal showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}
                                 employee={selectedEmployee}/>
            <DeleteEmployeeModal employee={selectedEmployee} showDeleteModal={showDeleteModal}
                                 setShowDeleteModal={setShowDeleteModal} deleteEmployee={deleteEmployee}/>
        </>
    );
}

export default EmployeeList;