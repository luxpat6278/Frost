import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Типизация состояния
interface ThemeState {
  theme: "light" | "dark"
}

const initialState: ThemeState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", state.theme)
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export const themeSliceReducer = themeSlice.reducer
