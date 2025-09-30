import type { Employee } from "../model/Employee";

function EmployeeTable({employees}: {employees: Employee[]}) {
    return (
        <>
            <table className="min-w-full table-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <thead className="bg-green-500 text-white">
                <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Email</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {employees.map((employee) => (
                <tr
                    key={employee.id}
                    className="hover:bg-indigo-50 transition-colors"
                >
                    <td className="px-4 py-2">{employee.id}</td>
                    <td className="px-4 py-2 font-medium">{employee.code}</td>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.title}</td>
                    <td className="px-4 py-2">{employee.phone}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                </tr>
                ))}
            </tbody>
            </table>

        </>
    );
}

export default EmployeeTable;