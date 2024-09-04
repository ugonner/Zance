// store/eventSlice.ts
// event from types
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

const initialState = {
  eventList: [],
  isLoading: false,
  eventDetail: null,
}

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
  },
})

export const { setEvents, setEventDetail } = eventSlice.actions
export default eventSlice.reducer

export const getEventList = (state: RootState) => state.events.eventList
