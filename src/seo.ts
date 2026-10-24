import { brand, collections, handicraftCollections, products, type Product } from './brand'

type PageMetadata = {
  title: string
  description: string
  image: string
}

const brandDescription =
  `Explore considered solid-wood furniture and Indian handicrafts at ${brand.name}. Discover thoughtful forms, natural materials, and craft traditions.`
const defaultImage = products[0].image

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

function resolveMetadata(path: string, product?: Product, collectionName?: string): PageMetadata {
  if (product) {
    return {
      title: `${product.name} | ${brand.name}`,
      description: `${product.name} in ${product.material}. Explore the details and browse handcrafted furniture and Indian craft references at ${brand.name}.`,
      image: product.image,
    }
  }

  if (path === '/shop') {
    return {
      title: `Shop Handcrafted Furniture & Indian Crafts | ${brand.name}`,
      description:
        'Browse considered wooden furniture and Indian handicraft reference collections, with sample materials, finishes, and product details.',
      image: defaultImage,
    }
  }

  if (path === '/collections') {
    return {
      title: `Furniture Collections & Indian Crafts | ${brand.name}`,
      description:
        'Explore furniture collections and handcrafted objects shaped by natural materials and Indian craft traditions.',
      image: collections[0].image,
    }
  }

  if (path.startsWith('/collections/')) {
    const matchingCollection = [...collections, ...handicraftCollections].find(
      (collection) => collection.name.toLowerCase() === collectionName?.toLowerCase(),
    )
    const matchingProduct = products.find(
      (item) =>
        item.collection.toLowerCase() === collectionName?.toLowerCase() ||
        item.category.toLowerCase() === collectionName?.toLowerCase(),
    )
    const titleName = collectionName || 'Handcrafted furniture'
    return {
      title: `${titleName} | ${brand.name}`,
      description: `Explore ${titleName.toLowerCase()} at ${brand.name}, with considered furniture and Indian handicraft reference pieces.`,
      image: matchingCollection?.image ?? matchingProduct?.image ?? defaultImage,
    }
  }

  if (path === '/handicrafts') {
    return {
      title: `Indian Handicrafts & Craft Traditions | ${brand.name}`,
      description:
        'Explore Indian craft traditions including Channapatna toys, Jaipur blue pottery, Dhokra metalwork, textiles, and more.',
      image: handicraftCollections[0].image,
    }
  }

  if (path === '/craftsmanship') {
    return {
      title: `Craftsmanship & Indian Craft Traditions | ${brand.name}`,
      description:
        `Discover the materials, making processes, and Indian craft references behind ${brand.name}’s considered collection.`,
      image: products[8].image,
    }
  }

  if (path === '/our-story') {
    return {
      title: `Our Story | ${brand.name}`,
      description:
        `Learn about ${brand.name}’s considered approach to natural materials, thoughtful forms, and handcrafted furniture.`,
      image: defaultImage,
    }
  }

  if (path === '/contact') {
    return {
      title: `Contact ${brand.name} | Furniture Enquiries`,
      description:
        `Get in touch with ${brand.name} about furniture, custom pieces, trade, or hospitality projects.`,
      image: defaultImage,
    }
  }

  return {
    title: `Handcrafted Furniture & Indian Handicrafts | ${brand.name}`,
    description: brandDescription,
    image: defaultImage,
  }
}

export function updatePageMetadata(path: string, product?: Product, collectionName?: string) {
  const metadata = resolveMetadata(path, product, collectionName)
  const canonicalUrl = new URL(path, window.location.origin).href

  document.title = metadata.title
  upsertMeta('name', 'description', metadata.description)
  upsertMeta('name', 'robots', 'index,follow,max-image-preview:large')
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:site_name', brand.name)
  upsertMeta('property', 'og:title', metadata.title)
  upsertMeta('property', 'og:description', metadata.description)
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:image', metadata.image)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', metadata.title)
  upsertMeta('name', 'twitter:description', metadata.description)
  upsertMeta('name', 'twitter:image', metadata.image)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }
  canonical.href = canonicalUrl

  let structuredData = document.head.querySelector<HTMLScriptElement>('#site-structured-data')
  if (!structuredData) {
    structuredData = document.createElement('script')
    structuredData.id = 'site-structured-data'
    structuredData.type = 'application/ld+json'
    document.head.append(structuredData)
  }
  structuredData.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${window.location.origin}/#organization`,
        name: brand.name,
        url: window.location.origin,
        description: brandDescription,
      },
      {
        '@type': 'WebSite',
        '@id': `${window.location.origin}/#website`,
        name: brand.name,
        url: window.location.origin,
        publisher: { '@id': `${window.location.origin}/#organization` },
      },
    ],
  })
}
