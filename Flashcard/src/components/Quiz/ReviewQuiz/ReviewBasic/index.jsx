import { Button, Card, Progress, Table, Typography } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

function ReviewBasic() {
	const history = useHistory();
	const { review } = useSelector((state) => state.quiz);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(review ? review.NumOfTakeQuizTime : 0);
	const [percent, setPercent] = useState(
		review ? (review.numOfCorrect / review.numOfQuestion) * 100 : 0
	);

	const callLink = (id) => {
		history.push(`/quiz/review-detail?id=${id}`);
	};

	let data = [];
	review &&
		data.push({
			key: review.quizHistoryId,
			name: review.testName,
			totalQuestion: review.numOfQuestion,
			numOfCorrect: review.numOfCorrect,
			point: review.point.toFixed(2),
			count: review.NumOfTakeQuizTime,
			percent: percent,
		});

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Total Question",
			dataIndex: "totalQuestion",
			key: "totalQuestion",
			width: "20%",
		},
		{
			title: "Total Correct",
			dataIndex: "numOfCorrect",
			key: "numOfCorrect",
			width: "20%",
		},
		{
			title: "Point",
			dataIndex: "point",
			key: "point",
			width: "15%",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 150,
			render: (_, record) => {
				let isTrue = record.count >= 3 || percent >= 80;
				return (
					<Button
						disabled={!isTrue ? true : false}
						type="primary"
						onClick={() => callLink(record.key)}
					>
						Review
					</Button>
				);
			},
		},
	];

	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-one">
				<Meta
					style={{ width: "100%", margin: "5px" }}
					avatar={
						<Progress type="circle" percent={percent.toFixed(2)} width={80} />
					}
					title="Finish"
					description="Exam completion level"
				/>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					loading={loading}
					footer={() => (
						<Text italic>
							You need to take the test at least
							<Text mark> 3 </Text>
							times or the total score is more than
							<Text mark> 80% </Text> to unlock
						</Text>
					)}
				/>
			</div>
		</div>
	);
}
export default ReviewBasic;
