import { trips } from "./trips";

describe("trips data", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(trips)).toBe(true);
    expect(trips.length).toBeGreaterThan(0);
  });

  it("each trip has slug, title, and year", () => {
    trips.forEach((trip) => {
      expect(trip).toHaveProperty("slug");
      expect(trip).toHaveProperty("title");
      expect(trip).toHaveProperty("year");
      expect(typeof trip.slug).toBe("string");
      expect(typeof trip.title).toBe("string");
      expect(typeof trip.year).toBe("number");
    });
  });

  it("slugs are unique", () => {
    const slugs = trips.map((t) => t.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("slugs are URL-friendly (lowercase, no spaces)", () => {
    trips.forEach((trip) => {
      expect(trip.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
