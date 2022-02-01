import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Button, Checkbox, message, Tag } from "antd";
import questionAPI from "apis/question.api";
import { useEffect, useState } from "react";
import "./index.css";

function ListQuestion(props) {
	const { lessionArr, two, checkAll } = props;
	const [questions, setQuestions] = useState([]);
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	useEffect(() => {
		const getListQuestion = async () => {
			const response = await questionAPI.getQuestionByListLessionId({
				lessionArr: lessionArr,
			});
			if (response.status === "Success") {
				setQuestions(response.flashcardObj);
			} else {
				message.info("You don't have a set of questions in this");
				prev();
			}
		};
		getListQuestion();
	}, [lessionArr]);

	const next = () => {
		if (two.length <= 10) {
			message.warning("Please select at least 10 questions for a quiz.");
			return;
		}
		parrentSetThree(filterQuestion(questions, two));
		props.parentNext();
	};
	const prev = () => {
		props.parentPrev();
	};

	const parrentSetTwo = (values) => {
		props.parrentSetTwo(values);
	};
	const parrentSetThree = (values) => {
		props.parrentSetThree(values);
	};

	const setCheckAll = (values) => {
		props.parentSetCheckAll(values);
	};

	const getDefaultListId = () => {
		if (!questions) return;
		let listSelected = [];
		questions.map((question) => {
			question.questions.map((item) => {
				listSelected.push(item.question.questionId);
			});
		});
		return listSelected;
	};

	const onChange = (list) => {
		let defaultList = getDefaultListId();
		parrentSetTwo(list);
		setCheckAll(list.length === defaultList.length);
	};

	const onCheckAllChange = (e) => {
		let defaultList = getDefaultListId();
		setCheckAll(e.target.checked);
		parrentSetTwo(e.target.checked ? defaultList : "");
	};

	const filterQuestion = (questions, two) => {
		if (!questions && !two) return;
		let listQuestion = [];
		questions.map((question) => {
			for (let item in two) {
				question.questions.map((que) => {
					if (que.question.questionId == two[item]) {
						listQuestion.push(que);
					}
				});
			}
		});
		return listQuestion;
	};

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<>
			<Checkbox.Group style={{ width: "100%" }} onChange={onChange} value={two}>
				{questions &&
					questions.map((question) => {
						return (
							<div
								className="list-question__container"
								key={"fcard-name:" + question.flashcard.flashcardId}
							>
								<Tag color="#2db7f5">{question.flashcard.flashcardName}</Tag>
								{question.questions.map((item, index) => {
									return (
										<div
											className="list-question__item-wrap"
											key={"question:" + item.question.questionId}
										>
											<div className="list-question__item-checkbox-wrap">
												<Checkbox
													className="list-question__item-checkbox"
													value={item.question.questionId}
												/>
											</div>
											<div className="list-question__item-content">
												<span className="list-question__item-title">
													{"Q" + ++index}
													{renderHTML(item.question.questionContent)}
												</span>
												<div className="list-question__item-options">
													{item.options.map((option, indexOption) => {
														return (
															<span
																className="list-question__item-option"
																key={"option:" + option.optionId}
															>
																{alphabet[indexOption] +
																	") " +
																	option.optionContent}
																{option.isCorrect === true && (
																	<CheckOutlined className="check-true" />
																)}
															</span>
														);
													})}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						);
					})}
			</Checkbox.Group>
			<div className="list-question__tool" style={{ padding: 10 }}>
				<Button
					type="primary"
					style={{ marginRight: 15 }}
					onClick={() => {
						next();
					}}
				>
					Next step
				</Button>
				<Button
					onClick={() => {
						prev();
					}}
					style={{ marginRight: 15 }}
				>
					Previous step
				</Button>
				<Checkbox onChange={onCheckAllChange} checked={checkAll}>
					Check all
				</Checkbox>
			</div>
		</>
	);
}
export default ListQuestion;
