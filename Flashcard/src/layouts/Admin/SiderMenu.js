import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import {
	DashboardOutlined,
	FundProjectionScreenOutlined,
	PartitionOutlined,
	SettingOutlined,
	TeamOutlined,
} from "@ant-design/icons";
import "../Admin/Style.less";

const { SubMenu } = Menu;

const { Sider } = Layout;

function SiderMenu({ handleOnCollapse, collapsed }) {
	const theme = "light";

	const history = useHistory();

	const handleSiderMenuClick = (action) => {
		console.log("menu:", action);
		switch (action.key) {
			case "dashboard":
				history.push("/admin");
				break;
			case "showStudents":
				if (!history.location.pathname !== "/admin/student-management") {
					history.push("/admin/student-management");
				}
				break;
			// case 'addProduct':
			//   history.push('/add-product');
			//   break;
			// case 'showCustomers':
			//   history.push('/customers');
			//   break;
			// case 'addCustomer':
			//   history.push('/add-customer');
			//   break;
			// default:
			//   history.push('/');
		}
	};

	return (
		<Sider
			breakpoint="lg"
			collapsedWidth="80"
			onCollapse={handleOnCollapse}
			collapsed={collapsed}
			width="256"
			theme={theme}
		>
			<a>
				<div className="menu-logo" />
			</a>
			<Menu
				mode="inline"
				theme={theme}
				onClick={handleSiderMenuClick}
				defaultOpenKeys={["dashboard", "products", "customers"]}
			>
				<Menu.Item key="dashboard">
					<DashboardOutlined />
					<span className="nav-text">Dashboard</span>
				</Menu.Item>

				<Menu.Item key="showStudents" icon={<PartitionOutlined />}>
					<span className="nav-text">Account</span>
				</Menu.Item>
				<SubMenu
					key="customers"
					title={
						<span>
							<TeamOutlined />
							<span>Advertisement</span>
						</span>
					}
				>
					<Menu.Item key="showCustomers">
						<span className="nav-text">Show Ads</span>
					</Menu.Item>
					<Menu.Item key="addCustomer">
						<span className="nav-text">Add Ads</span>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="settings">
					<SettingOutlined />
					<span className="nav-text">Settings</span>
				</Menu.Item>
				<Menu.Item key="reports">
					<FundProjectionScreenOutlined />
					<span className="nav-text">Reports</span>
				</Menu.Item>
			</Menu>
		</Sider>
	);
}

export default SiderMenu;
