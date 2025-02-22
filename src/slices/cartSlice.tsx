import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios"
import { AppDispatch, RootState } from "../store" // Убедитесь, что у вас есть типы для dispatch и состояния

// Типизация для tokenInfo и user
interface TokenInfo {
  accessToken: string
  expiresIn: number
}

interface User {
  // Здесь можно указать поля для пользователя, в зависимости от вашего API
  id: string
  username: string
  email: string
}

interface AuthState {
  tokenInfo: TokenInfo | null
  user: User | null
}

const initialState: AuthState = {
  tokenInfo: JSON.parse(localStorage.getItem("tokenInfo") || "null"),
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenInfo(state, action: PayloadAction<TokenInfo | null>) {
      state.tokenInfo = action.payload
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
  },
})

// Thunk для проверки токена и получения пользователя
export function checkTokenAndGetUser() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const authState = getState().auth
    if (authState.tokenInfo && authState.tokenInfo.expiresIn > new Date().getTime()) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + authState.tokenInfo.accessToken
      try {
        const response = await axios.post("https://frost.runtime.kz/api/auth/user")
        dispatch(setUser(response.data))
      } catch (error) {
        console.error("Error fetching user", error)
      }
    }
  }
}

// Thunk для авторизации
export function signIn(username: string, password: string) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post("https://frost.runtime.kz/api/auth/token", { username, password })
      const tokenInfo: TokenInfo = {
        accessToken: response.data.access_token,
        expiresIn: new Date().getTime() + response.data.expires_in * 1000,
      }
      dispatch(setTokenInfo(tokenInfo))
      localStorage.setItem("tokenInfo", JSON.stringify(tokenInfo))
      dispatch(checkTokenAndGetUser())
    } catch (error) {
      console.error("Error signing in", error)
    }
  }
}

// Thunk для выхода из системы
export function signOut() {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("tokenInfo")
    dispatch(setUser(null))
    dispatch(setTokenInfo(null))
  }
}

export const { setTokenInfo, setUser } = authSlice.actions

export const authReducer = authSlice.reducer
