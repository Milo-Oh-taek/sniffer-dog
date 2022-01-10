import { createSlice } from "@reduxjs/toolkit";
import {
	getReviewList,
	getReviewStats,
	postReviewLike,
	postReviewDislike,
	postReview,
	getUserReviewList,
	modifyReview,
} from "../thunk/reviewThunk";

const initialState = {
	list: [],
	statistics: [],
	totalCount: 0,
	hasMoreReviews: true,
	likedError: null,
	postError: null,
	postFulfilled: false,
	modifyDone: false,
	modifyError: null,
};

const reviewSlice = createSlice({
	name: "review",
	initialState,
	reducers: {
		resetlikedError: (state, action) => {
			state.likedError = null;
		},
	},
	extraReducers: {
		[getReviewList.fulfilled]: (state, { payload }) => {
			state.list = payload.rows;
			state.totalCount = payload.count;
			state.hasMoreReviews = !(payload.rows.length == payload.count);
		},
		[getUserReviewList.fulfilled]: (state, { payload }) => {
			state.list = payload.rows;
			state.totalCount = payload.count;
		},
		[getReviewStats.fulfilled]: (state, { payload }) => {
			state.statistics = payload;
		},
		[postReviewLike.rejected]: (state, { payload }) => {
			state.likedError = payload;
		},
		[postReviewDislike.rejected]: (state, { payload }) => {
			state.likedError = payload;
		},
		[postReview.fulfilled]: (state, { payload }) => {
			state.postFulfilled = true;
		},
		[postReview.rejected]: (state, { payload }) => {
			state.likedError = payload;
		},
		[modifyReview.fulfilled]: (state, { payload }) => {
			state.modifyDone = true;
		},
		[modifyReview.rejected]: (state, { payload }) => {
			state.modifyError = payload;
		},
	},
});

const { reducer } = reviewSlice;
export const { resetlikedError, noMoreReviews } = reviewSlice.actions;
export default reducer;
