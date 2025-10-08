import {Layout, Menu} from 'antd';
import {NavLink, Outlet} from "react-router-dom";
import React from "react";

const {Header, Footer} = Layout;

const items = [
    {
        key: 1,
        label: <NavLink to={'/'}>Home</NavLink>
    },
    {
        key: 2,
        label: <NavLink to={'/employees'}>Employees</NavLink>
    }
]

const OrdLayout: React.FC = () => {

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center'}}>
                <div className="demo-logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    style={{flex: 1, minWidth: 0}}
                />
            </Header>

            <Outlet></Outlet>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default OrdLayout;