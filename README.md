# jaspartapgoomer.com

Personal site for Jaspartap Goomer, a computer science student at Ontario Tech University and an embedded and systems software engineer. It is a static [Astro](https://astro.build) build of the blueprint-and-terminal design, published at [www.jaspartapgoomer.com](https://www.jaspartapgoomer.com).

## Requirements

Node.js **22.12.0 or newer**. `package.json` sets `engines.node` to `>=22.12.0`. The GitHub Actions workflow installs Node 22 (current 22.x), not Node 20.

## Run locally

```sh
npm ci
npm run dev
```

The dev server defaults to `http://localhost:4321`.

## Build

```sh
npm ci
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves that folder.

## Deploy

`.github/workflows/deploy.yml` runs on pushes to `master`. It installs dependencies with `npm ci`, builds with `npm run build`, and deploys `dist/` to GitHub Pages.

The live site still publishes the files at the root of `master` (`index.html`, `style.css`, `script.js`, and `img/`) until GitHub Pages is switched to the **GitHub Actions** source. Those root files, and the root `CNAME`, stay in this branch so merging does not blank the current site. After the source is switched to Actions, the workflow output is what visitors get.

`public/CNAME` is copied into `dist/` and keeps the custom domain `www.jaspartapgoomer.com`.
