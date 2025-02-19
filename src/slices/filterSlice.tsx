import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

// Типизация для фильтра
interface FilterState {
  brand: { id: number; name: string }[]
  model: { id: number; name: string }[]
  generation: { id: number; name: string }[]
  available: number
  selectedBrand: number
  selectedModel: number
  selectedGeneration: number
  isChecked: boolean
  totalPages: number
  currentPage: number
}

const initialState: FilterState = {
  brand: [],
  model: [],
  generation: [],
  available: 0,
  selectedBrand: 0,
  selectedModel: 0,
  selectedGeneration: 0,
  isChecked: false,
  totalPages: 0,
  currentPage: 1,
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBrand(state, action: PayloadAction<{ id: number; name: string }[]>) {
      state.brand = action.payload
    },
    setModel(state, action: PayloadAction<{ id: number; name: string }[]>) {
      state.model = action.payload
    },
    setGeneration(state, action: PayloadAction<{ id: number; name: string }[]>) {
      state.generation = action.payload
    },
    setAvailable(state, action: PayloadAction<number>) {
      state.available = action.payload
    },
    setSelectedBrand(state, action: PayloadAction<number>) {
      state.selectedBrand = action.payload
    },
    setSelectedModel(state, action: PayloadAction<number>) {
      state.selectedModel = action.payload
    },
    setSelectedGeneration(state, action: PayloadAction<number>) {
      state.selectedGeneration = action.payload
    },
    setIsChecked(state, action: PayloadAction<boolean>) {
      state.isChecked = action.payload
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
})

// Функции с асинхронными запросами
export function fetchBrands() {
  return async function (dispatch: any) {
    try {
      const response = await axios.get("https://frost.runtime.kz/api/brands")
      const brands = response.data.map((brand: { name: string; id: number }) => ({
        name: brand.name,
        id: brand.id,
      }))
      dispatch(setBrand(brands))
    } catch (error) {
      console.error(error)
    }
  }
}

export function changeBrand(brandId: number) {
  return async function (dispatch: any) {
    if (brandId > 0) {
      dispatch(setSelectedBrand(brandId))
      try {
        const response = await axios.get(`https://frost.runtime.kz/api/models?brandId=${brandId}`)
        const models = response.data.map((model: { name: string; id: number }) => ({
          name: model.name,
          id: model.id,
        }))
        dispatch(setModel(models))
      } catch (error) {
        console.error(error)
      }
    } else {
      dispatch(setSelectedBrand(0))
    }
    dispatch(setSelectedModel(0))
    dispatch(setSelectedGeneration(0))
  }
}

export function changeModel(modelId: number) {
  return async function (dispatch: any) {
    if (modelId > 0) {
      dispatch(setSelectedModel(modelId))
      try {
        const response = await axios.get(`https://frost.runtime.kz/api/generations?modelId=${modelId}`)
        const generations = response.data.map((generation: { name: string; id: number }) => ({
          name: generation.name,
          id: generation.id,
        }))
        dispatch(setGeneration(generations))
      } catch (error) {
        console.error(error)
      }
    } else {
      dispatch(setSelectedModel(0))
    }
    dispatch(setSelectedGeneration(0))
  }
}

export function changeGeneration(generationId: number) {
  return function (dispatch: any) {
    if (generationId > 0) {
      dispatch(setSelectedGeneration(generationId))
    }
  }
}

export const {
  setBrand,
  setModel,
  setGeneration,
  setAvailable,
  setSelectedBrand,
  setSelectedModel,
  setSelectedGeneration,
  setIsChecked,
  setTotalPages,
  setCurrentPage,
} = filterSlice.actions

export const filterReducer = filterSlice.reducer
