import { createSlice } from '@reduxjs/toolkit';
import { getPostList, addPost, addComment, getUserPostList, deletePost } from '../thunk/postThunk';

const initialState = {
    postList: [],
    hasMorePosts: true,
    userPostList: [],
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        noMorePosts: (state, action) => {
            state.hasMorePosts = false;
        },
    },
    extraReducers: {
        [getPostList.fulfilled]: (state, {payload}) => {
            state.postList = state.postList.concat(payload);
            state.hasMorePosts = payload.length === 10;
        },
        [addPost.fulfilled]: (state, {payload}) => {
            state.postList.unshift(payload);
        },
        [deletePost.fulfilled]: (state, {payload}) => {
            state.postList = state.postList.filter((p) => p.id != payload);
            state.userPostList = state.userPostList?.filter((p) => p.id != payload);
        },
        [addComment.fulfilled]: (state, {payload}) => {
            const post = state.postList.find((p) => p.id === payload.PostId);
            post.Comments.push(payload);
        },
        [getUserPostList.fulfilled]: (state, {payload}) => {
            state.userPostList = payload;
        },
    }
})

const { reducer } = postSlice
export const { noMorePosts, resetPosts } = postSlice.actions;
export default reducer;