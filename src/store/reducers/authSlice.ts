// store/authSlice.ts
import { User } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

interface UserPayload {
  user: User
  token: string
}

interface NamePayload {
  fullname: string
}

interface ProfilePhotoPayload {
  profilePhoto: string
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    setUserFullname(state, action: PayloadAction<NamePayload>) {
      if (state.user)
        state.user = {
          ...state.user,
          profile: {
            ...state.user?.profile,
            fullname: action.payload?.fullname,
          },
        }
    },
    setUserProfilePicture(state, action: PayloadAction<ProfilePhotoPayload>) {
      if (state.user) {
        state.user = {
          ...state.user,
          profile: {
            ...state.user?.profile,
            profilePhoto: action.payload?.profilePhoto,
          },
        }
      }
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, setUserFullname, setUserProfilePicture, logout } = authSlice.actions

export default authSlice.reducer

// A good practice to export these functions here for useSelector
export const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated

export const getLoggedInUser = (state: RootState) => state.auth.user

export const getToken = (state: RootState) => state.auth.token
