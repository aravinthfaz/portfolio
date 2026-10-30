# Aravinth R — Portfolio

Vite + React + TypeScript + Tailwind site, hosted on GitHub Pages at https://aravinthfaz.github.io/portfolio/.

## Editing content

All site text lives in `public/content.json`. Edit it in the admin panel at
https://aravinthfaz.github.io/portfolio/#/admin. Sign in with a fine-grained GitHub token that has
**Contents: Read and write** on this repo. When you save, `content.json` is committed to both `main` and
`gh-pages`, and the live site updates within a couple of minutes.

## Development

```bash
npm install
npm run dev
```

## Deploying code changes

```bash
git pull            # pick up content saved from the admin panel
npm run build
# publish dist/ (plus an empty .nojekyll) to the gh-pages branch
```
