import {
	CaretRightOutlined,
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	FieldTimeOutlined,
} from "@ant-design/icons";
import { Card, Empty, Modal, Tag, Typography } from "antd";
import flashcardAPI from "apis/flashcard.api";
import Notification from "components/Notification";
import Moment from "moment";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";

const { Text } = Typography;
const { Meta } = Card;
const { confirm } = Modal;

function Flashcard(props) {
	const { flashcards } = props;
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const lessionId = query.get("lessionId");

	const removeFlashcard = async (id) => {
		try {
			const resp = await flashcardAPI.removeFlashcardById({
				flashcardId: id,
			});
			if (resp.status === "Success") {
				Notification("success", resp.message);
				refresh();
			} else {
				Notification("error", resp.message);
			}
		} catch (error) {
			console.log("Delete flashcard", error.message);
		}
	};

	const showDeleteConfirm = (id) => {
		confirm({
			title: "Are you sure delete this item",
			icon: <ExclamationCircleOutlined />,
			content: "Some descriptions",
			okText: "Yes",
			okType: "danger",
			cancelText: "No",
			onOk() {
				removeFlashcard(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const findFlashcard = (id) => {
		if (!flashcards) return;
		return flashcards.find((item) => item.flashcardId === id);
	};

	const setFlashcardUpdateParent = (id) => {
		props.setFlashcardUpdate(findFlashcard(id));
	};

	const refresh = () => {
		props.parentCallback();
	};

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<div className="author-card__cover">
			{flashcards ? (
				flashcards.map((item) => {
					if (`${item.lessionId}` === lessionId) {
						return (
							<Card
								key={"card-flashcard" + item.flashcardId}
								size="small"
								className="author-card"
								actions={[
									<Text italic style={{ color: "#6B87BC" }}>
										<FieldTimeOutlined />{" "}
										{Moment(item.dateOfCreate).format("YYYY-MM-DD")}
									</Text>,
									<EditOutlined
										onClick={() => {
											setFlashcardUpdateParent(item.flashcardId);
										}}
									/>,
									<DeleteOutlined
										onClick={() => {
											showDeleteConfirm(item.flashcardId);
										}}
									/>,
								]}
							>
								<Meta
									title={
										<Link
											to={"/author/question?flashcardId=" + item.flashcardId}
										>
											{item.flashcardName} <CaretRightOutlined />
										</Link>
									}
									description={renderHTML(item.flashcardContent)}
								/>
							</Card>
						);
					}
				})
			) : (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</div>
	);
}

export default Flashcard;
