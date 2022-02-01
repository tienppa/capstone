import { BorderlessTableOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import flashcardAPI from "apis/flashcard.api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { Text } = Typography;

function FlashcardDetail() {
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	const flashcardId = query.get("flashcardId");
	const [fDetail, setFDetail] = useState([]);

	useEffect(() => {
		const increaseView = async () => {
			const response = await flashcardAPI.increaseView({
				flashcardId: flashcardId,
			});
		};
		increaseView();
	}, []);

	useEffect(() => {
		const getFlashcardDetail = async () => {
			try {
				const response = await flashcardAPI.getFlashcardDetail({
					flashcardId: parseInt(flashcardId),
				});
				setFDetail(response.flashcard[0]);
			} catch (error) {
				console.log(error);
			}
		};
		getFlashcardDetail();
	}, [flashcardId]);

	const renderHTML = (rawHTML) =>
		React.createElement("div", {
			dangerouslySetInnerHTML: { __html: rawHTML },
		});

	return (
		<div style={{ padding: "0 18px", maxWidth: "1024px" }}>
			<Card
				style={{ margin: "0 0 10px 0" }}
				size="small"
				title={
					<Text type="secondary">
						<BorderlessTableOutlined />
						{fDetail.flashcardName}
					</Text>
				}
			>
				<Space align="start" style={{ width: "100%", minHeight: "500px" }}>
					<Text>{renderHTML(fDetail.flashcardContent)}</Text>
				</Space>
			</Card>
		</div>
	);
}
export default FlashcardDetail;
