# jaspartapgoomer.com

Personal site for Jaspartap Goomer, a computer science student at Ontario Tech University and an embedded and systems software engineer. It is a static [Astro](https://astro.build) build of the blueprint-and-terminal design, published at [www.jaspartapgoomer.com](https://www.jaspartapgoomer.com).

## Requirements

Node.js **22.x**. `package.json` sets `engines.node` to `22.x` so Vercel deploys the latest Node 22, not the current default (24.x). An open range such as `>=22.12.0` is treated as the latest 24.x.

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

The site is deployed on [Vercel](https://vercel.com) from this repo. `vercel.json` sets the framework to Astro, the build command to `npm run build`, and the output directory to `dist`. There is no GitHub Pages workflow.

The production branch in the Vercel project must be `master`. This repo also has an old `main` branch, and Vercel will keep publishing that branch if production is still pointed at it. Confirm the production branch in the Vercel dashboard (Project Settings → Git → Production Branch).

The custom domain `www.jaspartapgoomer.com` is configured in the Vercel project. This repo does not include a `CNAME` file; Vercel does not use one.
