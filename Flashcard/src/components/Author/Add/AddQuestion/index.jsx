import {
	DeleteOutlined,
	PlusOutlined,
	QuestionOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Checkbox, Form, Input, Popover, Tooltip } from "antd";
import questionAPI from "apis/question.api";
import MyUploadAdapter from "components/Editor";
import Notification from "components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setQuestionContent } from "redux/actions/author";
import { changeModalVisible } from "redux/actions/status";
import "./index.css";

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};
const formItemLayoutWithOutLabel = {
	wrapperCol: {
		xs: { span: 24, offset: 0 },
		sm: { span: 20, offset: 4 },
	},
};

const title =
	"Input question and options, choose correct option by the checkbox!";

function AddQuestion(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { TextArea } = Input;

	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const flashcardId = query.get("flashcardId");

	const { quesContent } = useSelector((state) => state.author);

	const refresh = () => {
		props.parentCallback();
	};

	const getOptions = (values) => {
		const optionsUpdated = values.options;
		optionsUpdated.map((item) => {
			if (item.isCorrect === true) {
				item.isCorrect = 1;
			} else {
				item.isCorrect = 0;
			}
			values.options = optionsUpdated;
		});
		return values.options;
	};

	const onFinish = async (values) => {
		if (!quesContent || !values) return;
		const options = getOptions(values);
		const resp = await questionAPI.addQuestionOption({
			question: {
				questionContent: quesContent,
				flashcardId: parseInt(flashcardId),
			},
			options: options,
		});
		if (resp.status === "Success") {
			refresh();
			form.resetFields();
			Notification("success", resp.message);
			dispatch(changeModalVisible(false));
			dispatch(setQuestionContent(""));
		} else {
			Notification("error", resp.message);
		}
	};

	return (
		<div className="creater-container">
			<Form
				name="question"
				{...formItemLayoutWithOutLabel}
				onFinish={onFinish}
				form={form}
			>
				<Form.Item label="Question:" {...formItemLayout}>
					<div style={{ width: "86%" }}>
						<CKEditor
							data={quesContent}
							editor={ClassicEditor}
							onReady={(editor) => {
								editor.plugins.get("FileRepository").createUploadAdapter = (
									loader
								) => {
									return new MyUploadAdapter(loader);
								};
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								dispatch(setQuestionContent(data));
							}}
						/>
					</div>
				</Form.Item>

				<Form.List
					initialValues={{ remember: true }}
					name="options"
					rules={[
						{
							validator: async (_, names) => {
								if (!names || names.length < 2) {
									return Promise.reject(new Error("At least 2 options"));
								}
							},
						},
					]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							{fields.map((field, index) => (
								<Form.Item
									{...(index === 0
										? formItemLayout
										: formItemLayoutWithOutLabel)}
									label={index === 0 ? "Options" : ""}
									required={false}
									key={field.key}
								>
									<Form.Item
										{...field}
										name={[field.name, "optionContent"]}
										validateTrigger={["onChange", "onBlur"]}
										rules={[
											{
												required: true,
												whitespace: true,
												message: "Please input option or delete this field.",
											},
										]}
										noStyle
									>
										<TextArea
											placeholder="Input option"
											style={{ width: "86%" }}
										/>
									</Form.Item>
									<div className="dynamic-container">
										<div className="dynamic-wrap">
											<Popover content={"Check true"}>
												<Form.Item
													{...field}
													name={[field.name, "isCorrect"]}
													valuePropName="checked"
												>
													<Checkbox className="dynamic-checkbox" />
												</Form.Item>
											</Popover>
											<Popover content={"Remove option"}>
												<Form.Item>
													{fields.length > 1 ? (
														<DeleteOutlined
															className="dynamic-delete-button"
															onClick={() => remove(field.name)}
														/>
													) : null}
												</Form.Item>
											</Popover>
										</div>
									</div>
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									style={{ width: "86%" }}
									icon={<PlusOutlined />}
								>
									Add option
								</Button>
								<Form.ErrorList errors={errors} />
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add question
					</Button>
					<Button
						style={{ margin: "0 8px" }}
						onClick={() => {
							form.resetFields();
						}}
					>
						Clear
					</Button>
					<Tooltip title={title}>
						<QuestionOutlined className="tooltip-icon" />
					</Tooltip>
				</Form.Item>
			</Form>
		</div>
	);
}

export default AddQuestion;
