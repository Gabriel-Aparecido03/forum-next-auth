import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PublicationViewState = {
  id: string | null;
  username: string | null;
  profileId: string | null;
  description: string | null;
  title: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isEditing : boolean
};

type PayloadIsEditing = {
  isEditing : boolean
}

const publicationViewSlice = createSlice({
  name: "publication-view",
  initialState: {
    id: "",
    username: "",
    profileId: "",
    title : "",
    description: "",
    createdAt: new Date(),
    updatedAt: null,
    isEditing : false
  },
  reducers: {
    updatePublicationViewInfos(state : PublicationViewState, action: PayloadAction<PublicationViewState>) {
      const { createdAt, username, id, profileId, description ,title ,updatedAt } = action.payload;
      state.createdAt = createdAt;
      state.description = description;
      state.profileId = profileId;
      state.id = id;
      state.username = username;
      state.title = title
      state.updatedAt = updatedAt
      state.isEditing = false
    }
  },
});

export const { updatePublicationViewInfos } = publicationViewSlice.actions;
export default publicationViewSlice.reducer;
