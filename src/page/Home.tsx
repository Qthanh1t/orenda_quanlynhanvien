import {Typography} from 'antd';
import {RobotOutlined, SignatureOutlined, StarOutlined, TeamOutlined} from "@ant-design/icons";
import {useEmployee} from "../hook/useEmployee.ts";

const {Title} = Typography;
const Home = () => {
    const {employees, isLoading, error} = useEmployee();
    return (
        <>
            <header
                className="flex items-center justify-between bg-gradient-to-r from-green-500 to-green-300 text-white px-6 py-4 rounded-lg shadow-md">
                <h1 className="text-xl font-bold">Trang Chủ</h1>
            </header>

            {isLoading ?
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
                    <div className="bg-gray-200 p-3">
                        <div
                            className={"flex flex-col items-center justify-center my-3 p-3 bg-green-100 rounded-lg shadow-md"}>
                            <Title level={3}>
                                Số lượng nhân viên <TeamOutlined/>
                            </Title>
                            <Title level={2}>
                                {employees.length}
                            </Title>
                        </div>
                        <div className={"flex items-center justify-center mt-4 gap-5 "}>
                            <div
                                className={"basis-1/3 flex flex-col items-center justify-center bg-amber-100 rounded-lg shadow-md p-3"}>
                                <Title level={3}>
                                    Dev <RobotOutlined/>
                                </Title>
                                <Title level={2}>
                                    {employees.filter((e) => {
                                        return e.title.includes("Dev")
                                    }).length}
                                </Title>
                            </div>
                            <div
                                className={"basis-1/3 flex flex-col items-center justify-center bg-pink-200 rounded-lg shadow-md p-3"}>
                                <Title level={3}>
                                    Designer <SignatureOutlined/>
                                </Title>
                                <Title level={2}>
                                    {employees.filter((e) => {
                                        return e.title.includes("Designer")
                                    }).length}
                                </Title>
                            </div>
                            <div
                                className={"basis-1/3 flex flex-col items-center justify-center bg-red-200 rounded-lg shadow-md p-3"}>
                                <Title level={3}>
                                    Manager <StarOutlined/>
                                </Title>
                                <Title level={2}>
                                    {employees.filter((e) => {
                                        return e.title.includes("Manager")
                                    }).length}
                                </Title>
                            </div>
                        </div>
                    </div>

            }
        </>
    );
};

export default Home;