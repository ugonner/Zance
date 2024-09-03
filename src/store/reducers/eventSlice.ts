// store/eventSlice.ts
// event from types
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

const initialState = {
  eventList: [],
  isLoading: false,
}

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action: PayloadAction) {
      state.eventList = action.payload.data
    },
  },
})

export const { setEvents } = eventSlice.actions
export default eventSlice.reducer

export const getEventList = (state: RootState) => state.events.eventList
