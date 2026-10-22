import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import Maps from "./Maps";
import { mockMapGroups } from "../data/maps.mock";

vi.mock("../data/maps", async () => {
  const data = await import("../data/maps.mock");
  return { mapGroups: data.mockMapGroups };
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
      screen.getByRole("heading", { level: 1, name: /trip maps/i }),
    ).toBeInTheDocument();
  });

  it("renders a back to home link", () => {
    renderMaps();
    const backLink = screen.getByRole("link", { name: /back to home/i });
    expect(backLink).toHaveAttribute("href", "/");
    expect(backLink).toHaveClass("back-button");
  });

  it("renders a heading for each group in data order", () => {
    renderMaps();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((h) => h.textContent)).toEqual(
      mockMapGroups.map((g) => g.heading),
    );
  });

  it("renders each group's maps with a URL as pill links under its heading", () => {
    renderMaps();
    mockMapGroups.forEach((group) => {
      const section = screen
        .getByRole("heading", { level: 2, name: group.heading })
        .closest("section")!;
      const mapsWithUrl = group.maps.filter((m) => m.url);
      expect(within(section).getAllByRole("link")).toHaveLength(
        mapsWithUrl.length,
      );
      mapsWithUrl.forEach((map) => {
        const link = within(section).getByRole("link", { name: map.title });
        expect(link).toHaveAttribute("href", map.url);
        expect(link).toHaveClass("maps-link", "maps-link--solid");
      });
    });
  });

  it("renders maps without a URL as non-clickable 'coming soon' pills", () => {
    renderMaps();
    const pill = screen.getByText("Future Place");
    expect(pill.tagName).toBe("SPAN");
    expect(pill).toHaveClass("maps-link--soon");
    expect(pill).toHaveTextContent(/^\s*Future Place$/);
    expect(pill.closest("a")).toBeNull();
    expect(
      screen.queryByRole("link", { name: /future place/i }),
    ).not.toBeInTheDocument();
  });

  it("opens map links in a new tab", () => {
    renderMaps();
    mockMapGroups
      .flatMap((g) => g.maps)
      .filter((m) => m.url)
      .forEach((map) => {
        const link = screen.getByRole("link", { name: map.title });
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
