# Travel Itineraries

A React-based travel itinerary viewer built with Vite and React Router.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
travel-react/
├── public/
│   ├── favicon.ico
│   └── itineraries/        # Markdown files for each trip
│       ├── asia.md
│       ├── australia.md
│       ├── estonia.md
│       ├── porto.md
│       └── slovenia.md
├── src/
│   ├── data/
│   │   └── trips.js        # Trip configuration
│   ├── pages/
│   │   ├── Home.jsx        # Homepage with trip grid
│   │   └── Itinerary.jsx   # Individual trip page
│   ├── styles/
│   │   └── index.css       # Main styles
│   ├── App.jsx             # Router setup
│   └── main.jsx            # Entry point
├── index.html
├── package.json
├── vercel.json             # Vercel SPA routing config
└── vite.config.js
```

## Adding a New Trip

1. Add your markdown file to `public/itineraries/{slug}.md`
2. Add the trip config to `src/data/trips.js`:

```js
{
  slug: 'your-slug',      // Used for URL and markdown filename
  title: 'Trip Title',    // Displayed on card
  subtitle: 'Description' // Optional subtitle
}
```

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and configure the build

The `vercel.json` file handles SPA routing so direct links to `/estonia`, `/porto`, etc. work correctly.

## Updating Itineraries

Simply edit the markdown files in `public/itineraries/`. Changes will be reflected immediately in development, and after a rebuild in production.
