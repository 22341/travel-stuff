import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "./App";

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

vi.mock("./data/trips", async () => {
  const data = await import("./data/trips.mock");
  return { trips: data.mockTrips };
});

function renderWithRouter(initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders Home at /", () => {
    renderWithRouter(["/"]);
    expect(
      screen.getByRole("heading", { name: /travel itineraries/i }),
    ).toBeInTheDocument();
  });

  it("renders Itinerary at /:slug", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          text: () => Promise.resolve("# Porto"),
        }),
      ),
    );

    renderWithRouter(["/test-trip-future"]);

    expect(
      await screen.findByRole("link", { name: /back to home/i }),
    ).toBeInTheDocument();
  });
});
