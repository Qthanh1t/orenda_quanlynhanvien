import EmployeeCard from "./EmployeeCard";
import type {Employee} from "../model/Employee";
import EmployeeTable from './EmployeeTable';

interface EmployeeListProps {
    employees: Employee[],
    viewCard: boolean,
}

function EmployeeList({employees, viewCard}: EmployeeListProps) {

    return (
        <>

            {viewCard
                ? <div className="p-6 bg-gray-50 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {employees.map(
                        (e) => (
                            <EmployeeCard
                                key={e.id}
                                employee={e}
                                highlight={e.title == "Manager"}
                            />
                        )
                    )}
                </div>
                : <EmployeeTable
                    employees={employees}
                />
            }


        </>
    );
}

export default EmployeeList;