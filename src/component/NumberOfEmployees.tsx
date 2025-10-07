import React from "react";

const NumberOfEmployees = React.memo(({numberOfEmployees}: { numberOfEmployees: number }) => {
    return (
        <div className="border border-green-500 p-1.5 rounded-md">
            Số nhân viên: {numberOfEmployees}
        </div>
    );
});

export default NumberOfEmployees;