import type { Employee } from "../model/Employee";

const EmployeeCard = ({employee, highlight}: {employee: Employee, highlight: boolean}) => {

  return (
    <article className={`max-w-sm w-full rounded-xl shadow-md overflow-hidden ${highlight? 'bg-red-100': 'bg-green-50'}`} >
    <div className="p-4">
    <h3 className="text-lg font-semibold text-slate-900">
    {employee?.name || "Tên nhân viên"}
    </h3>
    <p className="text-sm text-slate-500">{employee?.title || "Chức vụ"}</p>


    <div className="mt-3 text-sm text-slate-600 space-y-1">
    <p>ID: {employee?.id ?? "-"}</p>
    <p>Mã NV: {employee?.code ?? "-"}</p>
    <p>📞 {employee?.phone || "-"}</p>
    <p>✉️ {employee?.email || "email@example.com"}</p>
    </div>
    </div>
    </article>
  );
};


export default EmployeeCard;