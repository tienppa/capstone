import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { pathConstants } from "../constants/pathConstants";

function RoleGuard() {
	const user = useSelector((state) => state.user.currentUser);
	if (!user) {
		return 0;
	}

	return user.roleId;
}

export default function AdminRole({ children }) {
	const role = RoleGuard();

	if (role === 2) {
		return <> {children} </>;
	}
	return (
		<Redirect
			to={pathConstants.NOTFOUND}
			message={"Not permission. Try another account."}
		/>
	);
}
