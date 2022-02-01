import {
	GiftOutlined,
	HistoryOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { pathConstants } from "constants/pathConstants";
import Layout from "layouts/Layout";
import { useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import Cart from "../Cart";
import HistoryGift from "../HistoryGift";
import ListGift from "../ListGift";
import "./index.css";

const { SubMenu } = Menu;

function HomeGift() {
	const { addedItems } = useSelector((state) => state.cart);

	return (
		<Layout>
			<div className="gift__container">
				<div className="gift__menu">
					<Menu defaultOpenKeys={["gift"]} mode="inline">
						<SubMenu key="gift" icon={<GiftOutlined />} title="Gift exchange">
							<Menu.Item icon={<GiftOutlined />} key="gift-available">
								<Link to="/gift">Gift available</Link>
							</Menu.Item>
							<Menu.Item
								icon={
									<ShoppingCartOutlined
										style={{ color: addedItems ? "#DB5126" : "#555" }}
									/>
								}
								key="cart"
							>
								<Link to="/gift/cart">Cart</Link>
							</Menu.Item>
							<Menu.Item icon={<HistoryOutlined />} key="history">
								<Link to="/gift/history">History</Link>
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="gift__content">
					<Switch>
						<Route exact path={pathConstants.GIFT}>
							<ListGift />
						</Route>
						<Route exact path={pathConstants.CART}>
							<Cart />
						</Route>
						<Route exact path={pathConstants.GIFT_HISTORY_LEARNER}>
							<HistoryGift />
						</Route>
					</Switch>
				</div>
				<div className="gift__adv"></div>
			</div>
		</Layout>
	);
}
export default HomeGift;
