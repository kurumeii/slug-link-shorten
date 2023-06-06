import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type RouterOutputs } from "~/utils/api"

type State = {
  slugData: RouterOutputs["dashboard"]["getAll"]["links"]
}

const initialState: State = {
  slugData: [],
}

const slugSlice = createSlice({
  name: "Slugs",
  initialState,
  reducers: {
    setSlugData: (state, action: PayloadAction<State>) => {
      state.slugData = action.payload.slugData
    },
  },
})

export const { setSlugData } = slugSlice.actions
export default slugSlice.reducer
