import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../common/customAxios";

export const getReviewList = createAsyncThunk(
	"review/getList",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.get(`/reviews/${data.id}`, {
				params: { page: data.page, sortby: data.sortby },
			});

			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const getUserReviewList = createAsyncThunk(
	"review/getUserReviewList",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.get(`/reviews/user/${data.userId}`);

			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const getReviewStats = createAsyncThunk(
	"review/getStats",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.get(`/reviews/statistics/${data}`);
			const avgInfo = res.data.avgInfo[0];
			const cntInfo = res.data.cntInfo;

			const statistics = {
				RadarData: [
					{
						item: "longevity",
						avg: Math.round(avgInfo.longevityAVG) *10,
					},
					{
						item: "sillage",
						avg: Math.round(avgInfo.sillageAVG) *10,
					},
					{
						item: "male",
						avg: Math.round(avgInfo.maleAVG) *10,
					},
					{
						item: "female",
						avg: Math.round(avgInfo.femaleAVG) *10,
					},
					{
						item: "value",
						avg: Math.round(avgInfo.valueAVG) *10,
					},
				],
				overall: avgInfo.overallAVG? avgInfo.overallAVG.toFixed(1):0,
				cntInfo,
			};
			return statistics;
		} catch (err) {
			console.error(err);
		}
	},
);

export const postReview = createAsyncThunk(
	"review/post",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/reviews`, data);

			if (res.status !== 201) {
				return thunkAPI.rejectWithValue("failed");
			}

		} catch (err) {
			console.error(err);
		}
	},
);

export const postReviewLike = createAsyncThunk(
	"review/postLike",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/reviews/like`, data);

			if (res.status !== 201) {
				return thunkAPI.rejectWithValue("already liked this review");
			}

			thunkAPI.dispatch(getReviewList(data));
		} catch (err) {
			console.error(err);
		}
	},
);

export const postReviewDislike = createAsyncThunk(
	"review/postDislike",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/reviews/dislike`, data);

			if (res.status !== 201) {
				return thunkAPI.rejectWithValue("already disliked this review");
			}

			thunkAPI.dispatch(getReviewList(data));
		} catch (err) {
			console.error(err);
		}
	},
);

export const modifyReview = createAsyncThunk(
	"review/modifyReview",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.patch(`/reviews/${data.id}`, {
				title: data.title,
				content: data.content,
			});

			if (res.data === "error") {
				return thunkAPI.rejectWithValue("error");
			}

			return data;
		} catch (err) {
			console.error(err);
		}
	},
);
