import './App.css'
import EmployeeHeader from './component/EmployeeHeader';
import EmployeeList from './component/EmployeeList';
import {useEffect, useMemo, useState} from "react";
import {EmployeeSearch} from "./component/EmployeeSearch.tsx";
import {EmployeeFilter} from "./component/EmployeeFilter.tsx";
import {removeVietnameseTones} from './utils/util.ts';
import {useEmployee} from "./hook/useEmployee.ts";

function App() {

    const [viewCard, setViewCard] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const {employees, addSampleEmployee, deleteAllEmployee} = useEmployee();
    const [numberOfEmployees, setNumberOfEmployees] = useState(employees.length);
    const [showList, setShowList] = useState(true);
    
    const titles: string[] = ["Dev", "Designer", "Manager"];


    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const matchSearch = removeVietnameseTones(employee.name.toLowerCase()).includes(removeVietnameseTones(searchTerm.toLowerCase()))
            const matchTitle = selectedTitle ? employee.title.toLowerCase().includes(selectedTitle.toLowerCase()) : true;
            return matchSearch && matchTitle;
        });
    }, [employees, searchTerm, selectedTitle]);

    useEffect(() => {
        setNumberOfEmployees(filteredEmployees.length);
    }, [filteredEmployees])

    return (
        <>
            <EmployeeHeader
                count={employees.length}
                viewCard={viewCard}
                setViewCard={setViewCard}
                addSampleEmployee={addSampleEmployee}
                deleteAllEmployee={deleteAllEmployee}
            />
            <div className="flex gap-2 items-center">
                <EmployeeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <EmployeeFilter selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} titles={titles}/>
                <div className="border border-green-500 p-1.5 rounded-md">
                    Số nhân viên: {numberOfEmployees}
                </div>
                <button
                    onClick={() => setShowList(!showList)}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                        showList ? "bg-green-500" : "bg-gray-300"
                    }`}
                >
                  <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                          showList ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
                <span>
                    {showList ? "Hiện danh sách" : "Ẩn danh sách"}
                </span>
            </div>
            {
                showList &&
                <EmployeeList
                    employees={filteredEmployees}
                    viewCard={viewCard}
                />
            }


        </>
    )
}

export default App
