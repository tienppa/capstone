import { CaretUpFilled, InfoCircleFilled } from "@ant-design/icons";
import { Card, Col, Row, Tooltip } from "antd";
import React from "react";
import ChartCard from "../../../components/admins/component/chart/ChartCard";
import MiniArea from "../../../components/admins/component/chart/MiniArea";
import MiniBar from "../../../components/admins/component/chart/MiniBar";
import MiniProgress from "../../../components/admins/component/chart/MiniProgress";
import ProductBarChart from "../../../components/admins/component/chart/ProductBarChart";
import ProductPieChart from "../../../components/admins/component/chart/ProductPieChart";
import { movementSummary, visitSummary } from "./Constants";

function Dashboard() {
	const topColResponsiveProps = {
		xs: 24,
		sm: 12,
		md: 12,
		lg: 12,
		xl: 6,
		style: { marginBottom: 24 },
	};

	return (
		<>
			<Row gutter={24} type="flex">
				<Col span={12}>
					<Card title="Weekly Sale Report">
						<ProductBarChart />
					</Card>
				</Col>
				<Col span={12}>
					<Card title="Sale Summary">
						<ProductPieChart />
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default Dashboard;
