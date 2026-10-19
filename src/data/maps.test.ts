import { tripMaps } from "./maps";

describe("maps data", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(tripMaps)).toBe(true);
    expect(tripMaps.length).toBeGreaterThan(0);
  });

  it("each map has a title and a Google Maps URL", () => {
    tripMaps.forEach((map) => {
      expect(typeof map.title).toBe("string");
      expect(map.title.length).toBeGreaterThan(0);
      expect(map.url).toMatch(/^https:\/\/www\.google\.com\/maps\//);
    });
  });

  it("titles are unique", () => {
    const titles = tripMaps.map((m) => m.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
