import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type State = {
  searchSlug: string
}

const initialState: State = {
  searchSlug: "",
}

const slugSlice = createSlice({
  name: "Slugs",
  initialState,
  reducers: {
    setSearchSlug: (state, action: PayloadAction<State>) => {
      state.searchSlug = action.payload.searchSlug
    },
  },
})

export const { setSearchSlug } = slugSlice.actions
export default slugSlice.reducer
