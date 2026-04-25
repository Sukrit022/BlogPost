# Sukrit's AI Notes

A personal AI notebook-style blog built with Next.js App Router, Tailwind CSS, and MDX.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Local MDX blog posts with frontmatter
- Dark mode toggle with persisted preference
- Static generation for all note pages

## Project Structure

- `content/posts` - MDX posts and metadata
- `src/lib/posts.ts` - loading, sorting, reading time, and MDX rendering logic
- `src/components` - navbar, cards, footer, theme toggle, content wrapper
- `src/app` - route pages (`/`, `/notes`, `/notes/[slug]`)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Use default Next.js settings:
	- Build command: `npm run build`
	- Output directory: `.next`
4. Deploy.

No environment variables are required for this version.
