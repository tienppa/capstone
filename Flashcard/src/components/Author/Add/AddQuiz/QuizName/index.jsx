import { Button, Form, Input, Select, Tag } from "antd";
import lessionAPI from "apis/lession.api";
import { useEffect, useState } from "react";
import Notification from "components/Notification";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 18,
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 18, offset: 6 },
	},
};

const { Option } = Select;

function QuizName(props) {
	const [form] = Form.useForm();
	const { subjectId, one } = props;
	const [count, setCount] = useState(0);
	const [lessions, setLessions] = useState([]);

	useEffect(() => {
		const getLessionsBySubId = async () => {
			const response = await lessionAPI.getLessionBySubId({
				subjectId: subjectId,
			});
			if (response.status === "Success") {
				setLessions(response.lession);
			} else {
				Notification("info", response.message);
			}
		};
		getLessionsBySubId();
	}, [subjectId]);

	const children = [];
	if (lessions) {
		lessions.forEach(createOption);
	}

	function createOption(value) {
		children.push(
			<Option key={value.lessionId} value={`${value.lessionId}`}>
				{value.lessionName}
			</Option>
		);
	}

	const setLessionArray = (values) => {
		props.parentSetLessionArray(values.lessionArr.map((item) => Number(item)));
	};

	const next = () => {
		props.parentNext();
	};

	const countSelected = (values) => {
		if (values) {
			setCount(values.length);
		}
	};

	const parrentSetOne = (values) => {
		props.parrentSetOne(values);
	};

	const finishOne = async (values) => {
		parrentSetOne(values);
		setLessionArray(values);
		next();
	};

	const onReset = () => {
		parrentSetOne([]);
		form.resetFields();
	};

	return (
		<Form
			{...layout}
			name="normal_quiz"
			form={form}
			initialValues={one}
			onFinish={finishOne}
		>
			<Form.Item
				name="testName"
				label="Quiz name:"
				rules={[{ required: true, message: "Please input quiz name!" }]}
			>
				<Input size="large" />
			</Form.Item>
			<Form.Item
				name="lessionArr"
				label="Lession of quiz"
				rules={[
					{
						required: true,
						message: "Please choose at least one value!",
					},
				]}
			>
				<Select size="large" mode="multiple" onChange={countSelected}>
					{children}
				</Select>
			</Form.Item>
			<Form.Item {...formItemLayoutWithOutLabel}>
				Lession selected: <Tag color="#f50"> {count}</Tag>
			</Form.Item>
			<Form.Item {...formItemLayoutWithOutLabel}>
				<Button type="primary" style={{ marginRight: 15 }} htmlType="submit">
					Next step
				</Button>
				<Button htmlType="button" onClick={onReset}>
					Reset
				</Button>
			</Form.Item>
		</Form>
	);
}
export default QuizName;
