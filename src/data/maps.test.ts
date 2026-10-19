import { mapGroups } from "./maps";

describe("maps data", () => {
  it("exports a non-empty array of groups", () => {
    expect(Array.isArray(mapGroups)).toBe(true);
    expect(mapGroups.length).toBeGreaterThan(0);
  });

  it("each group has a heading and at least one map", () => {
    mapGroups.forEach((group) => {
      expect(typeof group.heading).toBe("string");
      expect(group.heading.length).toBeGreaterThan(0);
      expect(group.maps.length).toBeGreaterThan(0);
    });
  });

  it("group headings are unique", () => {
    const headings = mapGroups.map((g) => g.heading);
    expect(new Set(headings).size).toBe(headings.length);
  });

  it("each map has a title and a Google Maps URL", () => {
    mapGroups.forEach((group) => {
      group.maps.forEach((map) => {
        expect(typeof map.title).toBe("string");
        expect(map.title.length).toBeGreaterThan(0);
        expect(map.url).toMatch(/^https:\/\/www\.google\.com\/maps\//);
      });
    });
  });

  it("map titles are unique within each group", () => {
    mapGroups.forEach((group) => {
      const titles = group.maps.map((m) => m.title);
      expect(new Set(titles).size).toBe(titles.length);
    });
  });
});
