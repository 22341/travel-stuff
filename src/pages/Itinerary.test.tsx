import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
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

vi.mock("dompurify", () => ({
  default: {
    sanitize: (html: string) => html,
  },
}));

let mockSlug: string | undefined = "porto";
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
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
    mockSlug = "porto";
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
    mockSlug = "porto";
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
    mockSlug = "porto";
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
      expect(document.title).toBe("Porto by Train - Travel Itineraries");
    });
  });

  it("shows error message when fetch fails", async () => {
    mockSlug = "porto";
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
    mockSlug = "porto";
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

  describe("external link click handler", () => {
    beforeEach(() => {
      vi.stubGlobal("open", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("opens external links in new tab and prevents default", async () => {
      mockSlug = "porto";
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            text: () =>
              Promise.resolve(
                "# Porto\n\n[External site](https://example.com)",
              ),
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
          screen.getByRole("link", { name: /external site/i }),
        ).toBeInTheDocument();
      });

      const externalLink = screen.getByRole("link", { name: /external site/i });
      fireEvent.click(externalLink);

      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining("example.com"),
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("does not open internal links in new tab", async () => {
      mockSlug = "porto";
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            text: () => Promise.resolve("# Porto\n\n[Internal](/other-page)"),
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
          screen.getByRole("link", { name: /internal/i }),
        ).toBeInTheDocument();
      });

      const internalLink = screen.getByRole("link", { name: /internal/i });
      fireEvent.click(internalLink);

      expect(window.open).not.toHaveBeenCalled();
    });

    it("does not open anchor links in new tab", async () => {
      mockSlug = "porto";
      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            ok: true,
            text: () =>
              Promise.resolve("# Porto\n\n[Jump to section](#section)"),
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
          screen.getByRole("link", { name: /jump to section/i }),
        ).toBeInTheDocument();
      });

      const anchorLink = screen.getByRole("link", { name: /jump to section/i });
      fireEvent.click(anchorLink);

      expect(window.open).not.toHaveBeenCalled();
    });
  });
});
