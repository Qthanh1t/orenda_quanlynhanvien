import React from "react";

interface EmployeeFilterProps {
    selectedTitle: string;
    setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
    titles: string[];
}

export const EmployeeFilter = React.memo(({selectedTitle, setSelectedTitle, titles}: EmployeeFilterProps) => {
    return (
        <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        >
            <option value="">Tất cả chức vụ</option>
            {titles.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
})
