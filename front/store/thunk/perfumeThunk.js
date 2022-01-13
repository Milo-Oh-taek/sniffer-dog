import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import axiosInstance from "../../common/customAxios";

export const getPerfumeList = createAsyncThunk(
	"perfume/getList",
	async (data, thunkAPI) => {
		try {
            const datas = data;
            if(typeof datas.brand === 'object'){
                datas.brand = datas.brand.join();
            }
            if(typeof datas.gender === 'object'){
                datas.gender = datas.gender.join();
            }
            
			const res = await axiosInstance("/perfumes", { params: datas });
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},
);

export const getUserPerfumeList = createAsyncThunk(
	"perfume/getUserPerfumeList",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance(`/perfumes/user/${data.userId}`);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},
);

export const getPerfumeDetail = createAsyncThunk(
	"perfume/getDetail",
	async (data, thunkAPI) => {
		try {
			const res = await axiosInstance.get(`/perfume/${data}`);
			const notesRes = await axiosInstance.get("/notes");
			const notes = notesRes.data;

			if (res.data.topNote) {
				let topNoteStr = res.data.topNote.split(",");
				let topNote = [];
				topNoteStr.forEach((el) => {
					let temp = notes.find((x) => x.id == el).name;
					if (temp) {
						topNote.push(temp);
					}
				});
				res.data.topNote = topNote;
			}

			if (res.data.middleNote) {
				let middleNoteStr = res.data.middleNote.split(",");
				let middleNote = [];
				middleNoteStr.forEach((el) => {
					let temp = notes.find((x) => x.id == el).name;
					if (temp) {
						middleNote.push(temp);
					}
				});
				res.data.middleNote = middleNote;
			}

			let baseNoteStr = res.data.baseNote.split(",");
			let baseNote = [];
			baseNoteStr.forEach((el) => {
				let temp = notes.find((x) => x.id == el).name;
				if (temp) {
					baseNote.push(temp);
				}
			});
			res.data.baseNote = baseNote;

			return res.data;
		} catch (err) {
			console.log(err);
		}
	},
);
