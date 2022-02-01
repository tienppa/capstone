import { Pagination } from "antd";
import "./index.css";

function Pagi(props) {
	const { total } = props;

	function onShowSizeChange(current, pageSize) {
		props.parentSizeChange(current, pageSize);
	}

	function onChange(pageNumber) {
		props.parentPageChange(pageNumber);
	}

	return (
		<div className="pagination-wrap">
			<Pagination
				showSizeChanger
				onChange={onChange}
				onShowSizeChange={onShowSizeChange}
				defaultCurrent={1}
				total={total}
			/>
		</div>
	);
}
export default Pagi;
