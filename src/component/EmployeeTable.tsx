import type {Employee} from "../model/Employee";
import {NavLink} from "react-router-dom";
import React from "react";

interface EmployeesProps {
    employees: Employee[],
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>,
    setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

function EmployeeTable({employees, setSelectedEmployee, setShowDetailModal, setShowDeleteModal}: EmployeesProps) {

    const handleViewDetails = (employee: Employee) => {
        console.log(employee);
        setSelectedEmployee(employee);
        setShowDetailModal(true)
    }

    const handleDeleteEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowDeleteModal(true);
    }

    return (
        <>
            <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-green-500 text-white">
                <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Mã NV</th>
                    <th className="px-4 py-2 text-left">Họ tên</th>
                    <th className="px-4 py-2 text-left">Chức vụ</th>
                    <th className="px-4 py-2 text-left">SĐT</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Tuỳ chỉnh</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {employees.map((employee) => (
                    <tr
                        key={employee.id}
                        className={`${employee.title.includes("Manager") ? 'bg-red-100 hover:bg-red-200 transition-colors' : 'hover:bg-green-100 transition-colors'}`}
                    >
                        <td className="px-4 py-2">{employee.id}</td>
                        <td className="px-4 py-2 font-medium">{employee.code}</td>
                        <td className="px-4 py-2">{employee.name}</td>
                        <td className="px-4 py-2">{employee.title}</td>
                        <td className="px-4 py-2">{employee.phone}</td>
                        <td className="px-4 py-2">{employee.email}</td>
                        <td className="px-4 py-2 flex gap-2">
                            <button onClick={() => handleViewDetails(employee)}
                                    className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition">
                                Xem chi tiết
                            </button>
                            <NavLink to={`/updateEmployee/${employee.id}`}>
                                <button
                                    className={"bg-yellow-300 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500 transition"}>
                                    Sửa
                                </button>
                            </NavLink>

                            <button
                                onClick={() => handleDeleteEmployee(employee)}
                                className={"bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}

export default EmployeeTable;