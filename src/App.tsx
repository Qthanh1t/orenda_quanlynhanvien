import './App.css'
import EmployeeHeader from './component/EmployeeHeader';
import EmployeeList from './component/EmployeeList';
import {useMemo, useState} from "react";
import {employees} from "./data/employees.ts";
import {EmployeeSearch} from "./component/EmployeeSearch.tsx";
import {EmployeeFilter} from "./component/EmployeeFilter.tsx";


function App() {

    const [viewCard, setViewCard] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");

    const titles: string[] = ["Dev", "Designer", "Manager"];

    function removeVietnameseTones(str: string): string {
        return str
            .normalize("NFD") // tách ký tự có dấu thành base + dấu
            .replace(/[\u0300-\u036f]/g, "") // xóa dấu
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    }

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const matchSearch = removeVietnameseTones(employee.name.toLowerCase()).includes(removeVietnameseTones(searchTerm.toLowerCase()))
            const matchTitle = selectedTitle ? employee.title.toLowerCase().includes(selectedTitle.toLowerCase()) : true;
            return matchSearch && matchTitle;
        });
    }, [searchTerm, selectedTitle]);
    return (
        <>
            <EmployeeHeader
                count={employees.length}
                viewCard={viewCard}
                setViewCard={setViewCard}
            />
            <div className="flex gap-2 mb-2">
                <EmployeeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <EmployeeFilter selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} titles={titles}/>
            </div>
            <EmployeeList
                employees={filteredEmployees}
                viewCard={viewCard}
            />

        </>
    )
}

export default App
