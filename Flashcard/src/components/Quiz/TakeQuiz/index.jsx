import { FormOutlined } from "@ant-design/icons";
import {
	Affix,
	Button,
	Card,
	Checkbox,
	Form,
	message,
	Modal,
	Space,
	Statistic,
	Typography,
} from "antd";
import quizAPI from "apis/quiz.api";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setQuizContent, setQuizReview } from "redux/actions/quiz";
import "./index.css";

const { Text } = Typography;
const { confirm } = Modal;
let list = [];

function TakeQuiz() {
	const history = useHistory();
	const dispatch = useDispatch();
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	const { quiz, quizId } = useSelector((state) => state.quiz);
	const [form] = Form.useForm();
	const [selected, setSelect] = useState([]);
	const [questionId, setQuestionId] = useState();
	const [timer, setTimer] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const countRef = useRef(null);

	const handlePause = () => {
		clearInterval(countRef.current);
		setIsPaused(false);
	};

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(true);
		countRef.current = setInterval(() => {
			setTimer((timer) => timer + 1);
		}, 1000);
	};

	const formatTime = () => {
		const getSeconds = `0${timer % 60}`.slice(-2);
		const minutes = `${Math.floor(timer / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
		return `${getHours} : ${getMinutes} : ${getSeconds}`;
	};

	useEffect(() => {
		handleStart();
	}, [quiz]);

	const submitQuiz = async (params) => {
		handlePause();
		const response = await quizAPI.submitQuiz(params);
		console.log(response);
		if (response.status === "Success") {
			message.success("Submit quiz finish");
			console.log(response);
			dispatch(setQuizReview(response.result));
			history.push("/quiz/review");
		} else {
			message.error(response.message);
		}
		// dispatch(setQuizContent([]));
		// setSelect([]);
	};

	const onFinish = (values) => {
		handlePause();
		if (!values) return;
		let ans = [];
		for (let item in values) {
			if (item === undefined) {
				item = [];
			}
			ans.push({
				questionId: parseInt(item),
				optionId_choice:
					values[item] !== undefined ? values[item].map(parseInt) : [],
			});
		}
		const params = {
			quizTestId: quizId,
			numOfQuestion: quiz.length,
			userChoice: ans,
		};
		submitQuiz(params);
	};

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	function showConfirm() {
		confirm({
			title: "Do you want to start this quiz?",
			icon: <FormOutlined />,
			content: "Start quiz now",
			onOk() {
				form.submit();
			},
			onCancel() {},
		});
	}

	function onChange(checkedValues) {
		if (list.length > 0) {
			const index = list.findIndex((element) => element === questionId);
			if (index > -1) {
				if (checkedValues.length <= 0) {
					list.splice(index, 1);
				}
			} else {
				if (checkedValues.length > 0) {
					list.push(questionId);
				}
			}
		} else {
			if (checkedValues.length > 0) {
				list.push(questionId);
			}
		}
		setSelect(list);
	}

	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-one">
				<div className="quiz-layout__content-form">
					<Form form={form} onFinish={onFinish} name="basic">
						{quiz &&
							quiz.map((question, index) => {
								return (
									<div className="make-quiz__item" key={question.questionId}>
										<div className="make-quiz__question">
											<Text strong>{"Q." + ++index}</Text>
											{renderHTML(question.questionContent)}
										</div>
										<Form.Item name={question.questionId}>
											<Checkbox.Group
												className="make-quiz__option"
												onClick={() => {
													setQuestionId(question.questionId);
												}}
												onChange={onChange}
											>
												<Space direction="vertical">
													{question.options.map((option) => {
														return (
															<Checkbox
																value={option.optionId}
																className="make-quiz__option"
																key={option.optionId}
															>
																{option.optionContent}
															</Checkbox>
														);
													})}
												</Space>
											</Checkbox.Group>
										</Form.Item>
									</div>
								);
							})}
						<div className="make-quiz__control">
							<Button type="primary" onClick={showConfirm}>
								Submit
							</Button>
						</div>
					</Form>
				</div>
			</div>
			<div className="quiz-layout__content-two">
				<Affix style={{ display: "none" }}>
					<Card
						size="small"
						title={
							<Statistic
								title="Timer"
								value={formatTime(timer)}
								valueStyle={{ color: "#3f8600" }}
							/>
						}
						className="quiz-layout__content-two-affix"
					>
						<Space size={[8, 8]} wrap>
							{quiz &&
								quiz.map((item, index) => {
									return (
										<Button
											type={
												selected.indexOf(item.questionId) > -1
													? "primary"
													: "default"
											}
											style={{ width: 60 }}
											key={item.questionId}
										>
											{++index}
										</Button>
									);
								})}
						</Space>
						<div style={{ marginTop: "20px" }}>
							<Button type="primary" onClick={showConfirm}>
								Submit
							</Button>
						</div>
					</Card>
				</Affix>
			</div>
		</div>
	);
}
export default TakeQuiz;
