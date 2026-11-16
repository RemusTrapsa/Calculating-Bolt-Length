import React from "react";
import { render } from "@testing-library/react";
import Bar from "./Bar";

jest.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="line-chart" />
}));

describe("Bar component", () => {
  it("renders the chart", () => {
    const { getByTestId } = render(
      <Bar labelData={["27/10/2019"]} bmiData={["2.50"]} />
    );
    expect(getByTestId("line-chart")).toBeInTheDocument();
  });
});
