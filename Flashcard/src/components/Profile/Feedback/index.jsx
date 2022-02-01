import { Form, Input, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const children = [];
const problemItem = {
	acount: "Account",
	point: "Point",
	donor: "Donor",
	other: "Other",
};
for (let item in problemItem) {
	children.push(
		<Option key={problemItem[item]} value={problemItem[item]}>
			{problemItem[item]}
		</Option>
	);
}
const onFinish = async () => {};

function Feedback() {
	return (
		<div className="fprofile-main__wrap">
			<div className="fprofile-left">
				<h3 className="fprofile-name"></h3>
			</div>
			<div className="fprofile-right">
				<Form
					name="normal_feedback"
					className="normal_profile"
					onFinish={onFinish}
				>
					<label className="fprofile-form-label">Problem:</label>
					<Form.Item
						name="problem"
						className="fprofile-form-group"
						rules={[
							{
								required: true,
								message: "Please input your problem!",
							},
						]}
					>
						<Select size="large" mode="tags" className="form-group">
							{children}
						</Select>
					</Form.Item>
					<label className="fprofile-form-label">Description:</label>
					<Form.Item
						name="description"
						className="fprofile-form-group"
						rules={[
							{
								required: true,
								message: "Please input your description!",
							},
						]}
					>
						<TextArea rows={4} maxLength={500} showCount />
					</Form.Item>
					<button className="fprofile-button" type="submit">
						Create Feedback
					</button>
				</Form>
			</div>
		</div>
	);
}

export default Feedback;
