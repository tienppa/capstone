import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import { pathConstants } from "./constants/pathConstants";
import { history } from "helpers/history";

// import page
import HomePage from "pages/Home";
import RegisterPage from "pages/Register";
import LoginPage from "pages/Login";

//	import layout
import Layout from "layouts/Layout";
import Latest from "layouts/Latest";
import Author from "layouts/Author";
import Admin from "layouts/Admin";
import NotFound from "components/NotFound";
import Profile from "layouts/Profile";
import Quiz from "layouts/Quiz";
import Donor from "layouts/Donor";

// import authen
import AuthenticatedGuard from "guards/AuthenticatedGuard";
import UnauthenticatedGuard from "guards/UnauthenticatedGuard";
import BasicRole from "guards/BasicRole";
import AdminRole from "guards/AdminRole";
import DonorRole from "guards/DonorRole";
import HomeGift from "components/Gift/Home";

function App() {
	return (
		<>
			<Router history={history}>
				<Switch>
					<Route path={pathConstants.HOME} exact>
						<Layout>
							<HomePage />
						</Layout>
					</Route>

					<Route path={pathConstants.NOTFOUND}>
						<NotFound />
					</Route>

					<Route path={pathConstants.REGISTER}>
						<UnauthenticatedGuard>
							<RegisterPage />
						</UnauthenticatedGuard>
					</Route>

					<Route path={pathConstants.LOGIN}>
						<UnauthenticatedGuard>
							<LoginPage />
						</UnauthenticatedGuard>
					</Route>

					<Route path={pathConstants.PROFILE}>
						<AuthenticatedGuard>
							<BasicRole>
								<Profile />
							</BasicRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.LATEST}>
						<AuthenticatedGuard>
							<BasicRole>
								<Latest />
							</BasicRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.AUTHOR}>
						<AuthenticatedGuard>
							<BasicRole>
								<Author />
							</BasicRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.QUIZ}>
						<AuthenticatedGuard>
							<BasicRole>
								<Quiz />
							</BasicRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.GIFT}>
						<AuthenticatedGuard>
							<BasicRole>
								<HomeGift />
							</BasicRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.DONOR}>
						<AuthenticatedGuard>
							<DonorRole>
								<Donor />
							</DonorRole>
						</AuthenticatedGuard>
					</Route>

					<Route path={pathConstants.ADMIN}>
						<AuthenticatedGuard>
							<AdminRole>
								<Admin />
							</AdminRole>
						</AuthenticatedGuard>
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
