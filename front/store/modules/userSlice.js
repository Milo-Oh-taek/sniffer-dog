import { createSlice } from "@reduxjs/toolkit";
import {
	loginRequest,
	logoutRequest,
	signupRequest,
	getUserInfo,
	changeNickname,
} from "../thunk/userThunk";

const initialState = {
	userInfo: {},
	loginError: null,
	signupError: null,
	signupLoading: false,
	signupDone: false,
    changeNicknameDone: false,
    changeNicknameError: null,
	reviewList: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetLoginErr: (state, action) => {
			state.loginError = null;
		},
		resetSignupErr: (state, action) => {
			state.signupError = null;
		},
		resetSignupDone: (state, action) => {
			state.signupDone = null;
		},
	},
	extraReducers: {
		[loginRequest.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
		},
		[loginRequest.rejected]: (state, { payload }) => {
			state.loginError = payload;
		},
		[signupRequest.pending]: (state, { payload }) => {
			state.signupLoading = true;
		},
		[signupRequest.fulfilled]: (state, { payload }) => {
			state.signupLoading = false;
			state.signupDone = true;
		},
		[signupRequest.rejected]: (state, { payload }) => {
			state.signupLoading = false;
			state.signupError = payload;
		},
		[getUserInfo.fulfilled]: (state, { payload }) => {
			state.userInfo = payload;
		},
		[logoutRequest.fulfilled]: (state, { payload }) => {
			state.userInfo = null;
		},
        [changeNickname.fulfilled]: (state, { payload }) => {
			state.userInfo.userInfo.nickname = payload;
            state.changeNicknameDone = true;
		},
        [changeNickname.rejected]: (state, { payload }) => {
			state.changeNicknameError = payload;
		},
	},
});

const { reducer } = userSlice;
export const { resetLoginErr, resetSignupErr, resetSignupDone } =
	userSlice.actions;
export default reducer;
