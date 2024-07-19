import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfileViewState = {
  id: string | null;
  username: string | null;
  userId: string | null;
  description: string | null;
  activedAt: Date | null;
};

const profileViewSlice = createSlice({
  name: "profile-view",
  initialState: {
    id: null,
    username: null,
    userId: null,
    description: null,
    activedAt: null,
  },
  reducers: {
    updateProfileViewInfos(state : ProfileViewState, action: PayloadAction<ProfileViewState>) {
      const { activedAt, username, id, userId, description } = action.payload;
      state.activedAt = activedAt;
      state.description = description;
      state.userId = userId;
      state.id = id;
      state.username = username;
    },
  },
});

export const { updateProfileViewInfos } = profileViewSlice.actions;
export default profileViewSlice.reducer;
