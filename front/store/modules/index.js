import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "@reduxjs/toolkit";

import perfume from "./perfumeSlice";
import brand from './brandSlice';
import review from './reviewSlice';
import user from './userSlice';
import post from './postSlice';

const rootReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log("HYDRATE", action);
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				perfume,
				brand,
				review,
				user,
				post,
			});
			return combinedReducer(state, action);
		}
	}
};

export default rootReducer;
