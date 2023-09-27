import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import { DestinationProp, FileType, PostProp } from '../posts/create/page'
import axios from 'axios'

export interface PostState {
  post: PostProp
  loading: boolean
  error: any
  updateLoading: boolean
  updateError: any
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
  error: null,
  updateLoading: false,
  updateError: null
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
  // why don't use try() catch()
  const postId = params.postId
  const { data: response } = await axios.get(`http://localhost:3000/posts/${postId}`)
  return response
})

export const updatePost = createAsyncThunk('post/updatePost', async (params: { postId: string, updatingPost: PostProp }) => {
  const postId = params.postId
  const updatingPost = params.updatingPost
  const { data: response } = await axios.put(`http://localhost:3000/posts/${postId}`, updatingPost)
  console.log('redux update response: ', response)
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
        state.updateLoading = true
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.updateLoading = false
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.error.message
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
export const selectPostAreaTagsArray = (state: RootState) => {
  const getCheckedAreaTags = defaultTags.map(t => {
    if (state.post.post.areaTags.find((c: string) => c === t.name)) {
      return {
        ...t,
        checked: true
      }
    }
    return t
  })
  return getCheckedAreaTags
}
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
// const selectPostAreaTagsMemo = selectPostAreaTags(state)
export const selectPostDepartProvince = (state: RootState) => state.post.post.departProvince
export const selectPostDestinations = (state: RootState) => state.post.post.destinations
export const selectPostFileType = (state: RootState) => state.post.post.fileType
export const selectPostUpdateLoading = (state: RootState) => state.post.updateLoading
export const selectPostUpdateError = (state: RootState) => state.post.updateError

export default postSlice.reducer