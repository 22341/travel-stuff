import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Home from "./Home";

// Keep your top-level import so the data is available in your test blocks
import { mockTrips } from "../data/trips.mock";

// Make the mock async and use a dynamic import inside the factory
vi.mock("../data/trips", async () => {
  const data = await import("../data/trips.mock");
  return {
    trips: data.mockTrips,
  };
});

describe("Home", () => {
  it("renders main heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /travel itineraries/i }),
    ).toBeInTheDocument();
  });

  it("groups trips by year and shows year headings", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "2099" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "2020" })).toBeInTheDocument();
  });

  it("renders a link for each trip with correct href", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    mockTrips.forEach((trip) => {
      expect(
        screen.getByRole("link", { name: new RegExp(trip.title, "i") }),
      ).toHaveAttribute("href", `/${trip.slug}`);
    });
  });

  it("renders trip tags as chips", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText("Rail")).toBeInTheDocument();
    expect(screen.getAllByText("Test").length).toBeGreaterThan(0);
  });

  it("renders trip descriptions", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    mockTrips.forEach((trip) => {
      if (trip.description) {
        expect(screen.getByText(trip.description)).toBeInTheDocument();
      }
    });
  });

  describe("daysUntil countdown display", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("shows countdown when trip start date is in the future", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-05-22")); // 10 days before future trip

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      expect(screen.getByText("10")).toBeInTheDocument();
      expect(screen.getByText("days away")).toBeInTheDocument();
    });

    it("shows '1 day away' (singular) when trip is tomorrow", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-05-31")); // 1 day before future trip

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("day away")).toBeInTheDocument();
    });

    it("does not show countdown when trip start date is today", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-06-01")); // same day as future trip

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      expect(screen.queryByText("0")).not.toBeInTheDocument();
      expect(screen.queryByText("days away")).not.toBeInTheDocument();
    });

    it("does not show countdown for a past trip", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-06-01")); // past trip is in 2020

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      // Only the future trip countdown would show, past trip has none
      const pastTripLink = screen.getByRole("link", { name: /past trip/i });
      expect(pastTripLink.querySelector(".trip-row__countdown")).toBeNull();
    });

    it("does not show countdown for a trip with no start date", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-05-22"));

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      const noDateLink = screen.getByRole("link", { name: /no date trip/i });
      expect(noDateLink.querySelector(".trip-row__countdown")).toBeNull();
    });

    it("never renders null or NaN as countdown text", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2099-05-22"));

      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      );

      expect(screen.queryByText("null")).not.toBeInTheDocument();
      expect(screen.queryByText("NaN")).not.toBeInTheDocument();
    });
  });
});
