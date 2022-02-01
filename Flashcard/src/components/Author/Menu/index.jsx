import {
	FileAddOutlined,
	FormOutlined,
	FundViewOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { setSubjectIdForQuiz } from "redux/actions/author";
import { changeModalVisible } from "redux/actions/status";
import "./index.css";

function MenuCreater(props) {
	const history = useHistory();
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const subjectId = query.get("subjectId");
	const { path } = useRouteMatch();
	const dispatch = useDispatch();
	const onSearch = (value) => {
		props.parentCallback(value);
	};

	// modal function
	const visibleModal = useSelector((state) => state.status.isShowModal);

	const showModal = () => {
		dispatch(changeModalVisible(true));
	};

	const closeModal = () => {
		dispatch(changeModalVisible(false));
	};

	const addQuiz = () => {
		dispatch(setSubjectIdForQuiz(subjectId));
		history.push(`/author/add-quiz?subjectId=${subjectId}`);
	};

	const callViewQuiz = () => {
		history.push(`/author/view-quiz?subjectId=${subjectId}`);
	};

	return (
		<>
			<div className="creater-menu">
				<div className="creater-form-wrap">
					<Button className="creater-button-item" onClick={showModal}>
						<FileAddOutlined /> Add
					</Button>
					{subjectId && (
						<Button
							className="creater-button-item"
							onClick={() => {
								addQuiz();
							}}
						>
							<FormOutlined /> Add quiz
						</Button>
					)}
					{subjectId && (
						<Button
							className="creater-button-item"
							onClick={() => {
								callViewQuiz();
							}}
						>
							<FundViewOutlined /> View quizs
						</Button>
					)}
				</div>
				<div className="creater-search-wrap">
					<Input
						className="creater-search"
						placeholder="Input search text"
						onChange={(event) => {
							onSearch(event.target.value);
						}}
					/>
				</div>
			</div>

			<Modal
				title={
					path === "/author"
						? "Add topic"
						: path === "/author/subject"
						? "Add subject"
						: path === "/author/lession"
						? "Add lession"
						: path === "/author/flashcard"
						? "Add flashcard"
						: path === "/author/question" && "Add question"
				}
				visible={visibleModal}
				width={
					path === "/author/question" || path === "/author/flashcard"
						? 1200
						: 1000
				}
				onCancel={closeModal}
				footer={null}
			>
				{props.children}
			</Modal>
		</>
	);
}
export default MenuCreater;
