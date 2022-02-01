import "./index.css";
import { Table, Tag, Space, Skeleton, Typography, Card, Progress } from "antd";
import quizAPI from "apis/quiz.api";
import { useEffect, useState } from "react";
import Moment from "moment";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Meta } = Card;

function ReviewList() {
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getHistory = async () => {
			const response = await quizAPI.getHistory();
			if (response.status === "Success") {
				setHistory(response.listHistory);
				setLoading(false);
			} else {
				console.log(response.message);
			}
		};
		getHistory();
	}, []);
	const columns = [
		{
			title: "Index",
			dataIndex: "index",
			key: "index",
			width: "5%",
		},
		{
			title: "Quiz",
			dataIndex: "quiz",
			key: "quiz",
		},
		{
			title: "Subject",
			dataIndex: "subject",
			key: "subject",
			width: "20%",
			responsive: ["xl"],
			render: (text) => (
				<Text style={{ width: "100%" }}>
					<Tag color="gold" className="tag-subject">
						{text}
					</Tag>
				</Text>
			),
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
			width: "20%",
			responsive: ["xl"],
		},
		{
			title: "Point",
			dataIndex: "point",
			key: "point",
			width: "10%",
			render: (text) => (
				<Tag color="blue" className="tag-point">
					{text}
				</Tag>
			),
		},
		{
			title: "Action",
			key: "action",
			width: "15%",
			render: (text, record) => (
				<Space size="middle">
					<Link to={`/quiz/review-detail?id=${record.action}`}>Review</Link>
				</Space>
			),
		},
	];

	let data = [];
	if (history) {
		history.map((item, index) => {
			data.push({
				key: "1",
				index: ++index,
				quiz: item.testName,
				subject: item.subjectName,
				time: Moment(item.takeQuizAt).format("YYYY-MM-DD"),
				point: item.totalCore.toFixed(2),
				action: item.historyId,
			});
		});
	}
	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-one">
				<Card className="review-list__info">
					<Meta
						avatar={<Progress type="circle" percent={100} width={50} />}
						title="Completed"
						description={history.length + " Quizs"}
					/>
				</Card>
				<Skeleton loading={loading} active>
					<Table size="small" columns={columns} dataSource={data} />
				</Skeleton>
			</div>
			<div className="quiz-layout__content-two"></div>
		</div>
	);
}
export default ReviewList;
