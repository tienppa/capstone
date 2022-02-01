import { AppstoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import ListAdv from "components/Donor/Advertisement/ListAds";
import List from "components/Donor/List";
import HistoryGift from "components/Gift/HistoryGift";
import { pathConstants } from "constants/pathConstants";
import { Link, Route, Switch } from "react-router-dom";
import "../assets/css/donor_layout.css";
import Layout from "./Layout";

const { SubMenu } = Menu;

function Donor() {
	return (
		<Layout>
			<div className="ldonor__container">
				<div className="ldonor__menu">
					<Menu defaultOpenKeys={["donor"]} mode="inline">
						<SubMenu key="donor" icon={<AppstoreOutlined />} title="DONOR">
							<Menu.Item key="services">
								<Link to="/donor">Services</Link>
							</Menu.Item>
							<Menu.Item key="advertisement">
								<Link to="/donor/ads">Advertisement</Link>
							</Menu.Item>
							<Menu.Item key="gift">
								<Link to="/donor/gift-history">Gift history</Link>
							</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="ldonor__main">
					<Switch>
						<Route exact path={pathConstants.DONOR}>
							<List />
						</Route>
						<Route path={pathConstants.ADV}>
							<ListAdv />
						</Route>
						<Route path={pathConstants.GIFT_HISTORY}>
							<HistoryGift />
						</Route>
					</Switch>
				</div>
				<div className="ldonor__adv"></div>
			</div>
		</Layout>
	);
}
export default Donor;
