import { FormOutlined } from "@ant-design/icons";
import { Button, Descriptions, Modal, Result, Typography } from "antd";
import quizAPI from "apis/quiz.api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setQuizContent } from "redux/actions/quiz";
import "./index.css";

const { confirm } = Modal;
const { Paragraph, Text } = Typography;

function StartQuiz() {
	const history = useHistory();
	const dispatch = useDispatch();
	const { quizId, quizInfo } = useSelector((state) => state.quiz);

	useEffect(() => {
		function warning() {
			Modal.warning({
				title: "There are no quiz ready for you.",
				content: "Back to home now?",
			});
			history.push("/latest");
		}
		if (!quizId || !quizInfo) {
			warning();
		}
	}, []);

	const getQuiz = async () => {
		const response = await quizAPI.getQuizToTake({ quizTestId: quizId });
		if (response.status === "Success") {
			dispatch(setQuizContent(response.listQuestion));
		}
		history.push("/quiz/take-quiz");
	};

	function showConfirm() {
		confirm({
			title: "Do you want to start this quiz?",
			icon: <FormOutlined />,
			content: "Start quiz now",
			onOk() {
				getQuiz();
			},
			onCancel() {},
		});
	}

	return (
		<div className="quiz-layout__content-main">
			<div className="quiz-layout__content-start">
				<div className="quiz-layout__content-start--menu">
					<Result
						title="Quiz"
						icon={<FormOutlined />}
						subTitle="Take quiz to improve knowledge"
						extra={[
							<Button type="primary" key="start" onClick={showConfirm}>
								Start quiz
							</Button>,
							<Button
								key="back"
								onClick={() => {
									window.history.back();
								}}
							>
								Back to the course
							</Button>,
						]}
					>
						<Descriptions bordered>
							<Descriptions.Item label="Quiz name" span={3}>
								<Paragraph>
									<a>{quizInfo.name}</a>
								</Paragraph>
							</Descriptions.Item>
							<Descriptions.Item label="Total question" span={3}>
								<Paragraph>
									<a>{quizInfo.quantity}</a>
								</Paragraph>
							</Descriptions.Item>
							<Descriptions.Item label="Author" span={3}>
								<Paragraph>
									<a>{quizInfo.author}</a>
								</Paragraph>
							</Descriptions.Item>
						</Descriptions>
					</Result>
				</div>
			</div>
		</div>
	);
}
export default StartQuiz;
