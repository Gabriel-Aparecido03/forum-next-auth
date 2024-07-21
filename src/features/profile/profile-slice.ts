import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileState = {
  id: string | null;
  username: string | null;
  userId: string | null;
  description: string | null;
  activedAt: Date | null;
};

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    id: "",
    username: "",
    userId: "",
    description: "",
    activedAt: new Date(),
  },
  reducers: {
    updateProfileInfos(state : ProfileState, action: PayloadAction<ProfileState>) {
      const { activedAt, username, id, userId, description } = action.payload;
      state.activedAt = activedAt;
      state.description = description;
      state.userId = userId;
      state.id = id;
      state.username = username;
    },
  },
});

export const { updateProfileInfos } = profileSlice.actions;
export default profileSlice.reducer;
