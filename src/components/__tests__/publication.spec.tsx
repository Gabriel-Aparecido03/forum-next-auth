import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Publication } from "../publication";

describe("<Publication />", () => {
  it("should be show correct infos of publication", () => {
    const { getByText,getByTestId } = render(
      <Publication
        createdAt={new Date()}
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
    const isShouldBeShowCorrectDescription = getByText("lorem-description")
    const isShouldBeShowCorrectTitle = getByText("lorem-title")
    const isShouldBeShowCorrectUsername = getByText("lorem-username")
    const isLinkCorrectToThePublicationPage = getByTestId("publication-link-test")

    expect(isShouldBeShowDateFormat).toBeTruthy();
    expect(isShouldBeShowCorrectDescription).toBeTruthy();
    expect(isShouldBeShowCorrectTitle).toBeTruthy();
    expect(isShouldBeShowCorrectUsername).toBeTruthy();
    expect(isLinkCorrectToThePublicationPage).toBeTruthy();
  });
});
