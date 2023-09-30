import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import { PostProp } from '../posts/create/page'
import axios from 'axios'

export interface PostState {
  post: PostProp
  loading: boolean
  error: any
}
const initialState: PostState = {
  post: {
    id: '',
    fileType: null,
    title: '',
    length: '',
    unit: '',
    areaTags: [],
    departProvince: '',
    departCity: '',
    destinations: []
  },
  loading: true,
  error: null
}
const defaultTags = [
  {
    id: 1,
    name: 'GTA',
    checked: false
  },
  {
    id: 2,
    name: 'Halifax',
    checked: false
  }
]
export const getPost = createAsyncThunk('post/getPost', async (params: { postId: string }) => {
  const postId = params.postId
  const { data: response } = await axios.get(`http://localhost:3000/posts/${postId}`)
  return response
})

export const updatePost = createAsyncThunk('post/updatePost', async (params: { postId: string, updatingPost: PostProp }) => {
  const postId = params.postId
  const updatingPost = params.updatingPost
  const { data: response } = await axios.put(`http://localhost:3000/posts/${postId}`, updatingPost)
  return response
})

export const deletePost = createAsyncThunk('post/deletePost', async (params: { postId: string }) => {
  const postId = params.postId
  console.log('deleting postId in redux: ', postId)
  const { data: response } = await axios.delete(`http://localhost:3000/posts/${postId}`)
  console.log('delete in redux: ', response)
  return response
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPost.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false
        state.post = action.payload
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const selectGetPostLoading = (state: RootState) => state.post.loading
export const selectGetPostError = (state: RootState) => state.post.error
export const selectPost = (state: RootState) => state.post.post
export const selectPostTitle = (state: RootState) => state.post.post.title
export const selectPostLength = (state: RootState) => state.post.post.length
export const selectPostTimeUnit = (state: RootState) => state.post.post.unit
export const selectPostTags = (state: RootState) => state.post.post.areaTags
export const selectPostAreaTags = createSelector([selectPostTags], (areaTags) => {
  const getCheckedAreaTags = defaultTags.map(t => {
    if (areaTags.find((c: string) => c === t.name)) {
      return {
        ...t,
        checked: true
      }
    }
    return t
  })
  return getCheckedAreaTags
})
export const selectPostDepartProvince = (state: RootState) => state.post.post.departProvince
export const selectPostDestinations = (state: RootState) => state.post.post.destinations
export const selectPostFileType = (state: RootState) => state.post.post.fileType

export default postSlice.reducer