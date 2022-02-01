import {
	DeleteOutlined,
	PlusOutlined,
	QuestionOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Popover, Tooltip } from "antd";
import questionAPI from "apis/question.api";
import Notification from "components/Notification";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeModalUpdateVisible } from "redux/actions/status";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MyUploadAdapter from "components/Editor";
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

function UpdateQuestion(props) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { TextArea } = Input;
	const { question } = props;
	const [btnSubmit, setSubmit] = useState(1);
	let { search } = useLocation();
	let query = new URLSearchParams(search);
	const flashcardId = query.get("flashcardId");

	const [questionContent, setQuestionContent] = useState();

	useEffect(() => {
		const options = [];
		question.option.map((opt) => {
			if (opt.isCorrect.data[0] === 1) {
				const newOption = {
					optionId: opt.optionId,
					optionContent: opt.optionContent,
					isCorrect: true,
				};
				options.push(newOption);
			} else {
				const newOption = {
					optionId: opt.optionId,
					optionContent: opt.optionContent,
					isCorrect: false,
				};
				options.push(newOption);
			}
		});

		form.setFieldsValue({
			questionContent: question.question.questionContent,
			options: options,
		});
	}, [question]);

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

	const updateQuestion = async (values) => {
		const options = getOptions(values);
		let newOption = [];
		let optionList = [];
		options.map((item) => {
			if (item.optionId === undefined) {
				newOption.push(item);
			} else {
				optionList.push(item);
			}
		});
		const params = {
			question: {
				questionId: question.question.questionId,
				questionContent: questionContent
					? questionContent
					: question.question.questionContent,
			},
			options: optionList,
			newOption: newOption,
		};
		const response = await questionAPI.updateQuesion(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			refresh();
			dispatch(changeModalUpdateVisible(false));
		} else {
			Notification("error", response.message);
		}
	};

	const addCopyQuestion = async (values) => {
		const options = getOptions(values);
		const params = {
			question: {
				questionContent: questionContent
					? questionContent
					: question.question.questionContent,
				flashcardId: parseInt(flashcardId),
			},
			options: options,
		};
		const response = await questionAPI.addQuestionOption(params);
		if (response.status === "Success") {
			Notification("success", response.message);
			refresh();
			dispatch(changeModalUpdateVisible(false));
		} else {
			Notification("error", response.message);
		}
	};

	const onFinish = (values) => {
		if (btnSubmit === 1) {
			updateQuestion(values);
		} else {
			addCopyQuestion(values);
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
				<Form.Item
					label="Question:"
					{...formItemLayout}
					rules={[
						{
							required: true,
							whitespace: true,
							min: 10,
							message: "Please input question.",
						},
					]}
				>
					<div style={{ width: "86%" }}>
						<CKEditor
							data={question.question.questionContent}
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
								setQuestionContent(data);
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
					<Button
						type="primary"
						onClick={() => {
							setSubmit(1);
						}}
						htmlType="submit"
					>
						Update
					</Button>
					<Button
						type="primary"
						style={{ margin: "0 8px" }}
						onClick={() => {
							setSubmit(2);
						}}
						htmlType="submit"
					>
						Add Copy
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
export default UpdateQuestion;
