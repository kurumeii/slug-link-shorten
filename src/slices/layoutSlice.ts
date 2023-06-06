import { type PayloadAction, createSlice } from "@reduxjs/toolkit"

export type Layout = {
  mode: "Dashboard" | "List"
}

const initialState: Layout = {
  mode: "Dashboard",
}

const layoutSlice = createSlice({
  name: "Layout",
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<Layout>) => {
      state.mode = action.payload.mode
      localStorage.setItem("layout-mode", action.payload.mode)
    },
  },
})

export const { setLayout } = layoutSlice.actions
export default layoutSlice.reducer
