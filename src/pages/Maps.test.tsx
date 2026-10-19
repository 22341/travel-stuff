import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Maps from "./Maps";
import { mockMaps } from "../data/maps.mock";

vi.mock("../data/maps", async () => {
  const data = await import("../data/maps.mock");
  return { tripMaps: data.mockMaps };
});

function renderMaps() {
  return render(
    <MemoryRouter>
      <Maps />
    </MemoryRouter>,
  );
}

describe("Maps", () => {
  beforeEach(() => {
    document.title = "";
  });

  it("renders the Trip Maps heading", () => {
    renderMaps();
    expect(
      screen.getByRole("heading", { name: /trip maps/i }),
    ).toBeInTheDocument();
  });

  it("renders a back to home link", () => {
    renderMaps();
    const backLink = screen.getByRole("link", { name: /back to home/i });
    expect(backLink).toHaveAttribute("href", "/");
    expect(backLink).toHaveClass("back-button");
  });

  it("renders a link for each map that opens in a new tab", () => {
    renderMaps();
    mockMaps.forEach((map) => {
      const link = screen.getByRole("link", { name: map.title });
      expect(link).toHaveAttribute("href", map.url);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("sets and restores the document title", () => {
    const { unmount } = renderMaps();
    expect(document.title).toBe("Trip Maps - Travel Itineraries");
    unmount();
    expect(document.title).toBe("Travel Itineraries");
  });
});
