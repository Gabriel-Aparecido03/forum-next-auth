import { describe, expect, it, vitest } from "vitest";
import { Publication } from "../publication";
import { renderWithProviders } from "./mock-store/redux-mock-store";

describe("<Publication />", () => {

  vitest.mock('next/navigation')

  it("should be show correct infos of publication", () => {
    const { getByText, getByTestId } = renderWithProviders(
      <Publication
        createdAt={new Date(2024,0,1)}
        description="lorem-description"
        id="id-publication"
        profileId="0"
        title="lorem-title"
        updatedAt={null}
        username="lorem-username"
      />
    );

    const isShouldBeShowDateFormat = getByText("January 1, 2024", {
      exact: false,
    });
    const isShouldBeShowCorrectDescription = getByText("lorem-description");
    const isShouldBeShowCorrectTitle = getByText("lorem-title");
    const isShouldBeShowCorrectUsername = getByText("lorem-username");
    const isLinkCorrectToThePublicationPage = getByTestId(
      "publication-link-test"
    );

    expect(isShouldBeShowDateFormat).toBeTruthy();
    expect(isShouldBeShowCorrectDescription).toBeTruthy();
    expect(isShouldBeShowCorrectTitle).toBeTruthy();
    expect(isShouldBeShowCorrectUsername).toBeTruthy();
    expect(isLinkCorrectToThePublicationPage).toBeTruthy();
  });
});
