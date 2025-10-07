import type {Employee} from "../model/Employee.ts";
import {Modal, Descriptions} from "antd";
import React from "react";

interface Props {
    showDetailModal: boolean,
    setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>,
    employee?: Employee | null
}

const EmployeeDetailModal = ({showDetailModal, setShowDetailModal, employee}: Props) => {
    return (
        <Modal title="Thông tin nhân viên" open={showDetailModal} onCancel={() => setShowDetailModal(false)}
               footer={null} centered> {employee ? (
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{employee.id}</Descriptions.Item>
                <Descriptions.Item label="Mã nhân viên">{employee.code}</Descriptions.Item>
                <Descriptions.Item label="Họ tên">{employee.name}</Descriptions.Item>
                <Descriptions.Item label="Chức vụ">{employee.title}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{employee.phone}</Descriptions.Item>
                <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
            </Descriptions>) : (<p>Không có thông tin nhân viên.</p>)} </Modal>
    );
};

export default EmployeeDetailModal;