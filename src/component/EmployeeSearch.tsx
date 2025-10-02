import React from "react";

interface EmployeeSearchProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function EmployeeSearch({searchTerm, setSearchTerm}: EmployeeSearchProps) {
    return (
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nhân viên..."
            className="px-3 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
    );
}
