import {
	FacebookOutlined,
	TwitterOutlined,
	GithubOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../Footer/footer.css";

function Footer() {
	return (
		<Router>
			<footer className="footer section bd-container">
				<div className="footer__container bd-grid">
					<div className="footer__content">
						<h3 className="footer__title">
							<Link to="/" className="footer__logo">
								Flashcard
							</Link>
						</h3>
						<span className="footer__description">Learning tool systems</span>
						<div>
							<Link to="/" className="footer__social">
								<FacebookOutlined />
							</Link>
							<Link to="/" className="footer__social">
								<TwitterOutlined />
							</Link>
							<Link to="/" className="footer__social">
								<GithubOutlined />
							</Link>
						</div>
					</div>

					<div className="footer__content">
						<h3 className="footer__title">Subject</h3>
						<ul>
							<li>Languages</li>
							<li>Math</li>
							<li>Science</li>
							<li>Social Science</li>
						</ul>
					</div>

					<div className="footer__content">
						<h3 className="footer__title">Feature</h3>
						<ul>
							<li>Quiz live</li>
							<li>Video traning</li>
							<li>Supporter</li>
							<li>Terms of services</li>
						</ul>
					</div>

					<div className="footer__content">
						<h3 className="footer__title">Address</h3>
						<ul>
							<li>District</li>
							<li>Ho Chi Minh</li>
							<li>999 - 888 - 777</li>
							<li>flashcard@gmail.com</li>
						</ul>
					</div>
				</div>
				<p className="footer__copy">&#169; 2021 Flashcard Team.</p>
			</footer>
		</Router>
	);
}
export default Footer;
