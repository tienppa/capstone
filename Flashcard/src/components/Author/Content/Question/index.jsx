import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { List, Modal, Typography, Empty } from "antd";
import questionAPI from "apis/question.api";
import AddQuestion from "components/Author/Add/AddQuestion";
import MenuCreater from "components/Author/Menu";
import ModalUpdate from "components/Author/ModalUpdate";
import UpdateQuestion from "components/Author/Update/UpdateQuestion";
import Notification from "components/Notification";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeModalUpdateVisible } from "redux/actions/status";
import "../index.css";
import "./index.css";

const { Text } = Typography;
const { confirm } = Modal;

function Question() {
	const dispatch = useDispatch();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const flashcardId = query.get("flashcardId");
	let [questions, setQuestions] = useState();
	const [questionUpdate, setQuestionUpdate] = useState();
	const [filterQuestion, setFilterQuestion] = useState();
	const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
	const listData = [];

	const getData = async () => {
		const respQuestion = await questionAPI.getQuestionByFlashcardId({
			flashcardId,
		});
		setQuestions(respQuestion.data);
	};

	useEffect(() => {
		getData();
	}, [flashcardId]);

	const setQuestionUpdateParent = (question) => {
		setQuestionUpdate(question);
		dispatch(changeModalUpdateVisible(true));
	};

	const removeQuestion = async (id) => {
		try {
			const resp = await questionAPI.removeQuestionById({ questionId: id });
			if (resp.status === "Success") {
				Notification("success", resp.message);
				getData();
			} else {
				Notification("error", resp.message);
			}
		} catch (error) {
			console.log("Delete question: ", error.message);
		}
	};

	const showDeleteConfirm = (id) => {
		confirm({
			title: "Detele question",
			icon: <ExclamationCircleOutlined />,
			content: "Are you sure delete this item",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				removeQuestion(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const searchQuestion = (string) => {
		if (string.length === 0) {
			return setFilterQuestion(questions);
		}
		let searchLower = string.toLowerCase();
		let filtered = questions.filter((item) => {
			if (item.question.questionContent.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		});
		return setFilterQuestion(filtered);
	};

	let array = [];
	if (!filterQuestion) {
		array = questions;
	} else {
		array = filterQuestion;
	}
	for (let item in array) {
		listData.push(array[item]);
	}

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<>
			<MenuCreater parentCallback={searchQuestion}>
				<AddQuestion parentCallback={getData} />
			</MenuCreater>
			<ModalUpdate title={"Update question"}>
				<UpdateQuestion parentCallback={getData} question={questionUpdate} />
			</ModalUpdate>
			{questions?.map((item, index) => {
				return (
					<List
						size="small"
						bordered
						className="author-card"
						key={item.question.questionId}
						actions={[
							<EditOutlined
								onClick={() => {
									setQuestionUpdateParent(item.question.questionId);
								}}
							/>,
							<DeleteOutlined
								onClick={() => {
									showDeleteConfirm(item.question.questionId);
								}}
							/>,
						]}
						header={
							<>
								<Text strong>{"Q_" + ++index + "."}</Text>
								{renderHTML(item.question.questionContent)}
							</>
						}
						dataSource={item.option.map((option, index) => {
							return alphabet[index] + ") " + option.optionContent;
						})}
						renderItem={(item) => <List.Item>{item}</List.Item>}
						footer={
							<div className="author-list__footer">
								<div className="author-list__footer-correct">
									<Text type="secondary">{"Correct: "}</Text>
									{item.option.map((option, index) => {
										if (option.isCorrect.data[0] === 1) {
											return alphabet[index] + " ";
										}
									})}
								</div>
								<div className="author-list__footer-tools">
									<EditOutlined
										onClick={() => {
											setQuestionUpdateParent(item);
										}}
									/>
									<DeleteOutlined
										onClick={() => {
											showDeleteConfirm(item.question.questionId);
										}}
									/>
								</div>
							</div>
						}
					/>
				);
			})}
			{questions?.length === 0 && (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</>
	);
}

export default Question;
