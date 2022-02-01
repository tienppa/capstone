import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import privateSubjectAPI from "apis/private.subject.api";
import { Base64 } from "js-base64";
import Moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";

function Subject(props) {
	const { rSubject } = props;
	let request = [];

	request = rSubject.filter((item) => {
		if (item.statusId === 1) {
			return true;
		}
	});

	const data = [];
	for (let item in request) {
		data.push({
			key: request[item].id,
			from: request[item].requestFrom,
			tag: request[item].name,
			time: Moment(request[item].requestedAt).format("YYYY-MM-DD"),
			status: request[item].statusId,
		});
	}

	const columns = [
		{
			title: "From",
			dataIndex: "from",
			key: "from",
			render: (text) => (
				<Link to={`/activity/user?uid=${Base64.encode(text)}`}>{text}</Link>
			),
		},
		{
			title: "Tag",
			dataIndex: "tag",
			key: "tag",
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			render: (text) => <Tag color="blue">{text}</Tag>,
			sorter: (a, b) => new Date(a.date) - new Date(b.date),
			responsive: ["xxl"],
			width: "10%",
		},
		{
			title: "Status",
			dataIndex: "status",
			width: "10%",
			key: "status",
			render: (status) => <Tag color="processing">Waiting</Tag>,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: "20%",
			render: (_, record) =>
				data.length >= 1 ? (
					<>
						<Button
							style={{ marginRight: "8px" }}
							onClick={() => {
								approve(record.key);
							}}
						>
							Accept
						</Button>
						<Popconfirm
							title="Sure to denine?"
							onConfirm={() => denine(record.key)}
						>
							<Button danger>Denine</Button>
						</Popconfirm>
					</>
				) : null,
		},
	];

	const refresh = () => {
		props.parentCallback();
	};

	const approve = async (id) => {
		const response = await privateSubjectAPI.approveRequest({ requestId: id });
		if (response.status === "Success") {
			message.success(response.message);
			refresh();
		} else {
			message.error(response.message);
		}
	};

	const denine = async (id) => {
		const response = await privateSubjectAPI.denineRequest({ requestId: id });
		if (response.status === "Success") {
			message.success(response.message);
			refresh();
		} else {
			message.error(response.message);
		}
	};

	return (
		<div style={{ padding: "0 0 0 25px" }}>
			<Space style={{ marginBottom: 16, width: "100%" }}>
				<Tag color="#f50">Subject</Tag>
			</Space>
			<Table size="small" columns={columns} dataSource={data} />
		</div>
	);
}
export default Subject;
