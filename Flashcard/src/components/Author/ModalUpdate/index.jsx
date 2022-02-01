import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { changeModalUpdateVisible } from "redux/actions/status";

function ModalUpdate(props) {
	const { path } = useRouteMatch();
	const dispatch = useDispatch();
	const visibleModalUpdate = useSelector(
		(state) => state.status.isShowModalUpdate
	);
	const { title } = props;
	const closeModal = () => {
		dispatch(changeModalUpdateVisible(false));
	};
	return (
		<Modal
			title={title}
			visible={visibleModalUpdate}
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
	);
}
export default ModalUpdate;
