import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home", () => {
  it("renders main heading and subtitle", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /travel itineraries/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/choose a destination to view the full itinerary/i),
    ).toBeInTheDocument();
  });

  it("groups trips by year and shows year headings", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "2026" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2027" })).toBeInTheDocument();
  });

  it("renders a link for each trip", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /estonia/i })).toHaveAttribute(
      "href",
      "/estonia",
    );
    expect(screen.getByRole("link", { name: /porto by train/i })).toHaveAttribute(
      "href",
      "/porto",
    );
    expect(screen.getByRole("link", { name: /southeast asia/i })).toHaveAttribute(
      "href",
      "/asia",
    );
  });
});
