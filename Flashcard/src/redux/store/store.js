import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../reducers/user";
import subjectReducer from "redux/reducers/subject";
import adminReducer from "redux/reducers/admin";
import statusReducer from "redux/reducers/status";
import latestReducer from "redux/reducers/latest";
import authorReducer from "redux/reducers/author";
import activityReducer from "redux/reducers/activity";
import quizReducer from "redux/reducers/quiz";
import donorReducer from "redux/reducers/donor";
import cartReducer from "redux/reducers/cart";

const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: ["user", "quiz"],
};

const reducer = combineReducers({
	user: userReducer,
	subject: subjectReducer,
	admin: adminReducer,
	status: statusReducer,
	latest: latestReducer,
	author: authorReducer,
	activity: activityReducer,
	quiz: quizReducer,
	donor: donorReducer,
	cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
});

export const persistor = persistStore(store);

export default store;
