// Trip configuration - add new trips here
// The slug is used for the URL path and to locate the markdown file
// Markdown files should be placed in /public/itineraries/{slug}.md

export interface Trip {
  slug: string;
  title: string;
  year: number;
  startDate?: string; // ISO format: "YYYY-MM-DD"
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
    startDate: "2027-01-07",
    tags: ["Oceania", "Gold plated pension", "33 days"],
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
    accentColor: "#114bc9",
  },
  {
    slug: "istanbul",
    title: "Istanbul by train",
    year: 2027,
    startDate: "2027-08-28",
    tags: ["Europe", "Gold plated pension", "37 days"],
    description: "Paris · Strasbourg · Munich + more",
    accentColor: "#043f0e",
  },
  {
    slug: "andalucia",
    title: "Andalucía road trip",
    year: 2027,
    startDate: "2027-09-11",
    tags: ["Self-drive", "Princess Kimberley", "16 days"],
    description: "Granada · Córdoba · Seville + more",
    accentColor: "#7a24a1",
  },
];
