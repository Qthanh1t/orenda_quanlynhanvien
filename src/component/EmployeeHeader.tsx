
function EmployeeHeader({count}: {count: number}) {
    return (
        <header className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-300 text-white px-6 py-4 rounded-lg shadow-md mb-2">
        <h1 className="text-xl font-bold">Quản lý nhân viên</h1>
        <span className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow">
            Tổng số: {count}
        </span>
        </header>
    );
}

export default EmployeeHeader;