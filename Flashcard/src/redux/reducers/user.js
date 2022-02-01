const initialState = {
	currentUser: null,
	idQ: 0,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_USER": {
			return {
				...state,
				currentUser: action.payload,
			};
		}
		case "UPDATE_PROFILE": {
			return {
				...state,
				currentUser: action.payload,
			};
		}
		case "UPDATE_HOBBY_TOPIC": {
			return {
				...state,
				currentUser: action.payload,
			};
		}
		case "UPDATE_POINT_USER": {
			return {
				...state,
				currentUser: {
					...state.currentUser,
					point: action.payload,
				},
			};
		}
		case "LOGOUT": {
			return {
				...state,
				currentUser: null,
			};
		}
		case "REGISTER": {
			return state;
		}
		default:
			return state;
	}
};

export default userReducer;
