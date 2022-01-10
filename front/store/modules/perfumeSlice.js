import { createSlice } from "@reduxjs/toolkit";
import { getPerfumeList, getPerfumeDetail, getUserPerfumeList } from "../thunk/perfumeThunk";

const initialState = {
	list: {
		rows: [],
		count: 0,
	},
	detail: null,
	isLoading: false,
};

const perfumeSlice = createSlice({
	name: "perfume",
	initialState,
	reducers: {

	},
	extraReducers: {
		[getPerfumeList.pending]: (state, {payload}) => {
			state.isLoading = true;
		},
		[getPerfumeList.fulfilled]: (state, {payload}) => {
			state.list = payload;
			state.isLoading = false;
		},
		[getUserPerfumeList.pending]: (state, {payload}) => {
			state.isLoading = true;
		},
		[getUserPerfumeList.fulfilled]: (state, {payload}) => {
			state.list = payload;
			state.isLoading = false;
		},
		[getPerfumeDetail.fulfilled]: (state, {payload}) => {
			state.detail = payload;
		},
	},
});

const { actions, reducer } = perfumeSlice;
export const { setKeywordReducer } = perfumeSlice.actions;
export default reducer;
