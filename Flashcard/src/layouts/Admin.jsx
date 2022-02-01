import { Layout as AntdLayout } from "antd";
import Dashboard from "pages/Admin/dashboard/Dashboard";
import ShowStudent from "pages/Admin/StudentManagement/ShowStudent";
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "../assets/css/admin_layout.css";
import LayoutBanner from "./Admin/LayoutBanner";
import SiderMenu from "./Admin/SiderMenu";
import Layout from "./Layout";
// admin layout

const { Content } = AntdLayout;

export default function AdminLayout(props) {
	let { path } = useRouteMatch();
	const [collapsed, setCollapsed] = useState(false);

	const handleOnCollapse = () => {
		setCollapsed((prevState) => !prevState);
	};

	return (
		<Layout>
			<AntdLayout style={{ minHeight: "100vh" }}>
				<SiderMenu collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
				<AntdLayout>
					<LayoutBanner
						collapsed={collapsed}
						handleOnCollapse={handleOnCollapse}
					/>
					<Content style={{ margin: "0px 16px 0" }}>
						<div style={{ padding: 24, background: "#fff", minHeight: 20 }}>
							<Switch>
								<Route exact path={path}>
									<Dashboard />
								</Route>
								<Route path={`${path}/student-management`}>
									<ShowStudent />
								</Route>

								{/* <Route path={`${path}/flashcard`}>
									<Flashcard subjectInfo={subjectInfo} />
								</Route> */}
							</Switch>
						</div>
					</Content>
				</AntdLayout>
			</AntdLayout>
		</Layout>
	);
}
