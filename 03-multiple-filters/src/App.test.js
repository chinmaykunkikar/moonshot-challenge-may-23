/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable jest/no-identical-title */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import Solution from "./components/Solution";
import { items } from "./components/items";

describe("Solution", () => {
  it("Component renders and displays the header text correctly", () => {
    render(<Solution />);
    expect(screen.getByText("MoonshotX Filters")).toBeInTheDocument();
  });
});

describe("Solution", () => {
  test("renders all the buttons correctly", () => {
    render(<Solution />);
    const bagsBtn = screen.getByTestId("Bags-button");
    const watchesBtn = screen.getByTestId("Watches-button");
    const sportsBtn = screen.getByTestId("Sports-button");
    const sunglassesBtn = screen.getByTestId("Sunglasses-button");

    expect(bagsBtn).toHaveTextContent("Bags");
    expect(watchesBtn).toHaveTextContent("Watches");
    expect(sportsBtn).toHaveTextContent("Sports");
    expect(sunglassesBtn).toHaveTextContent("Sunglasses");
  });
});

describe("Solution", () => {
  test("Clicking on button filters adds the class of active", () => {
    const { getByTestId } = render(<Solution />);
    const filterButton = getByTestId("Bags-button");
    fireEvent.click(filterButton);
    expect(filterButton).toHaveClass("active");
  });
});

describe("Solution", () => {
  test("Clicking on a filter button twice removes the active class", () => {
    const { getByTestId } = render(<Solution />);
    const filterButton = getByTestId("Bags-button");
    fireEvent.click(filterButton);
    fireEvent.click(filterButton);
    expect(filterButton).not.toHaveClass("active");
  });
});

describe("Solution", () => {
  test("Multiple filters are selected and they render the correct products", () => {
    const { getByTestId, getByText } = render(<Solution />);
    const bagFilterButton = getByTestId("Bags-button");
    const watchFilterButton = getByTestId("Watches-button");
    fireEvent.click(bagFilterButton);

    expect(getByText("Prada")).toBeInTheDocument();
    expect(getByText("Gucci")).toBeInTheDocument();
    expect(getByText("Guess")).toBeInTheDocument();

    fireEvent.click(watchFilterButton);

    expect(getByText("Rolex")).toBeInTheDocument();
    expect(getByText("Timex")).toBeInTheDocument();
  });
});

describe("Solution", () => {
  test("If no filters are selected, all the products are displayed", () => {
    const { getByText } = render(<Solution />);
    items.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
    });
  });
});

describe("Solution", () => {
  test("Component handles multiple active filters correctly", () => {
    const { getByTestId, getByText, queryByText } = render(<Solution />);
    const bagFilterButton = getByTestId("Bags-button");
    const watchFilterButton = getByTestId("Watches-button");
    const sportsFilterButton = getByTestId("Sports-button");
    fireEvent.click(bagFilterButton);
    fireEvent.click(watchFilterButton);
    fireEvent.click(sportsFilterButton);

    const polaroid = queryByText("Polaroid");
    const Aldo = queryByText("Aldo");
    const RayBan = queryByText("Ray Ban");

    expect(polaroid).not.toBeInTheDocument();
    expect(Aldo).not.toBeInTheDocument();
    expect(RayBan).not.toBeInTheDocument();
  });
});
