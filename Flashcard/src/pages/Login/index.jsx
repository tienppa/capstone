import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import images from "constants/images";
import "../../assets/css/account.css";
import "antd/dist/antd.css";
import authAPI from "../../apis/auth.api";
import { saveProfileAction } from "redux/actions/user";
import jwtDecode from "jwt-decode";
import { HomeOutlined } from "@ant-design/icons";
import Notification from "components/Notification";

function LoginPage() {
	const history = useHistory();
	const dispatch = useDispatch();

	const onFinish = async (values) => {
		if (!values) return;
		try {
			const response = await authAPI.login(values);
			if (response.status === "Success") {
				localStorage.setItem("accessToken", response.tokens);
				localStorage.setItem("refreshToken", response.refreshToken);
				Notification("success", "Login successfully");
				const account = await jwtDecode(response.tokens);
				const action = saveProfileAction(account);
				dispatch(action);
				if (account.roleId === 1 || account.roleId === 3) {
					history.push("/latest");
				} else {
					history.push("/admin");
				}
			} else {
				Notification("error", response.Message);
			}
		} catch (error) {
			console.log("Catch error: ", error.message);
		}
	};

	return (
		<>
			<div className="back-to-home">
				<Link to="/" className="home-link">
					<HomeOutlined className="home-icon" /> Home
				</Link>
			</div>
			<div className="limiter">
				<div className="container">
					<div className="wrap">
						<div className="pic js-tilt" data-tilt>
							<img src={images.LOGIN_SVG} alt="login" />
						</div>
						<Form
							name="normal_login"
							className="form-control"
							initialValues={{ remember: false }}
							onFinish={onFinish}
							autoComplete="off"
						>
							<span className="form-control-title">Login From</span>
							<Form.Item
								name="email"
								className="form-group"
								rules={[
									{
										required: true,
										type: "email",
										message: "Please input your Email!",
									},
								]}
							>
								<Input className="form-input" placeholder="Email" />
							</Form.Item>
							<Form.Item
								name="password"
								className="form-group"
								rules={[
									{
										required: true,
										min: 6,
										message: "Please input your Password!",
									},
								]}
							>
								<Input
									className="form-input"
									type="password"
									placeholder="Password"
								/>
							</Form.Item>
							<Form.Item className="form-group txt2">
								<Form.Item
									name="remember"
									className="form-input form-check"
									valuePropName="checked"
									noStyle
								>
									<Checkbox>Remember me</Checkbox>
								</Form.Item>

								<Link className="login-form-forgot link-a" to="">
									Forgot password
								</Link>
							</Form.Item>
							<Form.Item className="form-group">
								<Button htmlType="submit" className="form-control-btn">
									Login
								</Button>
							</Form.Item>
							<Form.Item className="form-group text-center p-t-50">
								<Link className="link-a" to="/register">
									Create your account
								</Link>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
