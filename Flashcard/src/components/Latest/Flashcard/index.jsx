import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Descriptions, Empty, Typography } from "antd";
import flashcardAPI from "apis/flashcard.api";
import lessionAPI from "apis/lession.api";
import Notification from "components/Notification";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { changeTypeRadioLatest } from "redux/actions/status";
import "./index.css";

const { Text } = Typography;

function Flashcard() {
	const history = useHistory();
	let location = useLocation();
	let query = new URLSearchParams(location.search);
	const lessionId = query.get("lessionId");
	const dispatch = useDispatch();
	dispatch(changeTypeRadioLatest("flashcard"));

	const [flashcard, setFlashcard] = useState();

	useEffect(() => {
		const increaseView = async () => {
			const response = await lessionAPI.increaseView({ lessionId: lessionId });
		};
		increaseView();
	}, []);

	useEffect(() => {
		const getLession = async () => {
			const response = await flashcardAPI.getFlashcardByLessionId({
				lessionId: lessionId,
			});
			if (response.status === "Success") {
				setFlashcard(response.flashcard);
			} else {
				Notification("info", response.message);
			}
		};
		getLession();
	}, [lessionId]);

	const callLink = (id) => {
		history.push(`/latest/flashcard-detail?flashcardId=${id}`);
	};

	return (
		<div style={{ padding: "0 18px" }}>
			{flashcard ? (
				flashcard.map((item) => {
					return (
						<Card
							hoverable
							className="flashcard__content-card"
							size="small"
							title={item.flashcardName}
							key={item.flashcardId}
							onClick={() => {
								callLink(item.flashcardId);
							}}
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
									{Moment(item.dateOfCreate).format("YYYY-MM-DD")}
								</Descriptions.Item>
								<Descriptions.Item>
									<Text strong>{item.totalQuestion}</Text>-Questions
								</Descriptions.Item>
							</Descriptions>
						</Card>
					);
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
