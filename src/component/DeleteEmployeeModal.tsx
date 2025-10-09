import {Modal} from "antd";
import React, {useState} from "react";
import type {Employee} from "../model/Employee.ts";
import {employeeApi} from "../api/employeeApi.ts";

interface Props {
    employee?: Employee | null,
    showDeleteModal: boolean,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    deleteEmployee: (employee: Employee) => void
}

const successModal = () => {
    Modal.success({
        content: 'Xóa nhân viên thành công',
    });
};

const errorModal = () => {
    Modal.error({
        title: 'Có lỗi xảy ra!',
        content: 'Xóa nhân viên không thành công',
    });
};


const DeleteEmployeeModal = ({employee, showDeleteModal, setShowDeleteModal, deleteEmployee}: Props) => {

    const [error, setError] = useState<string>()

    const handleOk = async () => {
        try {
            if (!employee) {
                return
            }
            await employeeApi.deleteEmployeeById(employee.id)
            deleteEmployee(employee)
            setShowDeleteModal(false);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(String(error))
            }
        } finally {
            if (error) {
                errorModal()
            } else {
                successModal()
            }

        }

    };

    const handleCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <Modal
                title="Xóa nhân viên"
                closable={{'aria-label': 'Custom Close Button'}}
                open={showDeleteModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn xóa nhân viên: {employee?.name}?</p>

            </Modal>
        </>
    );
};

export default DeleteEmployeeModal;