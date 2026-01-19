// Trip configuration - add new trips here
// The slug is used for the URL path and to locate the markdown file
// Markdown files should be placed in /public/itineraries/{slug}.md

interface Trip {
  slug: string
  title: string
  subtitle: string
}

export const trips: Trip[] = [
  {
    slug: 'estonia',
    title: 'Estonia',
    subtitle: 'Baltic Adventure 2026',
  },
  {
    slug: 'porto',
    title: 'Porto by train',
    subtitle: 'Leeds to Porto 2026',
  },
  {
    slug: 'slovenia',
    title: 'Slovenia',
    subtitle: 'Ljubljana 2026',
  },
  {
    slug: 'australia',
    title: 'Colin in Australia',
    subtitle: 'Australian Adventure',
  },
  {
    slug: 'asia',
    title: 'Southeast Asia',
    subtitle: 'Asia Sabbatical 2027',
  },
]
