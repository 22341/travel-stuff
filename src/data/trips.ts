// Trip configuration - add new trips here
// The slug is used for the URL path and to locate the markdown file
// Markdown files should be placed in /public/itineraries/{slug}.md

export interface Trip {
  slug: string;
  title: string;
  year: number;
  startDate?: string; // ISO format: "YYYY-MM-DD"
  tentative?: boolean; // Dates not confirmed - shows start month instead of countdown
  tags?: string[];
  description?: string;
  accentColor?: string;
}

export const trips: Trip[] = [
  {
    slug: "slovenia",
    title: "Ljubljana",
    year: 2026,
    startDate: "2026-11-01",
    tags: ["City break", "Central Europe", "6 days"],
    description: "Old town, castle, Lake Bled, Postojna cave",
    accentColor: "#1D9E75",
  },
  {
    slug: "australia",
    title: "Colin in Australia",
    year: 2027,
    startDate: "2027-01-06",
    tags: ["Oceania", "Gold plated pension", "34 days"],
    description: "Great Southern rail trip, Tasmanian cruise",
    accentColor: "#fac003",
  },
  {
    slug: "asia",
    title: "Southeast Asia",
    year: 2027,
    startDate: "2027-02-06",
    tags: ["Career break", "9 countries", "77 days"],
    description: "Malaysia · Cambodia · Vietnam + more",
    accentColor: "#852f2f",
  },
  {
    slug: "paris-2027",
    title: "Colin in Paris",
    year: 2027,
    startDate: "2027-05-22",
    tags: ["City break", "Gold plated pension", "10 days"],
    description: "London · Paris · Brussels",
    accentColor: "#487cec",
  },
  {
    slug: "istanbul",
    title: "Istanbul by train",
    year: 2027,
    startDate: "2027-08-16",
    tags: ["Europe", "Gold plated pension", "45 days"],
    description: "Paris · Strasbourg · Lausanne + more",
    accentColor: "#043f0e",
  },
  {
    slug: "andalucia",
    title: "Andalucía road trip",
    year: 2027,
    startDate: "2027-09-11",
    tags: ["Self-drive", "Princess Kimberley", "15 days"],
    description: "Granada · Córdoba · Seville + more",
    accentColor: "#f54a4a",
  },
  {
    slug: "italy-rail-trip-2028",
    title: "Tour of Italy",
    year: 2028,
    startDate: "2028-06-10",
    tentative: true,
    tags: ["Rail journey", "North to South", "22 days"],
    description: "Bergamo · Verona · Bologna + more",
    accentColor: "#121ebb",
  },
];
