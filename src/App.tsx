import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Moon,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react'
import { createAnimationEngine } from './animationEngine'
import { brand, collections, handicraftCollections, products, type Product } from './brand'
import { updatePageMetadata } from './seo'
import './App.css'

type Cart = Record<string, number>
type SortOrder = 'featured' | 'low-high' | 'high-low'
type Theme = 'light' | 'dark'

function readStored<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key)
    return saved ? (JSON.parse(saved) as T) : fallback
  } catch (error) {
    console.warn(`Could not restore ${key} from local storage.`, error)
    return fallback
  }
}

function money(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [cart, setCart] = useState<Cart>(() => readStored('your-brand-cart', {}))
  const [wishlist, setWishlist] = useState<string[]>(() => readStored('your-brand-wishlist', []))
  const [theme, setTheme] = useState<Theme>(() => readStored('your-brand-theme', 'light'))
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOrder>('featured')
  const [inquirySent, setInquirySent] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [detailQuantity, setDetailQuantity] = useState(1)
  const [selectedFinish, setSelectedFinish] = useState('')

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to)
    setPath(to)
    setMenuOpen(false)
    setSearchOpen(false)
    setWishlistOpen(false)
    setCartOpen(false)
    setActiveImage(0)
    setDetailQuantity(1)
    setSelectedFinish('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname)
      setMenuOpen(false)
      setCartOpen(false)
      setWishlistOpen(false)
    }
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('popstate', onPopState)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('popstate', onPopState)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('your-brand-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('your-brand-wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (path !== '/' && path !== '/craftsmanship') return
    const root = document.querySelector<HTMLElement>('.site-shell')
    return root ? createAnimationEngine(root) : undefined
  }, [path])

  useEffect(() => {
    localStorage.setItem('your-brand-theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen || cartOpen || wishlistOpen || searchOpen)
    return () => document.body.classList.remove('no-scroll')
  }, [menuOpen, cartOpen, wishlistOpen, searchOpen])

  const addToCart = (slug: string, count = 1) => {
    setCart((current) => ({ ...current, [slug]: (current[slug] ?? 0) + count }))
    setCartOpen(true)
  }

  const updateQuantity = (slug: string, amount: number) => {
    setCart((current) => {
      const next = { ...current }
      const quantity = (next[slug] ?? 0) + amount
      if (quantity < 1) delete next[slug]
      else next[slug] = quantity
      return next
    })
  }

  const toggleWishlist = (slug: string) => {
    setWishlist((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    )
  }

  const cartProducts = products.filter((product) => cart[product.slug])
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const subtotal = cartProducts.reduce((sum, product) => sum + product.price * cart[product.slug], 0)
  const detail = path.startsWith('/products/')
    ? products.find((product) => product.slug === path.slice('/products/'.length))
    : undefined
  const collectionName = path.startsWith('/collections/')
    ? decodeURIComponent(path.slice('/collections/'.length).replaceAll('-', ' '))
      .replace(/\band\b/gi, '&')
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
    : undefined

  useEffect(() => {
    updatePageMetadata(path, detail, collectionName)
  }, [collectionName, detail, path])

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const isBespoke = collectionName?.toLowerCase() === 'bespoke furniture'
      const matchesCollection =
        !collectionName ||
        product.collection.toLowerCase() === collectionName.toLowerCase() ||
        product.category.toLowerCase() === collectionName.toLowerCase() ||
        (isBespoke && product.tag === 'Made to order')
      const matchesQuery = `${product.name} ${product.category} ${product.material}`
        .toLowerCase()
        .includes(query.toLowerCase())
      return matchesCollection && matchesQuery
    })
    if (sort === 'low-high') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high-low') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [collectionName, query, sort])

  const openCollection = (name: string) =>
    navigate(`/collections/${name.toLowerCase().replaceAll('&', 'and').replaceAll(' ', '-')}`)

  const productCard = (product: Product, index: number) => (
    <article className={`product-card product-card-${index % 3}`} key={product.slug} data-reveal>
      <div className="product-photo-wrap">
        <button
          className="product-photo"
          style={{ backgroundImage: `url("${product.image}")` }}
          aria-label={`View ${product.name}`}
          onClick={() => navigate(`/products/${product.slug}`)}
        >
          <span className="product-open"><ArrowUpRight size={17} /></span>
        </button>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button
          className={`wish-button ${wishlist.includes(product.slug) ? 'is-wished' : ''}`}
          aria-label={wishlist.includes(product.slug) ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => toggleWishlist(product.slug)}
        >
          <Heart size={18} fill={wishlist.includes(product.slug) ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-meta">
        <div>
          <button className="product-name" onClick={() => navigate(`/products/${product.slug}`)}>
            {product.name}
          </button>
          <p>{product.material}</p>
        </div>
        <span>{money(product.price)}</span>
      </div>
    </article>
  )

  const renderHeader = () => (
    <header className={`site-header ${scrolled || path !== '/' ? 'header-solid' : ''}`}>
      <button className="wordmark" onClick={() => navigate('/')} aria-label={`${brand.name} home`}>
        <span className="wordmark-symbol">{brand.monogram}</span>
        <span>{brand.name}</span>
      </button>
      <nav className="desktop-nav" aria-label="Main navigation">
        <button onClick={() => navigate('/collections')}>Collections</button>
        <button onClick={() => navigate('/handicrafts')}>Indian Handicrafts</button>
        <button onClick={() => navigate('/craftsmanship')}>Craftsmanship</button>
        <button onClick={() => navigate('/our-story')}>Our Story</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
      </nav>
      <div className="header-actions">
        <button className="header-icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
          <Search size={18} />
        </button>
        <button
          className="header-icon wishlist-trigger"
          aria-label={`Wishlist, ${wishlist.length} items`}
          onClick={() => setWishlistOpen(true)}
        >
          <Heart size={18} />
          {wishlist.length > 0 && <span className="count-dot">{wishlist.length}</span>}
        </button>
        <button
          className="header-icon bag-trigger"
          aria-label={`Shopping bag, ${cartCount} items`}
          onClick={() => setCartOpen(true)}
        >
          <ShoppingBag size={18} />
          <span className="bag-count">{cartCount}</span>
        </button>
        <button
          className="header-icon theme-trigger"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button
          className="menu-trigger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )

  const renderHome = () => (
    <>
      <section className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow light-eyebrow">FURNITURE FOR THE UNHURRIED HOME</span>
          <h1>Timeless<br /><em>by nature.</em></h1>
          <p>{brand.tagline}</p>
          <button className="button-light" onClick={() => openCollection('Living Room')}>
            Explore the collection <ArrowRight size={16} />
          </button>
        </div>
        <div className="hero-bottom">
          <span>01 — 06 <i /></span>
          <span className="hero-scroll">SCROLL TO DISCOVER <ArrowDown size={14} /></span>
          <span>OBJECTS MADE TO STAY</span>
        </div>
        <span className="hero-side-note">NATURAL MATERIALS · CONSIDERED FORMS</span>
      </section>

      <section className="intro-section section-pad">
        <div className="intro-left" data-reveal>
          <span className="eyebrow">A QUIETER KIND OF LUXURY</span>
          <h2>Good things<br />take <em>their time.</em></h2>
        </div>
        <div className="intro-right" data-reveal>
          <p>
            Made slowly, to be lived with for a long time. Our furniture brings the honest beauty
            of solid wood into the everyday — shaped by the hand, and softened by time.
          </p>
          <button className="text-link" onClick={() => navigate('/our-story')}>
            A little about us <ArrowRight size={15} />
          </button>
        </div>
        <div className="intro-caption"><span>01 / THE MATERIAL</span><span>WOOD, IN ITS OWN TIME</span></div>
      </section>

      <section className="full-bleed story-image-section">
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=90"
          alt="Sunlight falling across a thoughtfully furnished architectural home"
          loading="lazy"
        />
        <div className="image-caption"><span>AN INTERIOR MADE FOR GATHERING</span><span>02 — ARCHITECTURE</span></div>
        <div className="story-image-copy" data-reveal>
          <span className="eyebrow light-eyebrow">A PLACE TO COME TOGETHER</span>
          <h2>Designed<br />for <em>living.</em></h2>
          <button className="button-light" onClick={() => openCollection('Dining')}>
            Find your gathering place <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="collection-section section-pad">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow">A PLACE FOR EVERYTHING</span><h2>Considered <em>collections.</em></h2></div>
          <button className="text-link" onClick={() => navigate('/shop')}>View all pieces <ArrowRight size={15} /></button>
        </div>
        <div className="collection-grid">
          {collections.slice(0, 4).map((collection, index) => (
            <button
              className={`collection-tile collection-tile-${index + 1}`}
              onClick={() => openCollection(collection.name)}
              key={collection.name}
              data-reveal
            >
              <img src={collection.image} alt={`${collection.name} furniture collection`} loading="lazy" />
              <span className="tile-index">{collection.number} / {collection.count}</span>
              <span className="tile-title">{collection.name}<ArrowUpRight size={17} /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="craft-section">
        <div className="craft-photo">
          <img
            src={products[8].image}
            alt={products[8].imageAlt}
            loading="lazy"
          />
          <span>THE HAND OF THE MAKER · 03</span>
        </div>
        <div className="craft-copy" data-reveal>
          <span className="eyebrow">MADE BY HAND</span>
          <h2>Made by<br /><em>hand.</em></h2>
          <p>
            From the first selection of timber to the final touch of oil, each piece passes through
            many careful hands. Small variations are not imperfections. They are the signature of
            a natural material, and of the person who made it.
          </p>
          <button className="text-link" onClick={() => navigate('/craftsmanship')}>
            The way we make <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <section className="craft-journey" aria-label="A scroll-led look at Indian craft traditions">
        <div className="journey-label"><span className="eyebrow light-eyebrow">A LIVING FIELD GUIDE</span><span>SCROLL TO MOVE THROUGH THE COLLECTION</span></div>
        {handicraftCollections.slice(0, 3).map((collection, index) => {
          const product = products.find((item) => item.collection === collection.name || item.category === collection.name)
          if (!product) return null
          return (
            <article className={`process-panel process-panel-${index + 1}`} key={collection.name}>
              <img src={product.image} alt={product.imageAlt} />
              <div className="process-shade" />
              <div className="process-copy">
                <span className="eyebrow light-eyebrow">{String(index + 1).padStart(2, '0')} / {collection.count}</span>
                <h2>{collection.name}</h2>
                <p>{product.description}</p>
                <button className="button-light" onClick={() => openCollection(collection.name)}>
                  Discover this craft <ArrowRight size={16} />
                </button>
              </div>
              <span className="process-index">{String(index + 1).padStart(2, '0')} — 03</span>
            </article>
          )
        })}
        <span className="journey-footnote">MANY MATERIALS · MANY MAKING TRADITIONS</span>
      </section>

      <section className="material-section section-pad">
        <div className="material-heading" data-reveal>
          <span className="eyebrow">NATURE LEAVES NO TWO ALIKE</span>
          <h2>Beauty in<br />every <em>grain.</em></h2>
        </div>
        <div className="material-content" data-reveal>
          <p>Walnut. Oak. Teak. Sheesham.<br />Each with a life of its own.</p>
          <span>We choose each board for its character — its quiet figuring, its warmth, and the way the light moves across it.</span>
          <button className="text-link" onClick={() => navigate('/craftsmanship')}>
            Get to know our materials <ArrowRight size={15} />
          </button>
        </div>
        <div className="wood-strip">
          {['WALNUT', 'OAK', 'TEAK', 'SHEESHAM'].map((wood, index) => (
            <div className={`wood-swatch wood-swatch-${index + 1}`} key={wood}>
              <span>{wood}</span><i>{['01', '02', '03', '04'][index]}</i>
            </div>
          ))}
        </div>
      </section>

      <section className="bespoke-section">
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=90"
          alt="Quiet, contemporary residence with bespoke timber furniture"
          loading="lazy"
        />
        <div className="bespoke-overlay" />
        <div className="bespoke-copy" data-reveal>
          <span className="eyebrow light-eyebrow">A PIECE THAT BEGINS WITH YOU</span>
          <h2>Made uniquely<br /><em>yours.</em></h2>
          <p>Some things are worth making just for you.</p>
          <button className="button-light" onClick={() => navigate('/contact')}>
            Begin a conversation <ArrowRight size={16} />
          </button>
        </div>
        <span className="bespoke-index">04 / BESPOKE</span>
      </section>

      <section className="featured-section section-pad">
        <div className="section-heading" data-reveal>
          <div><span className="eyebrow">A FEW THINGS WE'VE MADE</span><h2>Objects to <em>keep.</em></h2></div>
          <button className="text-link" onClick={() => openCollection('Living Room')}>Explore all furniture <ArrowRight size={15} /></button>
        </div>
        <div className="product-grid">{products.slice(0, 3).map(productCard)}</div>
      </section>

      <section className="closing-section">
        <div className="closing-photo">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1900&q=90"
            alt="Warmly lit living room with carefully chosen natural wood furniture"
            loading="lazy"
          />
        </div>
        <div className="closing-copy" data-reveal>
          <span className="eyebrow light-eyebrow">A HOME, A LITTLE MORE YOURS</span>
          <h2>Make space<br />for <em>timelessness.</em></h2>
          <button className="button-light" onClick={() => navigate('/our-story')}>
            Discover our world <ArrowRight size={16} />
          </button>
        </div>
        <span className="closing-note">MADE WITH CARE, TO BE KEPT</span>
      </section>
    </>
  )

  const renderCatalog = () => (
    <main className="catalog-page">
      <div className="page-intro">
        <span className="eyebrow">THE COLLECTIONS</span>
        <h1>{collectionName || 'Furniture for the unhurried home.'}</h1>
        <p>{collectionName && handicraftCollections.some((collection) => collection.name === collectionName) ? 'Explore this craft form through sample objects and reference imagery. Maker and origin details remain to be confirmed.' : 'Considered forms, honest materials, and a little more room to make them yours.'}</p>
      </div>
      <div className="catalog-toolbar">
        <span>{visibleProducts.length} pieces</span>
        <label className="catalog-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a piece" /></label>
        <label className="sort-select"><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}><option value="featured">Featured</option><option value="low-high">Price: low to high</option><option value="high-low">Price: high to low</option></select><ChevronDown size={13} /></label>
      </div>
      {visibleProducts.length ? <div className="product-grid catalog-grid">{visibleProducts.map(productCard)}</div> : <div className="empty-state">No pieces found. Try another search.</div>}
      <div className="catalog-custom">
        <span>LOOKING FOR SOMETHING ELSE?</span><button onClick={() => navigate('/contact')}>Let’s make it together <ArrowRight size={15} /></button>
      </div>
    </main>
  )

  const renderCollectionDirectory = () => (
    <main className="collections-page">
      <div className="page-intro">
        <span className="eyebrow">A PLACE FOR EVERYTHING</span>
        <h1>Considered <em>collections.</em></h1>
        <p>Furniture and handcrafted objects, shaped by natural materials and many different traditions.</p>
      </div>
      <div className="directory-grid">
        {collections.map((collection, index) => (
          <button className={`directory-tile directory-tile-${index % 3}`} key={collection.name} onClick={() => openCollection(collection.name)}>
            <img src={collection.image} alt={`${collection.name} reference image`} loading="lazy" />
            <span className="tile-index">{collection.number} / {collection.count}</span>
            <span className="tile-title">{collection.name}<ArrowUpRight size={17} /></span>
          </button>
        ))}
      </div>
      <div className="catalog-custom">
        <span>THE WHOLE COLLECTION</span><button onClick={() => navigate('/shop')}>View all pieces <ArrowRight size={15} /></button>
      </div>
    </main>
  )

  const renderHandicrafts = () => (
    <main className="collections-page handicrafts-page">
      <div className="page-intro">
        <span className="eyebrow">INDIAN HANDCRAFTS · A LIVING FIELD GUIDE</span>
        <h1>Many hands.<br /><em>Many traditions.</em></h1>
        <p>Explore a growing selection of craft forms, materials, and visual stories from across India. Product and maker details are sample content until verified.</p>
      </div>
      <div className="directory-grid craft-directory-grid">
        {handicraftCollections.map((collection) => (
          <button className="directory-tile" key={collection.name} onClick={() => openCollection(collection.name)}>
            <img src={collection.image} alt={`${collection.name} reference image`} loading="lazy" />
            <span className="tile-index">{collection.number} / {collection.count}</span>
            <span className="tile-title">{collection.name}<ArrowUpRight size={17} /></span>
          </button>
        ))}
      </div>
    </main>
  )

  const renderProduct = (product: Product) => (
    <main className="detail-page">
      <button className="back-link" onClick={() => window.history.length > 1 ? window.history.back() : openCollection(product.collection)}>
        <ArrowLeft size={15} /> Back to {product.collection}
      </button>
      <div className="detail-layout">
        <div className="detail-gallery">
          <div className="detail-main-image" style={{ backgroundImage: `url("${activeImage === 0 ? product.image : product.galleryImage}")` }}>
            <span>{String(activeImage + 1).padStart(2, '0')} / 02</span>
          </div>
          <button className="gallery-arrow gallery-prev" aria-label="Previous image" onClick={() => setActiveImage((value) => (value + 1) % 2)}><ArrowLeft size={16} /></button>
          <button className="gallery-arrow gallery-next" aria-label="Next image" onClick={() => setActiveImage((value) => (value + 1) % 2)}><ArrowRight size={16} /></button>
          <div className="gallery-thumbs">
            <button className={activeImage === 0 ? 'selected' : ''} onClick={() => setActiveImage(0)} style={{ backgroundImage: `url("${product.image}")` }} aria-label="View image one" />
            <button className={activeImage === 1 ? 'selected' : ''} onClick={() => setActiveImage(1)} style={{ backgroundImage: `url("${product.galleryImage}")` }} aria-label="View image two" />
          </div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">{product.category.toUpperCase()} · {handicraftCollections.some((collection) => collection.name === product.collection) ? 'REFERENCE COLLECTION' : 'MADE TO ORDER'}</span>
          <h1>{product.name}</h1>
          <span className="detail-price">{money(product.price)}</span>
          <p className="detail-description">{product.description}</p>
          <div className="detail-specs"><div><span>MATERIAL</span><strong>{product.material}</strong></div><div><span>FINISH</span><strong>{product.finish}</strong></div><div><span>DIMENSIONS</span><strong>{product.dimensions}</strong></div></div>
          <label className="variant-select">FINISH<select value={selectedFinish || product.finish} onChange={(event) => setSelectedFinish(event.target.value)}>{product.finishes.map((finish) => <option key={finish}>{finish}</option>)}</select><ChevronDown size={14} /></label>
          <div className="detail-actions">
            <div className="detail-quantity"><span>QUANTITY</span><div><button onClick={() => setDetailQuantity((count) => Math.max(1, count - 1))} aria-label="Decrease quantity"><Minus size={13} /></button><strong>{detailQuantity}</strong><button onClick={() => setDetailQuantity((count) => count + 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div>
            <button className="button-dark" onClick={() => addToCart(product.slug, detailQuantity)}>Add to bag <ShoppingBag size={16} /></button>
            <button className={`detail-wish ${wishlist.includes(product.slug) ? 'is-wished' : ''}`} onClick={() => toggleWishlist(product.slug)} aria-label="Toggle wishlist"><Heart size={18} fill={wishlist.includes(product.slug) ? 'currentColor' : 'none'} /></button>
          </div>
          <button className="quote-link" onClick={() => navigate('/contact')}>Request a custom quotation <ArrowUpRight size={14} /></button>
          <p className="detail-footnote">{handicraftCollections.some((collection) => collection.name === product.collection) ? 'Sample product content only. Confirm maker, origin, materials, price, and availability before publishing.' : 'Made to order with care. Lead times and delivery can be confirmed by our studio.'}</p>
          {product.imageSource && <a className="detail-image-source" href={product.imageSource} target="_blank" rel="noreferrer">Reference image · Wikimedia Commons <ArrowUpRight size={12} /></a>}
        </div>
      </div>
    </main>
  )

  const renderStory = (craft = false) => (
    <main className="editorial-page">
      <div className="editorial-hero">
        <img src={craft ? products[8].image : 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=90'} alt={craft ? products[8].imageAlt : 'Warm timber and considered forms in a contemporary home'} />
        <div><span className="eyebrow light-eyebrow">{craft ? 'THE WAY WE MAKE' : 'OUR STORY'}</span><h1>{craft ? <>A little more<br /><em>human.</em></> : <>Good things<br /><em>take their time.</em></>}</h1></div>
      </div>
      {craft && <section className="craft-journey" aria-label="A scroll-led journey through Indian handicrafts">
        <div className="journey-label">
          <span className="eyebrow light-eyebrow">MATERIAL, MEANING, MAKING</span>
          <span>SCROLL TO MOVE BETWEEN STORIES</span>
        </div>
        {products.slice(6, 9).map((product, index) => (
          <article className="process-panel" key={product.slug}>
            <img src={product.image} alt={product.imageAlt} />
            <div className="process-shade" />
            <div className="process-copy">
              <span className="eyebrow light-eyebrow">{product.category}</span>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button className="button-light" onClick={() => navigate(`/products/${product.slug}`)}>
                Explore this reference <ArrowRight size={15} />
              </button>
            </div>
            <span className="process-index">0{index + 1} / 0{products.slice(6, 9).length}</span>
          </article>
        ))}
        <span className="journey-footnote">REFERENCE IMAGERY · VERIFY MAKER AND PRODUCT DETAILS BEFORE PUBLICATION</span>
      </section>}
      <div className="editorial-body">
        <span className="eyebrow">{craft ? 'FROM TIMBER TO TABLE' : 'A NOTE FROM THE STUDIO'}</span>
        <p className="editorial-lead">{craft ? 'Every material asks for a different kind of attention.' : brand.story}</p>
        <div className="editorial-columns">
          <p>Wood, clay, metal, fibre, and cloth all behave differently in the hand. The stories shown here are a starting point for exploring those materials and the many forms of making represented across Indian craft.</p>
          <p>Each process has its own language: shaping, joining, weaving, printing, casting, or finishing. Product imagery and artisan details in this prototype are references and should be replaced with verified maker stories before publication.</p>
        </div>
        <div className="editorial-steps">{['The timber', 'The hands', 'The details', 'The home'].map((item, index) => <div key={item}><span>0{index + 1}</span><h3>{item}</h3></div>)}</div>
        <button className="text-link" onClick={() => navigate('/contact')}>Make something together <ArrowRight size={15} /></button>
      </div>
    </main>
  )

  const renderContact = () => (
    <main className="contact-page">
      <div className="contact-intro">
        <span className="eyebrow">LET'S BEGIN A CONVERSATION</span>
        <h1>Made uniquely<br /><em>yours.</em></h1>
        <p>For a piece made to measure, a project in mind, or simply to say hello — our studio would love to hear from you.</p>
        <div className="contact-details"><span>GENERAL ENQUIRIES</span><a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a><span>TRADE, HOSPITALITY & EXPORT</span><p>Tell us a little about your project and we’ll be in touch.</p></div>
      </div>
      <form className="inquiry-form" onSubmit={(event) => { event.preventDefault(); setInquirySent(true) }}>
        <span className="eyebrow">A FEW DETAILS</span>
        <div className="form-row"><label>Your name<input required name="name" autoComplete="name" /></label><label>Company<input name="company" autoComplete="organization" /></label></div>
        <div className="form-row"><label>Email address<input required type="email" name="email" autoComplete="email" /></label><label>Country<input required name="country" autoComplete="country-name" /></label></div>
        <div className="form-row"><label>I'm interested in<select name="type" defaultValue=""><option value="" disabled>Select an enquiry</option><option>Custom furniture</option><option>Wholesale / bulk orders</option><option>Interior design partnership</option><option>Hospitality project</option><option>International export</option><option>Something else</option></select><ChevronDown size={14} /></label><label>Estimated quantity<input name="quantity" inputMode="numeric" placeholder="e.g. 12 pieces" /></label></div>
        <label className="message-field">A little about your project<textarea name="message" required rows={4} /></label>
        <button className="button-dark" type="submit">Prepare enquiry <ArrowRight size={15} /></button>
        {inquirySent && <p className="form-note" role="status"><Check size={15} /> Your details are validated. This prototype does not send enquiries yet — please email {brand.contactEmail} or connect an inquiry service.</p>}
        <p className="form-privacy">Your details stay with our studio and are used only to respond to your enquiry.</p>
      </form>
    </main>
  )

  return (
    <div className="site-shell" data-theme={theme}>
      {renderHeader()}
      {path === '/' ? renderHome()
        : detail ? renderProduct(detail)
          : path === '/collections' ? renderCollectionDirectory()
          : path === '/handicrafts' ? renderHandicrafts()
          : path === '/shop' || path.startsWith('/collections/') ? renderCatalog()
            : path === '/our-story' ? renderStory()
              : path === '/craftsmanship' ? renderStory(true)
                : path === '/contact' ? renderContact()
                  : renderHome()}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><button className="wordmark" onClick={() => navigate('/')}><span className="wordmark-symbol">{brand.monogram}</span><span>{brand.name}</span></button><p>{brand.tagline}</p></div>
          <div className="footer-links"><span>EXPLORE</span><button onClick={() => navigate('/collections')}>Collections</button><button onClick={() => navigate('/craftsmanship')}>Craftsmanship</button><button onClick={() => navigate('/our-story')}>Our story</button></div>
          <div className="footer-links"><span>LET'S TALK</span><button onClick={() => navigate('/contact')}>Bespoke enquiries</button><button onClick={() => navigate('/contact')}>Trade & hospitality</button><a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a></div>
          <div className="footer-note"><span>A NOTE FROM THE STUDIO</span><p>Made slowly, to be lived with for a long time.</p><a href={brand.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {brand.name}</span><span>{brand.address}</span><button onClick={() => navigate('/')}>BACK TO THE TOP ↑</button></div>
      </footer>

      {menuOpen && <div className="menu-overlay">
        <div className="menu-image"><img src={collections[0].image} alt="Warm wooden furniture in a contemporary interior" /><span>MADE FOR THE EVERYDAY, AND ALL THE DAYS AFTER</span></div>
        <nav className="menu-links" aria-label="Expanded navigation">
          <span className="eyebrow">A WORLD IN WOOD</span>
          {[['Collections', '/collections'], ['Indian Handicrafts', '/handicrafts'], ['Craftsmanship', '/craftsmanship'], ['Our Story', '/our-story'], ['Saved pieces', '/saved'], ['Contact', '/contact']].map(([label, href], index) => <button onClick={() => { if (href === '/saved') { setMenuOpen(false); setWishlistOpen(true) } else navigate(href) }} key={href}><small>0{index + 1}</small>{label}<ArrowUpRight size={20} /></button>)}
          <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
        </nav>
      </div>}

      {searchOpen && <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search furniture">
        <button className="overlay-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={21} /></button>
        <span className="eyebrow">FIND SOMETHING TO KEEP</span>
        <form onSubmit={(event) => { event.preventDefault(); navigate('/shop') }}>
          <label><Search size={22} /><input autoFocus placeholder="Search furniture, materials…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <button className="text-link" type="submit">Explore the collection <ArrowRight size={15} /></button>
        </form>
      </div>}

      {(cartOpen || wishlistOpen) && <button className="drawer-backdrop" onClick={() => { setCartOpen(false); setWishlistOpen(false) }} aria-label="Close drawer" />}
      {(cartOpen || wishlistOpen) && <aside className="side-drawer" aria-label={cartOpen ? 'Shopping bag' : 'Wishlist'}>
        <div className="drawer-header"><div><span className="eyebrow">{cartOpen ? 'CONSIDERED PIECES' : 'SAVED FOR LATER'}</span><h2>{cartOpen ? 'Your bag' : 'Your wishlist'}</h2></div><button onClick={() => { setCartOpen(false); setWishlistOpen(false) }} aria-label="Close drawer"><X size={19} /></button></div>
        {cartOpen ? cartProducts.length ? <><div className="drawer-items">{cartProducts.map((product) => <div className="drawer-item" key={product.slug}><button className="drawer-item-image" style={{ backgroundImage: `url("${product.image}")` }} onClick={() => { setCartOpen(false); navigate(`/products/${product.slug}`) }} aria-label={`View ${product.name}`} /><div className="drawer-item-info"><button onClick={() => { setCartOpen(false); navigate(`/products/${product.slug}`) }}>{product.name}</button><span>{product.material}</span><strong>{money(product.price)}</strong><div className="quantity-control"><button onClick={() => updateQuantity(product.slug, -1)} aria-label="Decrease quantity"><Minus size={12} /></button><span>{cart[product.slug]}</span><button onClick={() => updateQuantity(product.slug, 1)} aria-label="Increase quantity"><Plus size={12} /></button></div></div></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Delivery and lead times can be confirmed by our studio.</p><button className="button-dark" onClick={() => { setCartOpen(false); navigate('/contact') }}>Enquire about these pieces <ArrowRight size={15} /></button><small>Checkout and payment are not enabled in this prototype.</small></div></> : <div className="drawer-empty"><ShoppingBag size={25} /><p>Your bag is waiting for something lovely.</p><button className="text-link" onClick={() => { setCartOpen(false); openCollection('Living Room') }}>Explore the collection <ArrowRight size={15} /></button></div>
          : wishlist.length ? <><div className="drawer-items">{products.filter((product) => wishlist.includes(product.slug)).map((product) => <div className="drawer-item" key={product.slug}><button className="drawer-item-image" style={{ backgroundImage: `url("${product.image}")` }} onClick={() => { setWishlistOpen(false); navigate(`/products/${product.slug}`) }} aria-label={`View ${product.name}`} /><div className="drawer-item-info"><button onClick={() => { setWishlistOpen(false); navigate(`/products/${product.slug}`) }}>{product.name}</button><strong>{money(product.price)}</strong><button className="remove-saved" onClick={() => toggleWishlist(product.slug)}>Remove</button></div></div>)}</div><div className="drawer-summary"><button className="button-dark" onClick={() => { setWishlistOpen(false); navigate('/contact') }}>Ask about a saved piece <ArrowRight size={15} /></button></div></> : <div className="drawer-empty"><Heart size={25} /><p>Keep the pieces you love close by.</p><button className="text-link" onClick={() => { setWishlistOpen(false); openCollection('Living Room') }}>Explore the collection <ArrowRight size={15} /></button></div>}
      </aside>}
    </div>
  )
}

export default App
