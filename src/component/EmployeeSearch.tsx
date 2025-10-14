import {observer} from "mobx-react-lite";
import {employeeStore} from "../store/EmployeeStore.tsx";

export const EmployeeSearch = observer(() => {
    return (
        <input
            type="text"
            value={employeeStore.searchTerm}
            onChange={(e) => employeeStore.setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm nhân viên..."
            className="px-3 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
    );
})
