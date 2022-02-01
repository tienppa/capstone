import { RightOutlined, TagOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Descriptions, Tag, Typography } from "antd";
import quizAPI from "apis/quiz.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { setQuizId, setQuizInfo } from "redux/actions/quiz";
import "./index.css";

const { Text } = Typography;

function RelatedQuiz() {
	const dispatch = useDispatch();
	const history = useHistory();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const id = query.get("subjectId");
	const [quizs, setQuizs] = useState([]);

	useEffect(() => {
		const getQuiz = async () => {
			const response = await quizAPI.getQuizBySubjectId({
				subjectId: id,
			});
			console.log(response);
			if (response.status === "Success") {
				setQuizs(response.testFound);
			}
		};
		getQuiz();
	}, [id]);

	const callMakeQuiz = (id, name, quantity, author) => {
		dispatch(setQuizId(id));
		dispatch(
			setQuizInfo({
				name: name,
				quantity: quantity,
				author: author,
			})
		);
		history.push("/quiz");
	};
	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-quizs--wrap">
				<div className="quiz-layout__content-quiz">
					{quizs &&
						quizs.map((item) => {
							return (
								<Card
									hoverable
									className="quiz-layout__content-card"
									size="small"
									title={
										<Text
											onClick={() => {
												callMakeQuiz(
													item.id,
													item.testName,
													item.total_question,
													item.author
												);
											}}
										>
											{item.testName}
											<RightOutlined />
										</Text>
									}
									key={item.id}
									extra={
										item.isManyLession === true && (
											<Tag color="geekblue">Extra</Tag>
										)
									}
								>
									<Descriptions>
										<Descriptions.Item>
											<Avatar
												size="small"
												style={{ color: "#eeeeee", backgroundColor: "#1890FF" }}
												icon={<UserOutlined />}
											/>{" "}
											{item.author}
										</Descriptions.Item>
										<Descriptions.Item>
											{Moment(item.createdDate).format("YYYY-MM-DD")}
										</Descriptions.Item>
										<Descriptions.Item>
											<Text strong>{item.total_question}</Text>-Questions
										</Descriptions.Item>
										{item.lessions.map((lession) => {
											return (
												<Descriptions.Item key={lession.lessionId}>
													<Link
														to={`/latest/flashcard?lessionId=${lession.lessionId}`}
													>
														<TagOutlined /> {lession.lessionName}
													</Link>
												</Descriptions.Item>
											);
										})}
									</Descriptions>
								</Card>
							);
						})}
				</div>
			</div>
		</div>
	);
}
export default RelatedQuiz;
