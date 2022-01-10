import { createSlice } from '@reduxjs/toolkit';
import { getBrandList } from '../thunk/brandThunk';

const initialState = {
    list: {},
}

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getBrandList.fulfilled]: (state, action) => {
            state.list = action.payload;
        }
    }
})

const { actions, reducer } = brandSlice
export const brandActions = actions;
export default reducer;