import EmployeeCard from "./EmployeeCard";
import type {Employee} from "../model/Employee";
import EmployeeTable from './EmployeeTable';
import {useState} from "react";
import EmployeeDetailModal from "./EmployeeDetailModal.tsx";
import DeleteEmployeeModal from "./DeleteEmployeeModal.tsx";
import {Pagination} from "antd";
import {observer} from "mobx-react-lite";
import {employeeStore} from "../store/EmployeeStore.tsx";

interface EmployeeListProps {
    viewCard: boolean,
}

const EmployeeList = observer(({viewCard}: EmployeeListProps) => {

    const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const {listEmployees, setPage, page, numberOfFilteredEmployees} = employeeStore;

    return (
        <>

            {viewCard
                ? <div className="p-6 bg-gray-50 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {listEmployees.map(
                        (e) => (
                            <EmployeeCard
                                key={e.id}
                                employee={e}
                                highlight={e.title.includes("Manager")}
                                setSelectedEmployee={setSelectedEmployee}
                                setShowDetailModal={setShowDetailModal}
                                setShowDeleteModal={setShowDeleteModal}
                            />
                        )
                    )}
                </div>
                : <EmployeeTable
                    setSelectedEmployee={setSelectedEmployee}
                    setShowDetailModal={setShowDetailModal}
                    setShowDeleteModal={setShowDeleteModal}
                />
            }
            <div className="flex justify-center mt-4">
                <Pagination
                    defaultCurrent={1}
                    current={page}
                    pageSize={8}
                    total={numberOfFilteredEmployees}
                    onChange={(p) => {
                        setPage(p);
                    }}
                    showTotal={(total) => `Tổng cộng ${total} nhân viên`}
                />
            </div>

            <EmployeeDetailModal showDetailModal={showDetailModal} setShowDetailModal={setShowDetailModal}
                                 employee={selectedEmployee}/>
            <DeleteEmployeeModal employee={selectedEmployee} showDeleteModal={showDeleteModal}
                                 setShowDeleteModal={setShowDeleteModal}/>
        </>
    );
})

export default EmployeeList;