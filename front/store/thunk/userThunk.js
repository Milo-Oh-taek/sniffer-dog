import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from '../../common/customAxios';

export const loginRequest = createAsyncThunk(
	"user/login",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/user/login`, data);
			
			if(!res.data.id){
				return thunkAPI.rejectWithValue(res.data);
			}

			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const logoutRequest = createAsyncThunk(
	"user/logout",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/user/logout`, data);
			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const signupRequest = createAsyncThunk(
	"user/signup",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/user/signup`, data);
			
			if(res.status !== 201){
				return thunkAPI.rejectWithValue(res.data);
			}

			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const getUserInfo = createAsyncThunk(
	"user/userInfo",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.get(`/user`);

			let likes = null;
			const userInfo = {};

			if(res.data && res.data.id){
				const id = res.data.id;
				likes = await axiosInstance.get(`/user/like/${id}`, data);
				userInfo.likes = likes.data;
			}

			userInfo.userInfo = res.data;

			return userInfo;
		} catch (err) {
			console.error(err);
		}
	},
);

export const likePerfume = createAsyncThunk(
	"user/likePerfume",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.post(`/user/perfume/like`, data);
			
			thunkAPI.dispatch(getUserInfo());
			return res.data;
		} catch (err) {
			console.error(err);
		}
	},
);

export const changeNickname = createAsyncThunk(
	"user/changeNickname",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.patch(`/user/nickname`, data);
			
			if(res.data === 'exist'){
				return thunkAPI.rejectWithValue('already exist');
			}

			return data.nickname;
		} catch (err) {
			console.error(err);
		}
	},
);