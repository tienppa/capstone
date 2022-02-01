import { Link } from "react-router-dom";
import "../NotFound/index.style.css";

export default function NotFound(props) {
	const defaultMsg =
		"Sorry but the page you are looking for does not exist," +
		" have been removed, name changed or is temporarily unavailable.";

	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404">
					<h1>404</h1>
				</div>
				<h2>Oops! This Page Could Not Be Found</h2>
				<p>{props.message ? props.message : defaultMsg}</p>
				<Link to="/">Go To Homepage</Link>
			</div>
		</div>
	);
}
