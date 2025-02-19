import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Типизация состояния
interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false,
}

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const { setLoading } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer
