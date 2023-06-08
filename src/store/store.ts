import { configureStore } from "@reduxjs/toolkit"
import slugReducer from "~/slices/slugSlice"
export const store = configureStore({
  reducer: {
    slugs: slugReducer,
  },
})

export type RootState = ReturnType<(typeof store)["getState"]>
export type AppDispatch = (typeof store)["dispatch"]
