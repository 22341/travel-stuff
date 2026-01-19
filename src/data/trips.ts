// Trip configuration - add new trips here
// The slug is used for the URL path and to locate the markdown file
// Markdown files should be placed in /public/itineraries/{slug}.md

interface Trip {
  slug: string;
  title: string;
}

export const trips: Trip[] = [
  {
    slug: "estonia",
    title: "Estonia",
  },
  {
    slug: "porto",
    title: "Porto by Train",
  },
  {
    slug: "slovenia",
    title: "Slovenia",
  },
  {
    slug: "australia",
    title: "Colin in Australia",
  },
  {
    slug: "asia",
    title: "Southeast Asia",
  },
];
