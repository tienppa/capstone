import {
	DeleteOutlined,
	DownOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import { passAccountToAction, setShowModal } from "redux/actions/admin";
import { Dropdown, Menu, Popconfirm } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import ModalAccountAction from "./ModalAccountAction";

ActionMenu.propTypes = {
	item: PropTypes.object,
};
ActionMenu.defaultProps = {
	item: null,
};

function ActionMenu(props) {
	const handleMenuClick = () => {};

	const dispatch = useDispatch();

	const handleSingleDelete = () => {
		const { item } = props;
		console.log(item);
		dispatch(passAccountToAction(item));
		dispatch(setShowModal(true));
	};
	const handleSingleBanned = () => {
		const { item } = props;
		console.log(item);
		dispatch(passAccountToAction(item));
		dispatch(setShowModal(true));
	};
	const { item } = props;

	const actionMenu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item disabled={item.statusId === 4} key="edit">
				<Popconfirm
					disabled={item.statusId === 4}
					title="Sure to Banned?"
					placement="left"
					icon={<QuestionCircleOutlined style={{ color: "orange" }} />}
					onConfirm={handleSingleBanned}
				>
					<DeleteOutlined type="delete" />
					Ban
				</Popconfirm>
			</Menu.Item>
			<Menu.Item key="delete">
				<Popconfirm
					title="Sure to delete?"
					placement="left"
					icon={<QuestionCircleOutlined style={{ color: "red" }} />}
					onConfirm={handleSingleDelete}
				>
					<DeleteOutlined type="delete" />
					Delete
				</Popconfirm>
			</Menu.Item>
		</Menu>
	);
	return (
		<>
			<ModalAccountAction {...props} />
			<span>
				<Dropdown overlay={actionMenu} trigger={["click"]}>
					<a className="ant-dropdown-link" href="#">
						Actions <DownOutlined />
					</a>
				</Dropdown>
			</span>
		</>
	);
}

export default ActionMenu;
