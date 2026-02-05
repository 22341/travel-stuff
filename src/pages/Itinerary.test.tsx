import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Itinerary from "./Itinerary";

jest.mock("marked", () => ({
  marked: {
    parse: (md: string) =>
      Promise.resolve(
        md
          ? md.replace(
              /\[([^\]]+)\]\(([^)]+)\)/g,
              '<a href="$2">$1</a>',
            )
          : "",
      ),
  },
}));

let mockSlug: string | undefined = "porto";
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ slug: mockSlug }),
  useNavigate: () => mockNavigate,
}));

describe("Itinerary", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    mockNavigate.mockClear();
    global.fetch = originalFetch;
    document.title = "";
  });

  it("shows loading state initially when slug is valid", () => {
    mockSlug = "porto";
    global.fetch = jest.fn(() =>
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
    ) as jest.Mock;

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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# Porto"),
      }),
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /back to home/i })).toBeInTheDocument();
    });
  });

  it("sets document title when trip is loaded", async () => {
    mockSlug = "porto";
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# Porto"),
      }),
    ) as jest.Mock;

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
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error")),
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error loading itinerary/i),
      ).toBeInTheDocument();
    });
  });

  it("shows error message when fetch returns not ok (e.g. 404)", async () => {
    mockSlug = "porto";
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false }),
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <Itinerary />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/error loading itinerary/i),
      ).toBeInTheDocument();
    });
  });

  describe("external link click handler", () => {
    let mockOpen: jest.Mock;
    const originalOpen = window.open;

    beforeEach(() => {
      mockOpen = jest.fn();
      window.open = mockOpen;
    });

    afterEach(() => {
      window.open = originalOpen;
    });

    it("opens external links in new tab and prevents default", async () => {
      mockSlug = "porto";
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () =>
            Promise.resolve(
              '# Porto\n\n[External site](https://example.com)',
            ),
        }),
      ) as jest.Mock;

      render(
        <MemoryRouter>
          <Itinerary />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByRole("link", { name: /external site/i })).toBeInTheDocument();
      });

      const externalLink = screen.getByRole("link", { name: /external site/i });
      fireEvent.click(externalLink);

      expect(mockOpen).toHaveBeenCalledWith(
        expect.stringContaining("example.com"),
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("does not open internal links in new tab", async () => {
      mockSlug = "porto";
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () =>
            Promise.resolve(
              '# Porto\n\n[Internal](/other-page)',
            ),
        }),
      ) as jest.Mock;

      render(
        <MemoryRouter>
          <Itinerary />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByRole("link", { name: /internal/i })).toBeInTheDocument();
      });

      const internalLink = screen.getByRole("link", { name: /internal/i });
      fireEvent.click(internalLink);

      expect(mockOpen).not.toHaveBeenCalled();
    });

    it("does not open anchor links in new tab", async () => {
      mockSlug = "porto";
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          text: () =>
            Promise.resolve(
              '# Porto\n\n[Jump to section](#section)',
            ),
        }),
      ) as jest.Mock;

      render(
        <MemoryRouter>
          <Itinerary />
        </MemoryRouter>,
      );

      await waitFor(() => {
        expect(screen.getByRole("link", { name: /jump to section/i })).toBeInTheDocument();
      });

      const anchorLink = screen.getByRole("link", { name: /jump to section/i });
      fireEvent.click(anchorLink);

      expect(mockOpen).not.toHaveBeenCalled();
    });
  });
});
