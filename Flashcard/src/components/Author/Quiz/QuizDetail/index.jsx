import { CheckOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Switch, Tag } from "antd";
import quizAPI from "apis/quiz.api";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./index.css";

function QuizDetail() {
	const history = useHistory();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const quizId = query.get("quizId");
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	const [questions, setQuestions] = useState([]);
	const [quiztestInfo, setQuiztestInfo] = useState([]);
	const [isHidden, setHidden] = useState(false);

	useEffect(() => {
		const viewQuizDetail = async () => {
			const response = await quizAPI.viewQuizDetail({ quizTestId: quizId });
			console.log(response);
			if (response.status === "Success") {
				setQuestions(response.listQuestion);
				setQuiztestInfo(response.quiztestInfo);
			} else {
				setQuestions([]);
			}
		};
		viewQuizDetail();
	}, [quizId]);

	function onChange() {
		setHidden(!isHidden);
	}

	const backQuizInfo = (subjectId) => {
		history.push(`/author/view-quiz?subjectId=${subjectId}`);
	};

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<div className="quiz-detail__container">
			<div className="quiz-detail__title-wrap">
				<span className="quiz-detail__title">
					<LeftOutlined
						className="backToBefore"
						onClick={() => {
							backQuizInfo(quiztestInfo.subjectId);
						}}
					/>
					<Tag color="#f50">Quiz: </Tag>
					{quiztestInfo && quiztestInfo.testName}
				</span>
			</div>
			<div className="quiz-detail__title-wrap">
				<Link to={"/latest/quiz-now?quizId=" + quizId}>
					<Button type="primary">Quiz now</Button>
				</Link>
				<div>
					Show answer <Switch onChange={onChange} />
				</div>
			</div>
			<div className="quiz-detail__main">
				{questions &&
					questions.map((item, index) => {
						return (
							<div className="quiz-detail__main-content">
								<div className="quiz-detail__main-question">
									{++index + ") "} {renderHTML(item.questionContent)}
								</div>
								<div className="quiz-detail__main-options">
									{item.options.map((option, index) => {
										return (
											<span
												className="quiz-detail__main-option"
												key={option.optionId}
											>
												{alphabet[index] + ") "} {option.optionContent}{" "}
												{isHidden && option.isCorrect === true && (
													<CheckOutlined
														style={{ color: "#4257B2", padding: "0 10px" }}
													/>
												)}
											</span>
										);
									})}
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
export default QuizDetail;
