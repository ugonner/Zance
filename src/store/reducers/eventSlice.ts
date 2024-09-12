// store/eventSlice.ts
// event from types
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface EventState {
  eventList: any[]
  isLoading: boolean
  eventDetail: any | null
  tagList: string[]
  error: string | null
}

const initialState: EventState = {
  eventList: [],
  isLoading: false,
  eventDetail: null,
  tagList: [],
  error: null,
}

export const fetchTags = createAsyncThunk('events/fetchTags', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://zance-api.azurewebsites.net/api/v1/tags')
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch tags')
    }
    return data?.data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return rejectWithValue(errorMessage)
  }
})

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction<any>) {
      state.eventList = action?.payload?.data
    },
    setEventDetail(state, action: PayloadAction<any>) {
      state.eventDetail = action?.payload?.data
    },
    setTagList(state, action: PayloadAction<any>) {
      state.tagList = action?.payload?.data
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTags.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false
        state.tagList = action.payload
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { setEvents, setEventDetail, setTagList } = eventSlice.actions
export default eventSlice.reducer

export const getEventList = (state: RootState) => state.events.eventList
export const getTagList = (state: RootState) => state.events.tagList
