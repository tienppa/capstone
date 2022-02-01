import { Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import Moment from "moment";
import { Base64 } from "js-base64";

function History(props) {
	const { rSubject, rLession } = props;
	let history = [];
	let filterHistory = [];

	history = [].concat(rSubject, rLession);
	filterHistory = history.filter((item) => {
		if (item.statusId !== 1) {
			return true;
		}
	});

	const data = [];
	for (let item in filterHistory) {
		data.push({
			key: filterHistory[item].id,
			from: filterHistory[item].requestFrom,
			unLock: filterHistory[item].name,
			time: Moment(filterHistory[item].requestedAt).format("YYYY-MM-DD"),
			status: filterHistory[item].statusId,
		});
	}
	const columns = [
		{
			title: "From",
			dataIndex: "from",
			key: "from",
			render: (text) => (
				<Link to={`/profile/user?uid=${Base64.encode(text)}`}>{text}</Link>
			),
		},
		{
			title: "Tag",
			dataIndex: "unLock",
			key: "unLock",
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (text) => <Tag color="blue">{text}</Tag>,
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
			responsive: ["xxl"],
			width: "15%",
		},
		{
			title: "Status",
			dataIndex: "status",
			width: "15%",
			key: "status",
			filters: [
				{
					text: "Approved",
					value: 2,
				},
				{
					text: "Denied",
					value: 3,
				},
			],
			onFilter: (value, record) => {
				return record.status === value;
			},
			render: (status) => {
				if (status === 2) {
					return <Tag color="success">Approved</Tag>;
				} else {
					return <Tag color="error">Denine</Tag>;
				}
			},
		},
	];

	return (
		<div style={{ padding: "0 0 0 25px" }}>
			<Space style={{ marginBottom: 16, width: "100%" }}>
				<Tag color="#f50">History</Tag>
			</Space>
			<Table size="small" columns={columns} dataSource={data} />
		</div>
	);
}
export default History;
