import * as React from "react";

function EmployeeHeader({count, viewCard, setViewCard}: {
    count: number,
    viewCard: boolean,
    setViewCard: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <header
            className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-300 text-white px-6 py-4 rounded-lg shadow-md mb-2">
            <h1 className="text-xl font-bold">Quản lý nhân viên</h1>
            <div className="flex items-center justify-between gap-2">
                <button
                    onClick={() => setViewCard(!viewCard)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${viewCard ? "bg-green-600 text-white" : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"}`}
                >
                    {viewCard ? "Card" : "Table"}
                </button>
                <span className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full shadow">
                    Tổng số: {count}
                </span>
            </div>

        </header>
    );
}

export default EmployeeHeader;