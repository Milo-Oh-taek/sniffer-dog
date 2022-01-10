import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import axiosInstance from '../../common/customAxios';
import { noMorePosts, resetPosts } from '../modules/postSlice';

export const getPostList = createAsyncThunk(
    "post/getList",
    async (data, thunkAPI) => {
        try {

            const res = await axiosInstance.get(`/posts`, {params: data});
            const resData = res.data;
            
            return resData;
        } catch (err){
            console.log(err);
        }
    }
);

export const getUserPostList = createAsyncThunk(
    "post/getUserPostList",
    async (data, thunkAPI) => {
        try {

            const res = await axiosInstance.get(`/posts/user/${data.userId}`);
            const resData = res.data;
            
            return resData;
        } catch (err){
            console.log(err);
        }
    }
);

export const addPost = createAsyncThunk(
    "post/addPost",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/posts', data);

            if(res.status === 200){
                return thunkAPI.rejectWithValue('failed');
            }
            
            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/posts/${data.postId}`);
            
            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);

export const addComment = createAsyncThunk(
    "post/addComment",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.post('/posts/comment', data);

            if(res.status === 200){
                return thunkAPI.rejectWithValue('failed');
            }

            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);
