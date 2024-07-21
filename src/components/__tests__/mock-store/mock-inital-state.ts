import { RootState } from "@/store";

export const mockInitalData: RootState = {
  user: {
    id: "1",
    email: "user@example.com"
  },
  profile: {
    id: null,
    username: null,
    userId: null,
    description: null,
    activedAt: null
  },
  profileView: {
    id: null,
    username: null,
    userId: null,
    description: null,
    activedAt: null
  },
  userView: {
    id: "1",
    email: "user@example.com"
  },
  publicationView: {
    id: "pub-1",
    username: "user1",
    profileId: "profile-1",
    title: "Mock Title",
    description: "Mock Description",
    createdAt: new Date(),
    updatedAt: null,
    isEditing: false
  }
};