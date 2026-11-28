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

  it("each trip has a valid start date, tags, description and accent colour", () => {
    trips.forEach((trip) => {
      expect(trip.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(trip.startDate).getTime())).toBe(false);
      expect(trip.tags.length).toBeGreaterThan(0);
      expect(trip.description.trim()).not.toBe("");
      expect(trip.accentColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it("slugs are unique", () => {
    const slugs = trips.map((t) => t.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("slugs do not clash with other page routes", () => {
    trips.forEach((trip) => {
      expect(trip.slug).not.toBe("maps");
    });
  });

  it("slugs are URL-friendly (lowercase, no spaces)", () => {
    trips.forEach((trip) => {
      expect(trip.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });
});
