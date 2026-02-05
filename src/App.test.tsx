import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

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

function renderWithRouter(initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe("App", () => {
  it("renders Home at /", () => {
    renderWithRouter(["/"]);
    expect(
      screen.getByRole("heading", { name: /travel itineraries/i }),
    ).toBeInTheDocument();
  });

  it("renders Itinerary at /:slug", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("# Porto"),
      }),
    ) as jest.Mock;

    renderWithRouter(["/porto"]);

    expect(
      await screen.findByRole("link", { name: /back to home/i }),
    ).toBeInTheDocument();
  });
});
