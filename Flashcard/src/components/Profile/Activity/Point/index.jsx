import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import pointAPI from "apis/point.api";
import Moment from "moment";
import { useEffect, useState } from "react";

function Point() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const getPointHistory = async () => {
			const response = await pointAPI.getPointHistory();
			if (response.status === "Success") {
				setHistory(response.listHistory);
			}
		};
		getPointHistory();
	}, []);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Description",
			dataIndex: "desc",
			key: "desc",
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			render: (text) => {
				if (text === 1 || text === 2 || text === 6) {
					return <ArrowDownOutlined style={{ color: "red" }} />;
				} else {
					return <ArrowUpOutlined style={{ color: "blue" }} />;
				}
			},
		},
		{
			title: "Point",
			dataIndex: "point",
			key: "point",
			render: (text) => <Tag color="blue">{text}</Tag>,
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (text) => <Tag color="geekblue">{text}</Tag>,
		},
	];

	const data = [];
	history.map((item) => {
		data.push({
			key: item.id,
			name: item.typeName,
			desc: item.usingDescription,
			type: item.typeId,
			point: item.point,
			time: Moment(item.dateOfUse).format("YYYY-MM-DD"),
		});
	});

	return (
		<div style={{ padding: "0 0 0 25px" }}>
			<Space style={{ marginBottom: 16, width: "100%" }}>
				<Tag color="#f50">Point History</Tag>
			</Space>
			<Table size="small" columns={columns} dataSource={data} />
		</div>
	);
}
export default Point;
