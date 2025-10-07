import {Modal, Form, Input} from 'antd';
import type {Employee} from "../model/Employee.ts";
import {useForm} from "antd/es/form/Form";
import React, {useEffect} from "react";

interface Props {
    employee: Employee | undefined;
    showModalUpdate: boolean;
    setShowModalUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    handleUpdateEmployee: (data: Employee) => Promise<void>,
}

const UpdateEmployeeModal = ({employee, showModalUpdate, setShowModalUpdate, handleUpdateEmployee}: Props) => {

    const [form] = useForm();

    useEffect(() => {
        if (employee) {
            form.setFieldsValue(employee);
        }
    }, [employee, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            handleUpdateEmployee?.({...employee, ...values});
            setShowModalUpdate(false);
        } catch (err) {
            console.error("Lỗi validate:", err);
        }
    };
    const handleCancel = () => {
        setShowModalUpdate(false);
        form.setFieldsValue(employee);
    }
    return (
        <Modal
            title="Sửa thông tin nhân viên"
            open={showModalUpdate}
            onCancel={() => handleCancel()}
            onOk={handleSave}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Tên" name="name" rules={[{required: true, message: "Tên không được để trống"}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="Chức vụ" name="title">
                    <Input/>
                </Form.Item>
                <Form.Item label="Số điện thoại" name="phone">
                    <Input/>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{type: "email", message: "Email không hợp lệ"}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>

    )
};

export default UpdateEmployeeModal;