import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlice"
import { counterReducer } from "./slices/counterSlice"
import { loadingReducer } from "./slices/loadingSlice"
import { filterReducer } from "./slices/filterSlice"
import { cartReducer } from "./slices/cartSlice"
import { themeSliceReducer } from "./slices/themeSlice"

// Типизация для состояния всего хранилища
export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    loading: loadingReducer,
    filter: filterReducer,
    cart: cartReducer,
    theme: themeSliceReducer,
  },
})

// Типизация состояния хранилища, используемого в приложении
export type RootState = ReturnType<typeof store.getState>
// Типизация диспатча
export type AppDispatch = typeof store.dispatch

