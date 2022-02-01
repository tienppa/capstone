import { Redirect } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";
import { useAuthenticated } from "./useAuthenticated";

export default function AuthenticatedGuard({ children }) {
	const authenticated = useAuthenticated();

	if (!authenticated) {
		return <Redirect to={pathConstants.LOGIN} />;
	}

	return <> {children} </>;
}
