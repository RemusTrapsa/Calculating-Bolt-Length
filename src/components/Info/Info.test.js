import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Info from "./Info";

describe("Info Component", () => {
  const props = {
    diameter: "3/4",
    thickness1: "1.5",
    thickness2: "0.75",
    id: "2b926f1b-db1f-45ac-af87-2130da1e1a2f",
    date: "10/25/2019",
    length: "3.50",
    deleteCard: jest.fn()
  };

  beforeEach(() => {
    props.deleteCard.mockClear();
    render(<Info {...props} />);
  });

  it("renders with props", () => {
    expect(screen.getByText("Bolt length: 3.50 inches")).toBeInTheDocument();
    expect(screen.getByText("Diameter : 3/4 inches")).toBeInTheDocument();
    expect(screen.getByText("Thickness of part 1 : 1.5 inches")).toBeInTheDocument();
    expect(screen.getByText("Thickness of part 2: 0.75 inches")).toBeInTheDocument();
    expect(screen.getByText("Date: 10/25/2019")).toBeInTheDocument();
  });

  it("should delete the card", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(props.deleteCard).toHaveBeenCalledWith(props.id);
  });
});
