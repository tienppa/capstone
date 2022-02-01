import {
	LogoutOutlined,
	MenuOutlined,
	PoundOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, Menu, Tag } from "antd";
import Notification from "components/Notification";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logoutAction } from "redux/actions/user";
import "../Header/header.css";

const { Search } = Input;

function Header() {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const [searchKey, setSearchKey] = useState(query.get("key"));

	const [isActive, setActive] = useState(false);
	const [isShow, setShow] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		localStorage.removeItem("persist:root");
		Notification("success", "Logout success!");
		const action = logoutAction({});
		dispatch(action);
		history.push("/login");
	};
	const onSearch = (key) => {
		history.push("/latest/search?key=" + key);
	};
	const onChange = (e) => {
		setSearchKey(e.target.value);
	};

	const menu = (
		<Menu>
			<Menu.Item key="0">
				Point: <Tag color="#f50">{user && user.point}</Tag>
			</Menu.Item>
		</Menu>
	);

	return (
		<>
			<div className="header">
				<div className="header__inner">
					<Link className="logo" to={user ? "/latest" : "/"} id="header-logo">
						Flashcard
					</Link>
					<div className="header__menu">
						{user && user.roleId !== 2 && (
							<div className="header__search">
								<Search
									name="search"
									type="text"
									min={4}
									onSearch={onSearch}
									onChange={onChange}
									value={searchKey}
									style={{ fontWeight: 300 }}
								/>
							</div>
						)}

						{user && user.roleId === 2 && (
							<Link to="/profile">
								<li className="menu__child-item">{user.fullName} </li>
							</Link>
						)}

						<div className={`menu__wrap ${isActive ? "show-menu" : ""}`}>
							<ul className="menu__list">
								{!user ? (
									<>
										<li className="menu__item">
											<Link className="menu__link" to="/login">
												Login
											</Link>
										</li>
										<li className="menu__item">
											<Link className="menu__link" to="/register">
												Register
											</Link>
										</li>
									</>
								) : (
									<>
										<li className="menu__item menu_wrap">
											<Link to={"/profile/point"} className="menu__item-point">
												{user?.point + " "}
												<PoundOutlined />
											</Link>
											<Badge dot={true}>
												<Avatar
													className="icon__wrap"
													onClick={() => setShow(!isShow)}
													icon={<UserOutlined />}
													style={{
														backgroundColor: "#1890FF",
														cursor: "pointer",
													}}
												/>
											</Badge>
											<div className={`menu__child ${isShow && "menu-show"}`}>
												<Link to="/profile">
													<h3 className="profile--hover">
														{user && user.fullName}
													</h3>
												</Link>
												<ul className="menu__child-list">
													{user?.roleId === 3 && (
														<Link to="/donor">
															<li className="menu__child-item">Donor</li>
														</Link>
													)}
													{user?.roleId !== 2 && (
														<>
															<Link to="/latest">
																<li className="menu__child-item">Suggest</li>
															</Link>
															<Link to="/author">
																<li className="menu__child-item">Author</li>
															</Link>
															<Link to="/gift">
																<li className="menu__child-item">Gift</li>
															</Link>
														</>
													)}

													<li
														className="menu__child-item"
														onClick={handleLogout}
													>
														<button>
															Logout <LogoutOutlined />
														</button>
													</li>
												</ul>
											</div>
										</li>
									</>
								)}
							</ul>
						</div>
						<div className="header__toggle" id="header-toggle">
							<MenuOutlined
								className="menu__icon"
								onClick={() => setActive(!isActive)}
							/>
						</div>
					</div>
				</div>
			</div>
			{isShow ? (
				<div className="nav__overlay" onClick={() => setShow(!isShow)}></div>
			) : (
				<></>
			)}
			{isActive ? (
				<div
					className="nav__overlay"
					onClick={() => setActive(!isActive)}
				></div>
			) : (
				<></>
			)}
		</>
	);
}
export default Header;
