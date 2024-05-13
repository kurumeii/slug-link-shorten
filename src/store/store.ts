import { configureStore } from "@reduxjs/toolkit"
import { dashboardSlice } from "~/slices/dashboard"

export const store = configureStore({
  reducer: {
    [dashboardSlice.name]: dashboardSlice.reducer,
  },
})

export type RootState = ReturnType<(typeof store)["getState"]>
export type AppDispatch = (typeof store)["dispatch"]
