import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import Itinerary from "./Itinerary";

vi.mock("marked", () => ({
  marked: {
    parse: (md: string) =>
      Promise.resolve(
        md ? md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>') : "",
      ),
  },
}));

vi.mock("../data/trips", async () => {
  const data = await import("../data/trips.mock");
  return { trips: data.mockTrips };
});

let mockSlug: string | undefined = "test-trip-future";
const mockNavigate = vi.fn();

vi.mock("react-router", async () => ({
  ...(await vi.importActual("react-router")),
  useParams: () => ({ slug: mockSlug }),
  useNavigate: () => mockNavigate,
}));

describe("Itinerary", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    document.title = "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows loading state initially when slug is valid", () => {
    mockSlug = "test-trip-future";
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  text: () => Promise.resolve("# Porto"),
                } as Response),
              10,
            );
          }),
      ),
    );

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("navigates to home when slug is invalid", async () => {
    mockSlug = "nonexistent";

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("renders back to home link when trip exists and content loads", async () => {
    mockSlug = "test-trip-future";
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve("# Porto"),
        }),
      ),
    );

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /back to home/i }),
      ).toBeInTheDocument();
    });
  });

  it("sets document title when trip is loaded", async () => {
    mockSlug = "test-trip-future";
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve("# Future Trip"),
        }),
      ),
    );

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(document.title).toBe("Future Trip - Travel Itineraries");
    });
  });

  it("shows error message when fetch fails", async () => {
    mockSlug = "test-trip-future";
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("Network error"))),
    );

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading itinerary/i)).toBeInTheDocument();
    });
  });

  it("shows error message when fetch returns not ok (e.g. 404)", async () => {
    mockSlug = "test-trip-future";
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false })),
    );

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading itinerary/i)).toBeInTheDocument();
    });
  });

  describe("links in itinerary content", () => {
    // Stops jsdom attempting (unimplemented) navigation for clicks we don't intercept
    const blockNavigation = (e: MouseEvent) => e.preventDefault();

    beforeEach(() => {
      document.addEventListener("click", blockNavigation);
    });

    afterEach(() => {
      document.removeEventListener("click", blockNavigation);
    });

    async function renderWithMarkdown(markdown: string, linkName: RegExp) {
      mockSlug = "test-trip-future";
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            text: () => Promise.resolve(markdown),
          }),
        ),
      );

      render(
        <MemoryRouter>
          <Itinerary />
        </MemoryRouter>,
      );

      return screen.findByRole("link", { name: linkName });
    }

    it("opens external links in a new tab", async () => {
      const link = await renderWithMarkdown(
        "[External site](https://example.com)",
        /external site/i,
      );

      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");

      fireEvent.click(link);
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("routes same-site links through the router", async () => {
      const link = await renderWithMarkdown(
        "[Other trip](/other-page?x=1#day-2)",
        /other trip/i,
      );

      expect(link).not.toHaveAttribute("target");

      fireEvent.click(link);
      expect(mockNavigate).toHaveBeenCalledWith("/other-page?x=1#day-2");
    });

    it("leaves modifier clicks on same-site links to the browser", async () => {
      const link = await renderWithMarkdown(
        "[Other trip](/other-page)",
        /other trip/i,
      );

      fireEvent.click(link, { ctrlKey: true });
      fireEvent.click(link, { metaKey: true });
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("leaves in-page anchor links to the browser", async () => {
      const link = await renderWithMarkdown(
        "[Jump to section](#section)",
        /jump to section/i,
      );

      expect(link).not.toHaveAttribute("target");

      fireEvent.click(link);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
