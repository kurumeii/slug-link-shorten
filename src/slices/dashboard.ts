import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "~/hooks/useRedux"

type State = {
  modalStates: {
    edit: boolean
    delete: boolean
  }
}

const initialState: State = {
  modalStates: {
    edit: false,
    delete: false,
  },
}

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleModal: (
      state,
      action: PayloadAction<{
        name: keyof State["modalStates"]
        status: boolean
      }>
    ) => {
      state.modalStates[action.payload.name] = action.payload.status
    },
  },
})

export const useDashboardSelector = () =>
  useAppSelector((s) => s[dashboardSlice.name], shallowEqual)
