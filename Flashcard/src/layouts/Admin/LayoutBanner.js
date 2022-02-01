import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import "../Admin/Style.less";

const { Header } = Layout;
const { SubMenu } = Menu;

function LayoutBanner({ collapsed, handleOnCollapse }) {
	const getCollapseIcon = () => {
		if (collapsed) {
			return (
				<MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />
			);
		}
		return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
	};

	const handleLanguageMenuClick = () => {};
	const handleSettingMenuClick = () => {};
	const handleLogout = () => {};

	return (
		<>
			<div
				style={{
					float: "left",
					width: "100%",
					alignSelf: "center",
					display: "flex",
				}}
			>
				{window.innerWidth > 992 && getCollapseIcon()}
			</div>
		</>
	);
}

export default LayoutBanner;
