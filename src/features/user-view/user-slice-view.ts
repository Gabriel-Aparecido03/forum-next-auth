import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateViewType = {
  email: string | null;
  id: string | null;
};

const userViewSlice = createSlice({
  name: "user-vew",
  initialState: {
    id: "",
    email: "",
  },
  reducers: {
    updateUserViewInfos(state: StateViewType, action: PayloadAction<StateViewType>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state: StateViewType) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { updateUserViewInfos } = userViewSlice.actions;
export default userViewSlice.reducer;
