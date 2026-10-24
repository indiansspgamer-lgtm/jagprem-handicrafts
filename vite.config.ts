import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { collections, products } from './src/brand.js'

function seoFiles(siteUrl: string | undefined): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      let origin: string | undefined
      if (siteUrl) {
        let parsedUrl: URL
        try {
          parsedUrl = new URL(siteUrl)
        } catch {
          this.error('SITE_URL must be a valid absolute URL, such as https://example.com.')
        }

        if (parsedUrl.protocol !== 'https:' && parsedUrl.hostname !== 'localhost') {
          this.error('SITE_URL must use HTTPS for a public deployment.')
        }
        origin = parsedUrl.origin
      } else {
        this.warn('SITE_URL is not set; robots.txt will omit its sitemap declaration.')
      }

      const routes = new Set([
        '/',
        '/shop',
        '/collections',
        '/handicrafts',
        '/craftsmanship',
        '/our-story',
        '/contact',
        ...collections.map((collection) =>
          `/collections/${collection.name.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-')}`,
        ),
        ...products.map((product) => `/products/${product.slug}`),
      ])

      const sitemap = origin
        ? `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          [...routes]
            .map((route) => `  <url><loc>${origin}${route}</loc></url>`)
            .join('\n') +
          '\n</urlset>\n'
        : undefined

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
      })

      if (sitemap) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), seoFiles(env.SITE_URL || env.VITE_SITE_URL)],
  }
})
