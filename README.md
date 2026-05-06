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

```text
travel-stuff/
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
│   │   └── trips.ts        # Trip configuration
│   ├── pages/
│   │   ├── Home.tsx        # Homepage with trip grid
│   │   └── Itinerary.tsx   # Individual trip page
│   ├── styles/
│   │   └── index.css       # Main styles
│   ├── App.tsx             # Router setup
│   └── main.tsx            # Entry point
├── index.html
├── package.json
├── eslint.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json             # Vercel SPA routing config
└── vite.config.ts
```

## Adding a New Trip

1. Add your markdown file to `public/itineraries/{slug}.md`
2. Add the trip config to `src/data/trips.ts`:

```ts
{
  slug: 'your-slug',      // Used for URL and markdown filename
  title: 'Trip Title',    // Displayed on card
  year: 2026,             // Year of the trip (used for grouping)
}
```

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and configure the build

The `vercel.json` file handles SPA routing so direct links to `/estonia`, `/porto`, etc. work correctly.

## Updating Itineraries

Simply edit the markdown files in `public/itineraries/`. Changes will be reflected immediately in development, and after a rebuild in production.

---

#### Local LLM Commands

- `ollama pull {model}`
- `ollama ps`
- `ollama list`
- `ollama rm {model}`
- `ollama run {model} --verbose`
- `ollama create {model} -f {modelfile}`
- `ollama serve` (for debugging)

llama-server -m "D:\Tools\models\Qwen3.5-9B-Q4_K_M.gguf" --port 8080 --n-gpu-layers 999 --ctx-size 65536
llama-server -m "D:\Tools\models\Qwen3.5-27B.Q4_K_M.gguf" --port 8080 --n-gpu-layers 999 --ctx-size 32768

llama-server -m "D:\Tools\models\Qwen2.5-Coder-1.5B.Q4_K_M.gguf" --port 8081 --n-gpu-layers 0 --ctx-size 4096

llama-server -m "D:\Tools\models\nomic-embed-text-v1.5.Q6_K.gguf" --port 8082 --n-gpu-layers 0 --embedding --pooling mean

http://localhost:8080/props
http://localhost:8080/v1/models
