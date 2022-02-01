import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Collapse, Empty, Row, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import subjectAPI from "apis/subject.api";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import authAPI from "apis/auth.api";
import { saveProfileAction } from "redux/actions/user";

const { Panel } = Collapse;
const { confirm } = Modal;

function Suggest() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [suggest, setSuggest] = useState();

	const interestTopic = useSelector(
		(state) => state.user.currentUser.interestTopic
	);
	const payload = {
		listTopicId: JSON.parse(interestTopic),
	};
	useEffect(() => {
		const getSuggest = async () => {
			const response = await subjectAPI.getInterestSubject(payload);
			setSuggest(response.listData);
		};
		getSuggest();
	}, []);

	const checkPublic = async (subjectId) => {
		const response = await subjectAPI.checkPublic({ subjectId: subjectId });
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

	let id = 0;
	return (
		<Collapse defaultActiveKey={[1, 2, 3, 4]} expandIconPosition="right" ghost>
			{suggest ? (
				suggest.map((item) => {
					if (item.listSubjects) {
						return (
							<Panel header={item.topicDetail.topicName} key={++id}>
								<Row gutter={[16, 16]}>
									{item.listSubjects.map((sub) => {
										return (
											<Col xs={24} xl={12} xxl={8} key={sub.subjectId}>
												<Card
													size="small"
													title={sub.subjectName}
													className="card-content--hover"
													onClick={() => {
														checkPublic(sub.subjectId);
													}}
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
								</Row>
							</Panel>
						);
					}
				})
			) : (
				<div className="empty-container">
					<Empty />
				</div>
			)}
		</Collapse>
	);
}
export default Suggest;
