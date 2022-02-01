import {
	Affix,
	Button,
	Card,
	Checkbox,
	Form,
	Skeleton,
	Space,
	Table,
	Typography,
	Descriptions,
} from "antd";
import quizAPI from "apis/quiz.api";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

const { Text } = Typography;
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const labelStyle = {
	color: "#5564cc",
	fontWeight: 400,
};

function ReviewDetail() {
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	const historyId = query.get("id");
	const [detail, setDetail] = useState();
	const [history, setHistory] = useState([]);
	const [choice, setChoice] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getReviewDetail = async () => {
			const response = await quizAPI.reviewDetail({ historyId: historyId });
			if (response.status === "Success") {
				setDetail(response.test_detail);
				setHistory(response.history);
				let data = getCorect(response.user_choice);
				setChoice(data);
				setLoading(false);
			} else {
				console.log(response.message);
			}
		};
		getReviewDetail();
	}, [historyId]);

	const getCorect = (values) => {
		let array = [];
		values.map((item) => {
			JSON.parse(item.optionId).map((element) => {
				array.push(element);
			});
		});
		return array;
	};

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-one">
				<div className="review-latest__detail">
					<Skeleton loading={loading} active>
						<Form initialValues={{ "checkbox-group": choice }}>
							<Form.Item name="checkbox-group">
								<Checkbox.Group style={{ width: "100%" }}>
									{detail &&
										detail.listQuestion.map((item, index) => {
											return (
												<div
													className="review-latest__item"
													key={item.questionId}
												>
													<div className="review-latest__item-question">
														{"Q." + ++index} {renderHTML(item.questionContent)}
													</div>
													<div className="review-latest__item-options">
														<Space direction="vertical">
															{item.options.map((opp, i) => {
																return (
																	<Checkbox
																		key={opp.optionId}
																		disabled
																		value={opp.optionId}
																	>
																		{alphabet[i] + ") "}
																		{opp.optionContent}
																	</Checkbox>
																);
															})}
														</Space>
													</div>
													<div className="review-latest__item-ans">
														<Text>The correct answer is:</Text>
														{item.options.map((opp, j) => {
															if (opp.isCorrect === true) {
																return (
																	<Text key={opp.optionId}>
																		{" " + alphabet[j] + " "}
																	</Text>
																);
															}
														})}
													</div>
												</div>
											);
										})}
								</Checkbox.Group>
							</Form.Item>
						</Form>
						<div className="review-latest__detail-button">
							<Button type="primary">Finish review</Button>
						</div>
					</Skeleton>
				</div>
			</div>
			<div className="quiz-layout__content-two">
				<Skeleton loading={loading} active>
					<Affix>
						<Card size="small" className="quiz-layout__content-two-affix">
							<Descriptions title="Quiz info" bordered size="small">
								<Descriptions.Item
									label="Quiz"
									span={3}
									labelStyle={labelStyle}
								>
									{history.testName}
								</Descriptions.Item>
								<Descriptions.Item
									label="Time"
									span={3}
									labelStyle={labelStyle}
								>
									{Moment(history.takeQuizAt).format("YYYY-MM-DD")}
								</Descriptions.Item>
								<Descriptions.Item
									label="Question"
									span={3}
									labelStyle={labelStyle}
								>
									{history.numOfQuestion} Terms
								</Descriptions.Item>
								<Descriptions.Item
									label="Correct"
									span={3}
									labelStyle={labelStyle}
								>
									{history.numOfCorrect}
								</Descriptions.Item>
								<Descriptions.Item
									label="Point"
									span={3}
									labelStyle={labelStyle}
								>
									{history.totalCore?.toFixed(2)}
								</Descriptions.Item>
							</Descriptions>
							<Button type="primary" style={{ width: "100%" }}>
								Finish review
							</Button>
						</Card>
					</Affix>
				</Skeleton>
			</div>
		</div>
	);
}
export default ReviewDetail;
