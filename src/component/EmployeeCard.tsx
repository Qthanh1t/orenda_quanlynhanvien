import type {Employee} from "../model/Employee";

interface EmployeeProps {
    employee: Employee,
    highlight: boolean
}

const EmployeeCard = ({employee, highlight}: EmployeeProps) => {

    return (
        <article
            className={`w-full rounded-lg shadow-sm border border-slate-100 ${highlight ? 'bg-red-100 hover:bg-red-200 transition-colors' : 'bg-green-100 hover:bg-green-200 transition-colors'}`}>
            <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900">
                    {employee?.name || "Tên nhân viên"}
                </h3>
                <p className="text-sm text-slate-500">{employee?.title || "Chức vụ"}</p>


                <div className="mt-3 text-sm text-slate-600 space-y-1">
                    <p className="text-xs sm:text-sm"><span className="font-medium">ID:</span> {employee.id}</p>
                    <p className="text-xs sm:text-sm"><span className="font-medium">Mã NV:</span> {employee.code}</p>
                    <p className="truncate text-xs sm:text-sm"><span className="font-medium">SĐT:</span> {employee.phone}</p>
                    <p className="truncate text-xs sm:text-sm"><span className="font-medium">Email:</span> {employee.email}</p>
                </div>
            </div>
        </article>
    );
};


export default EmployeeCard;