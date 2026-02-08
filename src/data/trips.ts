// Trip configuration - add new trips here
// The slug is used for the URL path and to locate the markdown file
// Markdown files should be placed in /public/itineraries/{slug}.md

export interface Trip {
  slug: string;
  title: string;
  year: number;
}

export const trips: Trip[] = [
  {
    slug: "estonia",
    title: "Estonia",
    year: 2026,
  },
  {
    slug: "porto",
    title: "Porto by Train",
    year: 2026,
  },
  {
    slug: "slovenia",
    title: "Slovenia",
    year: 2026,
  },
  {
    slug: "australia",
    title: "Colin in Australia",
    year: 2027,
  },
  {
    slug: "asia",
    title: "Southeast Asia",
    year: 2027,
  },
];
