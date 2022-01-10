import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import axiosInstance from '../../common/customAxios';

export const getBrandList = createAsyncThunk(
    "brand/getList",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.get('/brands');
            
            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);
