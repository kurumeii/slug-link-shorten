export type ToggleModal = ({
  modalType,
  state,
}: {
  modalType: "delete" | "edit"
  state?: boolean | undefined
}) => void
