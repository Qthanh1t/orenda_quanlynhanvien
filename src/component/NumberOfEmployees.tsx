import {observer} from "mobx-react-lite";
import {employeeStore} from "../store/EmployeeStore.tsx";

const NumberOfEmployees = observer(() => {
    return (
        <div className="border border-green-500 p-1.5 rounded-md">
            Số nhân viên: {employeeStore.numberOfFilteredEmployees}
        </div>
    );
});

export default NumberOfEmployees;