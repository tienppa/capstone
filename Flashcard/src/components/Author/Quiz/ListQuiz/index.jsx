import { Button, Card, Tag, Descriptions, Typography } from "antd";
import quizAPI from "apis/quiz.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	FieldTimeOutlined,
	TagOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import "./index.css";

const { Text } = Typography;

function ListQuiz() {
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");
	const [quizs, setQuizs] = useState([]);
	const [subjectName, setSubjectName] = useState("");

	useEffect(() => {
		const getQuiz = async () => {
			const response = await quizAPI.getQuizBySubjectId({
				subjectId: subjectId,
			});
			if (response.status === "Success") {
				setQuizs(response.testFound);
				setSubjectName(response.subjectName);
			}
		};
		getQuiz();
	}, [subjectId]);

	return (
		<div className="all-quiz__container">
			<span className="all-quiz__subject-title">
				{subjectName && (
					<Link to={"/author/lession?subjectId=" + subjectId}>
						<Tag color="#f50">Back</Tag> {subjectName}
					</Link>
				)}
			</span>
			<div className="all-quiz__wrap">
				{quizs &&
					quizs.map((quiz) => {
						return (
							<Card
								size="small"
								title={
									<Link
										to={"/author/quiz-detail?quizId=" + quiz.id}
										key={quiz.id}
									>
										{quiz.testName}
									</Link>
								}
								extra={
									quiz.isManyLession === true && (
										<Tag color="geekblue">Extra quiz</Tag>
									)
								}
								className="all-quiz__card"
							>
								<Descriptions>
									<Descriptions.Item>
										<Text strong>{quiz.total_question}</Text> -Question
									</Descriptions.Item>
									<Descriptions.Item>
										<FieldTimeOutlined />{" "}
										{Moment(quiz.createdDate).format("YYYY-MM-DD")}
									</Descriptions.Item>
								</Descriptions>
								<Descriptions>
									{quiz.lessions.map((lession, index) => {
										if (index < 4) {
											return (
												<Descriptions.Item key={lession.lessionId}>
													<TagOutlined /> {lession.lessionName}
												</Descriptions.Item>
											);
										}
									})}
								</Descriptions>
								<div className="all-quiz__button-wrap">
									<div className="all-quiz__buttons">
										<Button type="primary">
											<DeleteOutlined />
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
			</div>
		</div>
	);
}
export default ListQuiz;
