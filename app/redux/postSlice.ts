import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../redux/store'
import { DestinationProp, FileType, PostProp } from '../posts/create/page'
import axios from 'axios'

export interface GetPostState {
  post: {
    id: string,
    fileType: FileType | null
    title: string
    length: string
    unit: string
    areaTags: string[]
    departProvince: string | undefined
    departCity: string | undefined
    destinations: DestinationProp[]
  }
  loading: boolean
  error: any
}

const initialState: GetPostState = {
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
  // why don't use try() catch()
  const postId = params.postId
  const { data: response } = await axios.get(`http://localhost:3000/posts/${postId}`)
  console.log('slice response: ', response)
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
  }
})

export const selectGetPostLoading = (state: RootState) => state.post.loading
export const selectGetPostError = (state: RootState) => state.post.error
export const selectPost = (state: RootState) => state.post.post
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
export const selectPostDepartProvince = (state: RootState) => state.post.post.departProvince
export const selectPostDestinations = (state: RootState) => state.post.post.destinations

export default postSlice.reducer