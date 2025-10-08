import './App.css'
import '@ant-design/v5-patch-for-react-19';
import EmployeeHeader from './component/EmployeeHeader';
import EmployeeList from './component/EmployeeList';
import {useEffect, useMemo, useState} from "react";
import {EmployeeSearch} from "./component/EmployeeSearch.tsx";
import {EmployeeFilter} from "./component/EmployeeFilter.tsx";
import {useEmployee} from "./hook/useEmployee.ts";
import {titles} from "./data/title.ts";
import {employeesFilter} from "./utils/util.ts";
import NumberOfEmployees from "./component/NumberOfEmployees.tsx";

function App() {

    const [viewCard, setViewCard] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const {
        employees,
        isLoading,
        error,
        addSampleEmployee,
        deleteAllEmployee
    } = useEmployee();
    const [numberOfEmployees, setNumberOfEmployees] = useState(employees.length);
    const [showList, setShowList] = useState(true);


    const filteredEmployees = useMemo(() => {
        return employeesFilter(employees, searchTerm, selectedTitle);
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

            <div className="flex gap-2 mb-2 items-center">
                <EmployeeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                <EmployeeFilter selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} titles={titles}/>
                <NumberOfEmployees numberOfEmployees={numberOfEmployees}/>
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
                showList && (
                    isLoading ?
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                        :
                        error ?
                            <div className="text-center p-5 text-red-600">
                                ⚠️ Lỗi: {error}
                                <br/>
                            </div>
                            :
                            <EmployeeList
                                employees={filteredEmployees}
                                viewCard={viewCard}
                            />
                )

            }


        </>
    )
}

export default App
