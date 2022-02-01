import { Redirect } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";
import { useAuthenticated } from "./useAuthenticated";

export default function UnauthenticatedGuard({ children }) {
	const authenticated = useAuthenticated();

	if (authenticated) {
		return <Redirect to={pathConstants.HOME} />;
	}

	return <> {children} </>;
}
