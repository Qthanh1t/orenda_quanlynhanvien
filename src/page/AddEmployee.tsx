import {Button, Form, Input, Typography} from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {employeeApi} from "../api/employeeApi.ts";
import {useForm} from "antd/es/form/Form";
import type {Employee} from "../model/Employee.ts";
import {getSampleEmployees, modifyEmployeeCode} from "../utils/util.ts";

const {Title} = Typography;

const layout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24},
};

const validateMessages = {
    required: '${label} không được để trống!',
    types: {
        email: '${label} chưa đúng định dạng!',
    },
};

const AddEmployee = () => {
    const [error, setError] = useState<string>()
    const [employee, setEmployee] = useState<Employee | null>()

    const [form] = useForm();
    const navigate = useNavigate();

    const handleSubmitCreateEmployee = async (values: Employee) => {
        try {
            if (!employee) {
                return
            }
            setEmployee({...employee, ...values})
            const res = await employeeApi.createEmployee({...employee, ...values});
            await employeeApi.updateEmployee(res!.id, modifyEmployeeCode(res!));
            navigate("/employees")
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError(String(error))
            }
        }

    };

    useEffect(() => {
        setEmployee(() => getSampleEmployees())
    }, []);

    return (
        <>
            {
                error ?
                    <div className="text-center p-5 text-red-600">
                        ⚠️ Lỗi: {error}
                        <br/>
                    </div>
                    :
                    <div className="flex flex-col justify-center items-center w-full mt-3">
                        <Title level={3}>Thêm nhân viên mới</Title>
                        <Form
                            {...layout}
                            form={form}
                            name="nest-messages"
                            onFinish={handleSubmitCreateEmployee}
                            style={{width: 500}}
                            validateMessages={validateMessages}
                        >
                            <Form.Item name={'name'} label="Họ tên" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={'title'} label="Chức vụ" rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={'phone'} label="Số điện thoại" rules={[{required: true}, {
                                pattern: /^(0|\+84|84)(\d{9})$/,
                                message: "Số điện thoại chưa đúng định dạng"
                            }]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item name={'email'} label="Email" rules={[{type: 'email'}, {required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label={null}>
                                <div className={"flex justify-end gap-2"}>
                                    <NavLink to={"/employees"}>
                                        <Button>
                                            Hủy
                                        </Button>
                                    </NavLink>
                                    <Button type="primary" htmlType="submit">
                                        Xác nhận
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>

            }

        </>
    );
};

export default AddEmployee;