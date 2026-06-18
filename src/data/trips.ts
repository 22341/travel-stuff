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
    title: "Slovenia",
    year: 2026,
    startDate: "2026-11-01",
    tags: ["City break", "Central Europe", "6 days"],
    description: "Ljubljana",
    accentColor: "#1D9E75",
  },
  {
    slug: "australia",
    title: "Colin in Australia",
    year: 2027,
    startDate: "2027-01-07",
    tags: ["Oceania", "Gold plated pension", "33 days"],
    description: "Great Southern rail trip, Tasmanian cruise",
    accentColor: "#0415a7",
  },
  {
    slug: "asia",
    title: "Southeast Asia",
    year: 2027,
    startDate: "2027-02-06",
    tags: ["Career break", "9 countries", "77 days"],
    description: "Malaysia · Cambodia · Vietnam + more",
    accentColor: "#7F77DD",
  },
];
