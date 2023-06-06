import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "~/slices/layoutSlice"
import slugReducer from "~/slices/slugSlice"
export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    slugs: slugReducer,
  },
})

export type RootState = ReturnType<(typeof store)["getState"]>
export type AppDispatch = (typeof store)["dispatch"]
