import { configureStore } from "@reduxjs/toolkit";
import profileViewSlice from "./features/profile-view/profile-view-slice";
import profileSlice from "./features/profile/profile-slice";
import publicationSlice from "./features/publication/publication-slice";
import userSliceView from "./features/user-view/user-slice-view";
import userSlice from "./features/user/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    profileView: profileViewSlice,
    userView: userSliceView,
    publicationView: publicationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
