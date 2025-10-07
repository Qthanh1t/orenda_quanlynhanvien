import type {Employee} from "../model/Employee";
import React from "react";

interface Props {
    employee: Employee,
    highlight: boolean,
    setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | undefined>>,
    setShowModalUpdate: React.Dispatch<React.SetStateAction<boolean>>
    setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EmployeeCard = React.memo(({
                                     employee,
                                     highlight,
                                     setSelectedEmployee,
                                     setShowModalUpdate,
                                     setShowDetailModal
                                 }: Props) => {

    const handleViewDetails = (employee: Employee) => {
        console.log(employee);
        setSelectedEmployee(employee);
        setShowDetailModal(true)
    }
    const handleUpdateEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowModalUpdate(true);

    }
    return (
        <>
            <article
                className={`w-full rounded-lg shadow-sm border border-slate-100 ${highlight ? 'bg-red-100 hover:bg-red-200 transition-colors' : 'bg-green-100 hover:bg-green-200 transition-colors'}`}>
                <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900">
                        {employee?.name || "Tên nhân viên"}
                    </h3>
                    <p className="text-sm text-slate-500">{employee?.title || "Chức vụ"}</p>


                    <div className="mt-3 text-sm text-slate-600 space-y-1">
                        <p className="text-xs sm:text-sm"><span className="font-medium">ID:</span> {employee.id}</p>
                        <p className="text-xs sm:text-sm"><span className="font-medium">Mã NV:</span> {employee.code}
                        </p>
                        <p className="truncate text-xs sm:text-sm"><span
                            className="font-medium">SĐT:</span> {employee.phone}</p>
                        <p className="truncate text-xs sm:text-sm"><span
                            className="font-medium">Email:</span> {employee.email}</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button onClick={() => handleViewDetails(employee)}
                            className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition">
                        Xem chi tiết
                    </button>
                    <button
                        onClick={() => handleUpdateEmployee(employee)}
                        className={"bg-yellow-300 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500 transition"}>
                        Sửa
                    </button>
                    <button className={"bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"}>
                        Xóa
                    </button>
                </div>

            </article>
        </>

    );
});


export default EmployeeCard;