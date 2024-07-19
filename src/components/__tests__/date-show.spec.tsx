import dayjs from "@/lib/day-js";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DateShow } from "../date-show";

describe("<DateShow />", () => {
  it("should be show correct date format", () => {
    const { getByText } = render(<DateShow createdAt={new Date(2024, 0, 1)} />);

    const isShouldBeShowDateFormat = getByText("January 1, 2024",{ exact : false});

    expect(isShouldBeShowDateFormat).toBeTruthy();
  });

  it("should be show correct date from noew", () => {
    const { getByText } = render(<DateShow createdAt={new Date(2024, 0, 1)} />);
    const fromNow = dayjs(new Date(2024, 0, 1)).fromNow();

    const isShouldBeShowFromNow = getByText(fromNow,{ exact : false});

    expect(isShouldBeShowFromNow).toBeTruthy();
  });
});
