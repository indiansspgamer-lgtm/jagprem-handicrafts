# Jagprem Handicrafts

A responsive, editorial furniture and Indian handicrafts storefront prototype built with React,
TypeScript, and Vite.

## Run locally

```sh
npm install
npm run dev
```

Run `npm run build` for the TypeScript check and production build, or `npm run lint` for Oxlint.

## Brand and catalog

Replace the placeholder brand name, tagline, contact email, social link, address, and story in
[`src/brand.ts`](./src/brand.ts). The same file contains the editable product and collection data,
including prices, materials, finishes, dimensions, descriptions, and photography URLs.

The prototype includes collection browsing at `/collections`, Indian craft categories at
`/handicrafts`, searchable products at `/shop`, product details at `/products/:slug`, and story,
craftsmanship, and contact pages. The dark/light theme, cart, and wishlist persist in local storage.
The craftsmanship page's scroll-led craft story is managed in `src/animationEngine.ts`; it reverses
with scroll, stacks on smaller screens or for reduced-motion preferences, and follows the browser's
native `requestAnimationFrame` cadence.

Page titles, descriptions, canonical URLs, social-sharing metadata, and organization/site structured
data update with client-side navigation in `src/seo.ts`. The Vite build creates `robots.txt` and a
sitemap containing the store routes and product pages when the `SITE_URL` environment variable is
set to the public HTTPS site origin (for example, `https://jagprem-handicrafts.pages.dev`). Without
`SITE_URL`, the build still creates an allow-all `robots.txt` but omits the sitemap.

For Cloudflare Pages, set `SITE_URL` under **Settings → Environment variables** for the production
environment, then redeploy. Confirm `/robots.txt` and `/sitemap.xml` are available on the deployed
site before submitting the sitemap in Google Search Console. The `pages.dev` URL is only an example;
use the actual project URL.

## Prototype boundaries

Product data, prices, craft descriptions, and maker details are sample content. Some craft images
are historical/reference images; their source pages are linked from product details. Verify each
image's license and attribution before production use, and replace reference imagery with
maker-approved photography.

Cart, wishlist, theme selection, and form validation run locally only. No login, backend, checkout,
payment, inventory, or inquiry delivery service is configured. Add the appropriate backend and
authentication before accepting orders or customer inquiries.
