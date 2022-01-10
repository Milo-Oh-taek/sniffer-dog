import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import axiosInstance from '../../common/customAxios';

export const getPerfumeList = createAsyncThunk(
    "perfume/getList",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance('/perfumes', { params: data});
            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);

export const getUserPerfumeList = createAsyncThunk(
    "perfume/getUserPerfumeList",
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance(`/perfumes/user/${data.userId}`);
            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);

export const getPerfumeDetail = createAsyncThunk(
    "perfume/getDetail",
    async (data, thunkAPI) => {
        try {

            const res = await axiosInstance.get(`/perfume/${data}`);
            const notesRes = await axiosInstance.get('/notes');
            const notes = notesRes.data;

            let topNoteStr = res.data.topNote.split(',');
            let middleNoteStr = res.data.middleNote.split(',');
            let baseNoteStr = res.data.baseNote.split(',');

            let topNote = [];
            let middleNote = [];
            let baseNote = [];

            topNoteStr.forEach(el => {
                let temp = notes.find(x => x.id == el).name;
                if(temp) {
                    topNote.push(temp);
                }
            });
            
            middleNoteStr.forEach(el => {
                let temp = notes.find(x => x.id == el).name;
                if(temp) {
                    middleNote.push(temp);
                }
            });
            
            baseNoteStr.forEach(el => {
                let temp = notes.find(x => x.id == el).name;
                if(temp) {
                    baseNote.push(temp);
                }
            });

            res.data.topNote = topNote;
            res.data.middleNote = middleNote;
            res.data.baseNote = baseNote;

            return res.data;
        } catch (err){
            console.log(err);
        }
    }
);

