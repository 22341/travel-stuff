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
    slug: "porto",
    title: "Porto by Train",
    year: 2026,
    startDate: "2026-05-29",
    tags: ["Rail", "Iberian Peninsula", "19 days"],
    description: "Paris · San Sebastián · Bilbao + more",
    accentColor: "#534AB7",
  },
  {
    slug: "slovenia",
    title: "Slovenia",
    year: 2026,
    startDate: "2026-11-01",
    tags: ["City break", "Central Europe", "5 days"],
    description: "Ljubljana",
    accentColor: "#1D9E75",
  },
  {
    slug: "australia",
    title: "Colin in Australia",
    year: 2027,
    startDate: "2027-01-15",
    tags: ["Oceania", "Gold plated pension", "33 days"],
    description: "Scenic rail trip, Tasmanian cruise",
    accentColor: "#D85A30",
  },
  {
    slug: "asia",
    title: "Southeast Asia",
    year: 2027,
    startDate: "2027-02-06",
    tags: ["Career break", "9 countries", "77 days"],
    description: "Malaysia · Vietnam · Japan · Korea + more",
    accentColor: "#7F77DD",
  },
];
