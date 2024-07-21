import { describe, expect, it, vi } from "vitest";
import { ProfileTag } from "../profile-tag";
import { renderWithProviders } from "./mock-store/redux-mock-store";

describe("<ProfileTag />", () => {
  vi.mock("next/navigation");

  it("should be show username and correct profile link ", () => {
    const { getByRole, getByText } = renderWithProviders(
      <ProfileTag username="username" />
    );

    const isShowUsernameText = getByText("username");
    const isShowCorrectUsernameLink = getByRole("link").getAttribute("href");

    expect(isShowUsernameText).toBeTruthy();
    expect(isShowCorrectUsernameLink).toBe("/app/profile/username");
  });
});
