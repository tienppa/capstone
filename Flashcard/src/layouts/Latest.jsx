import {
	SearchOutlined,
	TagOutlined,
	CaretRightOutlined,
	AppstoreOutlined,
	FormOutlined,
} from "@ant-design/icons";
import { Radio, Space, Tag, Menu } from "antd";
import Flashcard from "components/Latest/Flashcard";
import FlashcardDetail from "components/Latest/FlashcardDetail";
import Lession from "components/Latest/Lession";
import SearchLatest from "components/Latest/Search";
import Suggest from "components/Latest/Suggest";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import { activeSearchType } from "redux/actions/latest";
import "../assets/css/latest_layout.css";
import Layout from "./Layout";

const { SubMenu } = Menu;

function LatestLayout() {
	const dispatch = useDispatch();
	let { path } = useRouteMatch();
	let location = useLocation();
	const [pathName, setPath] = useState("");

	useEffect(() => {
		setPath(location.pathname);
	}, [location.pathname]);

	let query = new URLSearchParams(location.search);
	let searchKey = query.get("key");

	const handleClick = (e) => {
		switch (e.key) {
			case "s_subject": {
				dispatch(activeSearchType("subject"));
				break;
			}
			case "s_lesson": {
				dispatch(activeSearchType("lesson"));
				break;
			}
			case "s_flashcard": {
				dispatch(activeSearchType("flashcard"));
				break;
			}
			default:
				break;
		}
	};

	return (
		<Layout>
			<div className="latest-container">
				<div className="latest-menu">
					<Menu
						onClick={handleClick}
						defaultSelectedKeys={["suggest"]}
						defaultOpenKeys={["suggest", "search"]}
						mode="inline"
					>
						<SubMenu key="suggest" icon={<AppstoreOutlined />} title="SUGGEST">
							<Menu.Item key="subject">
								<Link to="/latest">Subject</Link>
							</Menu.Item>
							<Menu.Item disabled key="lesson">
								Lesson
							</Menu.Item>
							<Menu.Item disabled key="flashcard">
								Flashcard
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="search"
							icon={<SearchOutlined />}
							title="SEARCH TYPE"
							disabled={pathName !== "/latest/search" ? true : false}
						>
							<Menu.Item
								disabled={pathName !== "/latest/search" ? true : false}
								key="s_subject"
							>
								Subject
							</Menu.Item>
							<Menu.Item
								disabled={pathName !== "/latest/search" ? true : false}
								key="s_flashcard"
							>
								Flashcard
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="latest-content">
					<div className="latest-content__wrap">
						<div className="latest-crumb__wrap">
							{location.pathname === "/latest" && (
								<div>
									<TagOutlined /> Suggest{" "}
									<div className="triangle triangle--right"></div>
								</div>
							)}
							{location.pathname === "/latest/lession" && (
								<div>
									<TagOutlined /> Lession
									<div className="triangle triangle--right"></div>
								</div>
							)}
							{location.pathname === "/latest/flashcard" && (
								<div>
									<TagOutlined /> Flashcard
									<div className="triangle triangle--right"></div>
								</div>
							)}
							{location.pathname === "/latest/question" && (
								<div>
									<TagOutlined /> Question
									<div className="triangle triangle--right"></div>
								</div>
							)}
							{location.pathname === "/latest/search" && (
								<div>
									<SearchOutlined /> {searchKey}
									<div className="triangle triangle--right"></div>
								</div>
							)}
						</div>
						<div className="latest-content--padding">
							<Switch>
								<Route exact path={path}>
									<Suggest />
								</Route>
								<Route path={`${path}/lession`}>
									<Lession />
								</Route>
								<Route path={`${path}/flashcard`}>
									<Flashcard />
								</Route>
								<Route path={`${path}/flashcard-detail`}>
									<FlashcardDetail />
								</Route>
								<Route path={`${path}/search`}>
									<SearchLatest />
								</Route>
							</Switch>
						</div>
					</div>
				</div>
				<div className="latest-adv"></div>
			</div>
		</Layout>
	);
}

export default LatestLayout;
