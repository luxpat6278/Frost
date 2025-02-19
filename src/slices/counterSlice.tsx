import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CounterState {
  counter: number
}

const initialState: CounterState = {
  counter: 0,
}

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTotalCount(state, action: PayloadAction<number>) {
      state.counter = action.payload
    },
  },
})

export const { setTotalCount } = counterSlice.actions

export const counterReducer = counterSlice.reducer
