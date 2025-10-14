import {observer} from "mobx-react-lite";
import {titles} from "../data/title.ts";
import {employeeStore} from "../store/EmployeeStore.tsx";

export const EmployeeFilter = observer(() => {
    return (
        <select
            value={employeeStore.selectedTitle}
            onChange={(e) => employeeStore.setSelectedTitle(e.target.value)}
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
