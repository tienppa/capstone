import {
	FieldTimeOutlined,
	TagOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Card, Empty, message, Row, Col, Tag, Modal } from "antd";
import checkAcceptAPI from "apis/check.accessibility";
import privateLessionAPI from "apis/private.lession.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePointUser } from "redux/actions/user";
import "./index.css";

const { confirm } = Modal;

function LSearch(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { lessionFound } = useSelector((state) => state.latest);
	const [posts, setPosts] = useState([]);
	let indexOfFirstPost = props.indexOfFirstPost;
	let indexOfLastPost = props.indexOfLastPost;

	useEffect(() => {
		const sendTotal = async () => {
			if (!lessionFound) return;
			await props.pCallback(lessionFound.length);
			setPosts(lessionFound.slice(indexOfFirstPost, indexOfLastPost));
		};
		sendTotal();
	}, [lessionFound, indexOfFirstPost, indexOfLastPost]);

	const requestLession = async (id) => {
		const response = await privateLessionAPI.requestLession({ lessionId: id });
		if (response.status === "Success") {
			message.success(response.message);
		} else {
			message.error(response.message);
		}
	};

	const checkApproveLession = async (id) => {
		const response = await checkAcceptAPI.checkAcceptLession({ lessionId: id });
		console.log(response);
		let status = response.status;
		switch (status) {
			case "Success": {
				callLinkPublic(id);
				if (response.user_point) {
					message.success(`Current point: ${response.user_point}`);
					dispatch(updatePointUser(response.user_point));
				}
				break;
			}
			case "Failed": {
				message.error(response.message);
				break;
			}
			case "Point Unavailable": {
				message.error(response.message);
				break;
			}
			case "Not Found Request": {
				confirm({
					title: "Confirm send request?",
					icon: <ExclamationCircleOutlined />,
					content: "You should send request to see this subject.",
					onOk() {
						requestLession(id);
					},
					onCancel() {
						console.log("Cancel");
					},
				});
				break;
			}
			default:
				message.error(response.message);
				break;
		}
	};

	const callLinkPublic = (id) => {
		history.push(`/latest/flashcard?lessionId=${id}`);
	};

	return (
		<Row gutter={[16, 16]}>
			{posts.length > 0 ? (
				posts.map((lession) => {
					return (
						<Col xs={24} xl={12} xxl={8} key={lession.lession.lessionId}>
							<Card
								size="small"
								title={lession.lession.lessionName}
								extra={
									lession.lession.statusId === 2 && (
										<Tag color="#f50">Private</Tag>
									)
								}
								className="search-card"
								onClick={
									lession.lession.statusId !== 2
										? () => {
												callLinkPublic(lession.lession.lessionId);
										  }
										: () => {
												checkApproveLession(lession.lession.lessionId);
										  }
								}
							>
								<div style={{ minHeight: "120px" }}>
									<div className="search-card__content">
										<span className="search-card__content-item font-weight-bold">
											{lession.lession.lessionDescription}
										</span>
										<span className="search-card__content-item search-card__date">
											<FieldTimeOutlined />{" "}
											{Moment(lession.lession.createdDate).format("YYYY-MM-DD")}
										</span>
									</div>
									<div className="search-card__tags">
										{lession.flashcard_inside.map((item, index) => {
											if (index < 2) {
												return (
													<div
														className="search-card__tags-wrap"
														key={item.flashcardId}
													>
														<span className="search-card__tag-item--name">
															<TagOutlined /> {item.flashcardName}
														</span>
													</div>
												);
											}
										})}
									</div>
								</div>
							</Card>
						</Col>
					);
				})
			) : (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</Row>
	);
}
export default LSearch;
