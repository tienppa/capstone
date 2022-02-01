import { AppstoreOutlined, StockOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import privateLessionAPI from "apis/private.lession.api";
import privateSubjectAPI from "apis/private.subject.api";
import History from "components/Profile/Activity/History";
import Info from "components/Profile/Activity/Info";
import Lession from "components/Profile/Activity/Lession";
import Point from "components/Profile/Activity/Point";
import Subject from "components/Profile/Activity/Subject";
import { pathConstants } from "constants/pathConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { setActivity } from "redux/actions/activity";
import "../assets/css/profile_layout.css";
import EditPassword from "../components/Profile/EditPassword";
import EditProfile from "../components/Profile/EditProfile";
import Feedback from "../components/Profile/Feedback";
import HobbyTopic from "../components/Profile/HobbyTopic";
import Layout from "./Layout";

const { SubMenu } = Menu;

function ProfileLayout() {
	let { path, url } = useRouteMatch();
	const history = useHistory();

	const [rLession, setRLession] = useState([]);
	const [rSubject, setRSubject] = useState([]);
	const { activity } = useSelector((state) => state.activity);

	useEffect(() => {
		getRequestSubject();
		getRequestLession();
	}, [activity]);

	const getRequestLession = async () => {
		const response = await privateLessionAPI.requestToMe();
		if (response.status === "Success") {
			setRLession(response.listRequest);
		}
	};

	const getRequestSubject = async () => {
		const response = await privateSubjectAPI.requestToMe();
		if (response.status === "Success") {
			setRSubject(response.listRequest);
		}
	};

	const handleClick = (e) => {
		history.push(e.key);
	};

	return (
		<Layout>
			<div className="fprofile__container">
				<div className="fprofile__menu">
					<Menu
						defaultSelectedKeys={["profile"]}
						defaultOpenKeys={["sub_profile", "sub_activity"]}
						mode="inline"
						onClick={handleClick}
					>
						<SubMenu
							key="sub_profile"
							icon={<AppstoreOutlined />}
							title="PROFILE"
						>
							<Menu.Item key="/profile">Overview</Menu.Item>
							<Menu.Item key="/profile/edit-password">Edit Password</Menu.Item>
							<Menu.Item key="/profile/hobby-topic">Hobby Topic</Menu.Item>
							<Menu.Item key="/profile/feedback">Feedback</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub_activity"
							icon={<StockOutlined />}
							title="ACTIVITY"
						>
							<Menu.ItemGroup key="request" title="Request">
								<Menu.Item key="/profile/request/subject">Subject</Menu.Item>
								<Menu.Item key="/profile/request/lesson">Lesson</Menu.Item>
							</Menu.ItemGroup>
							<Menu.Item key="/profile/history">History</Menu.Item>
							<Menu.Item key="/profile/point">Point</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="fprofile__main">
					<Switch>
						<Route exact path={pathConstants.PROFILE}>
							<EditProfile />
						</Route>

						<Route path={`${path}/edit-password`}>
							<EditPassword />
						</Route>
						<Route path={`${path}/hobby-topic`}>
							<HobbyTopic />
						</Route>
						<Route path={`${path}/feedback`}>
							<Feedback />
						</Route>
						<Route path={`${path}/request/subject`}>
							<Subject rSubject={rSubject} parentCallback={getRequestSubject} />
						</Route>
						<Route path={`${path}/request/lesson`}>
							<Lession rLession={rLession} parentCallback={getRequestSubject} />
						</Route>
						<Route path={`${path}/history`}>
							<History rSubject={rSubject} rLession={rLession} />
						</Route>
						<Route path={`${path}/point`}>
							<Point />
						</Route>
						<Route path={`${path}/user`}>
							<Info />
						</Route>
					</Switch>
				</div>
				<div className="fprofile__adv"></div>
			</div>
		</Layout>
	);
}
export default ProfileLayout;
