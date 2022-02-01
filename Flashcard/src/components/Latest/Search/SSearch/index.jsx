import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Empty, message, Modal, Row, Tag } from "antd";
import authAPI from "apis/auth.api";
import checkAcceptAPI from "apis/check.accessibility";
import privateSubjectAPI from "apis/private.subject.api";
import subjectAPI from "apis/subject.api";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveProfileAction, updatePointUser } from "redux/actions/user";

const { confirm } = Modal;

function SSearch(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { subjectFound } = useSelector((state) => state.latest);
	const [posts, setPosts] = useState([]);
	let indexOfFirstPost = props.indexOfFirstPost;
	let indexOfLastPost = props.indexOfLastPost;

	useEffect(() => {
		const sendTotal = async () => {
			if (!subjectFound) return;
			await props.pCallback(subjectFound.length);
			setPosts(subjectFound.slice(indexOfFirstPost, indexOfLastPost));
		};
		sendTotal();
	}, [subjectFound, indexOfFirstPost, indexOfLastPost]);

	const requestSubject = async (id) => {
		const response = await privateSubjectAPI.requestSubject({ subjectId: id });
		if (response.status === "Success") {
			message.success(response.message);
		} else {
			message.error(response.message);
		}
	};

	function showConfirm(id) {
		confirm({
			title: "Confirm send request?",
			icon: <ExclamationCircleOutlined />,
			content: "You should send request to see this subject.",
			onOk() {
				requestSubject(id);
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	}

	const checkApproveSubject = async (id) => {
		const response = await checkAcceptAPI.checkAcceptSubject({ subjectId: id });
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
				showConfirm(id);
				break;
			}
			default:
				message.error(response.message);
				break;
		}
	};

	const callLinkPublic = (id) => {
		history.push(`/latest/lession?subjectId=${id}`);
	};

	const checkPublic = async (subjectId) => {
		const response = await subjectAPI.checkPublic({ subjectId: subjectId });
		console.log(response);
		if (response.status === "Success") {
			history.push(`/latest/lession?subjectId=${subjectId}`);
		}
		if (response.status === "Failed") {
			confirm({
				title: "Notification",
				icon: <ExclamationCircleOutlined />,
				content: response.message,
				onOk() {
					savePublic(subjectId);
				},
				onCancel() {},
			});
		}
	};
	const getUserAction = async () => {
		const response = await authAPI.getMe();
		dispatch(saveProfileAction(response.account));
	};

	const savePublic = async (subjectId) => {
		const response = await subjectAPI.saveRelation({ subjectId: subjectId });
		if (response.status === "Success") {
			getUserAction();
			history.push(`/latest/lession?subjectId=${subjectId}`);
		} else {
			Notification("error", response.messsage);
		}
	};

	return (
		<Row gutter={[16, 16]}>
			{posts.length > 0 &&
				posts.map((sub) => {
					return (
						<Col xs={24} xl={12} xxl={8} key={sub.subjectId}>
							<Card
								size="small"
								title={sub.subjectName}
								hoverable
								onClick={
									sub.statusId !== 2
										? () => {
												checkPublic(sub.subjectId);
										  }
										: () => {
												checkApproveSubject(sub.subjectId);
										  }
								}
								extra={sub.statusId === 2 && <Tag color="#f50">Private</Tag>}
							>
								<div className="card-content__wrap">
									<div className="card-content__main">
										<span className="card-content__text">
											{sub.subjectDescription}
										</span>
									</div>
									<div className="card-content__author">
										<span className="card-content__author-name">
											<Avatar
												style={{ backgroundColor: "#1890FF" }}
												size="small"
												icon={<UserOutlined />}
											/>{" "}
											{sub.author}
										</span>
										<span className="card-content__date">
											{Moment(sub.createdDate).format("YYYY-MM-DD")}
										</span>
									</div>
								</div>
							</Card>
						</Col>
					);
				})}
			{posts.length === 0 && (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</Row>
	);
}
export default SSearch;
