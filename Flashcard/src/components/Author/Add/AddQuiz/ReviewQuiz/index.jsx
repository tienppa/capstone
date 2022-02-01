import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { Tag } from "antd";

function ReviewQuiz(props) {
	const { three } = props;
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<>
			{three &&
				three.map((item, index) => {
					return (
						<div
							className="list-question__item-wrap"
							key={index + "reviewquestion" + item.question.questionId}
						>
							<div className="list-question__item-checkbox-wrap">
								<Tag className="list-question__item-checkbox" color="#108ee9">
									{++index}
								</Tag>
							</div>
							<div className="list-question__item-content">
								<span className="list-question__item-title">
									{renderHTML(item.question.questionContent)}
								</span>
								<div className="list-question__item-options">
									{item.options.map((option, index) => {
										return (
											<span
												className="list-question__item-option"
												key={index + "reviewoption" + option.optionId}
											>
												{alphabet[index] + ") "} {option.optionContent}
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
		</>
	);
}
export default ReviewQuiz;
