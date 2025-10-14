import './App.css'
import '@ant-design/v5-patch-for-react-19';
import EmployeeHeader from './component/EmployeeHeader';
import EmployeeList from './component/EmployeeList';
import {useEffect, useState} from "react";
import {EmployeeSearch} from "./component/EmployeeSearch.tsx";
import {EmployeeFilter} from "./component/EmployeeFilter.tsx";
import NumberOfEmployees from "./component/NumberOfEmployees.tsx";
import {observer} from "mobx-react-lite";
import {employeeStore} from "./store/EmployeeStore.tsx";

const App = observer(() => {

    const [viewCard, setViewCard] = useState(true);
    const [showList, setShowList] = useState(true);

    useEffect(() => {
        (async () => await employeeStore.fetchListEmployees())()
    }, [])
    return (
        <>
            <EmployeeHeader
                viewCard={viewCard}
                setViewCard={setViewCard}
            />

            <div className="flex gap-2 mb-2 items-center">
                <EmployeeSearch/>
                <EmployeeFilter/>
                <NumberOfEmployees/>
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
                    employeeStore.isLoading ?
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                        :
                        employeeStore.error ?
                            <div className="text-center p-5 text-red-600">
                                ⚠️ Lỗi: {employeeStore.error}
                                <br/>
                            </div>
                            :
                            <EmployeeList
                                viewCard={viewCard}
                            />
                )

            }


        </>
    )
});

export default App
