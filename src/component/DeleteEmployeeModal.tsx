import {Modal} from "antd";
import React from "react";
import type {Employee} from "../model/Employee.ts";
import {observer} from "mobx-react-lite";
import {employeeStore} from "../store/EmployeeStore.tsx";

interface Props {
    employee?: Employee | null,
    showDeleteModal: boolean,
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
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


const DeleteEmployeeModal = observer(({employee, showDeleteModal, setShowDeleteModal}: Props) => {
    const {error} = employeeStore;

    const handleOk = async () => {
        if (!employee) {
            return
        }
        await employeeStore.deleteEmployee(employee.id)
        setShowDeleteModal(false);
        if (error) {
            errorModal()
        } else {
            successModal()
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
});

export default DeleteEmployeeModal;