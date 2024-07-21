import { describe, expect, it, vi } from "vitest";
import { HeaderProfile } from "../header-profile";
import { renderWithProviders } from "./mock-store/redux-mock-store";

describe("<HeaderProfile />", () => {
  vi.mock("next/navigation");

  it("should be show the correct infos about logged user", () => {
    const { getByText } = renderWithProviders(
      <HeaderProfile />
    );
    const textAccount = getByText("Account");

    expect(textAccount).toBeTruthy();
  });

  it("should be show the correct infos about non logged user", () => {
    const { getByTestId, debug } = renderWithProviders(<HeaderProfile />, {
      preloadedState: { user: { id: "", email: "" } },
    });
    debug();
    const iconOfOpenToMenuWithoutAccount = getByTestId(
      "open-dialog-without-logged"
    );
    expect(iconOfOpenToMenuWithoutAccount).toBeTruthy();
  });
});
