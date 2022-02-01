import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { BackTop } from "antd";

const style = {
	height: 40,
	width: 40,
	lineHeight: "40px",
	borderRadius: 4,
	backgroundColor: "#1088e9",
	color: "#fff",
	textAlign: "center",
	fontSize: 14,
	zIndex: 1000,
};

export default function Layout(props) {
	return (
		<>
			<Header />
			{props.children}
			<BackTop>
				<div style={style}>UP</div>
			</BackTop>
			<Footer />
		</>
	);
}
