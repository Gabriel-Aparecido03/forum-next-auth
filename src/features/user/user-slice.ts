import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  email: string | null;
  id: string | null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
  },
  reducers: {
    updateUserInfos(state: StateType, action: PayloadAction<StateType>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state: StateType) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { updateUserInfos } = userSlice.actions;
export default userSlice.reducer;
