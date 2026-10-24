export const brand = {
  name: 'Jagprem Handicrafts',
  monogram: 'JH',
  tagline: 'Furniture shaped by nature. Refined by craftsmanship.',
  contactEmail: 'indiansspgamer@gmail.com',
  instagram: 'https://instagram.com/',
  address: 'A considered home, wherever you are.',
  story:
    'We believe the things we live with should grow more beautiful with time. Our work begins with honest materials, thoughtful forms, and the patient hands that bring them together.',
}

export type Product = {
  slug: string
  name: string
  category: string
  collection: string
  price: number
  material: string
  finish: string
  finishes: string[]
  dimensions: string
  description: string
  image: string
  galleryImage: string
  imageAlt: string
  imageSource?: string
  tag?: string
}

export const products: Product[] = [
  {
    slug: 'solstice-dining-table',
    name: 'Solstice Dining Table',
    category: 'Dining',
    collection: 'Dining',
    price: 248000,
    material: 'Solid American walnut',
    finish: 'Natural oil',
    finishes: ['Natural oil', 'Smoked walnut', 'Clear matte'],
    dimensions: '220 × 95 × 76 cm',
    description:
      'A generous gathering place with softened edges and a sculptural, quietly architectural base. Made to hold long lunches and the stories that follow.',
    image:
      'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1500&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Sculptural wooden dining table in a warm, light-filled interior',
    tag: 'Made to order',
  },
  {
    slug: 'arc-coffee-table',
    name: 'Arc Coffee Table',
    category: 'Living',
    collection: 'Living Room',
    price: 89000,
    material: 'Solid European oak',
    finish: 'Smoked oak',
    finishes: ['Smoked oak', 'Natural oil'],
    dimensions: '120 × 65 × 38 cm',
    description:
      'An expressive, low-slung form shaped by the grain of the timber. Each table carries a character entirely its own.',
    image:
      'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1200&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Low wooden table beside a linen sofa',
    tag: 'Studio favourite',
  },
  {
    slug: 'hearth-sideboard',
    name: 'Hearth Sideboard',
    category: 'Storage',
    collection: 'Cabinets & Storage',
    price: 176000,
    material: 'Solid Sheesham',
    finish: 'Hand-rubbed walnut',
    finishes: ['Hand-rubbed walnut', 'Clear matte'],
    dimensions: '180 × 45 × 78 cm',
    description:
      'A considered balance of useful storage and warm, tactile detail. Traditional joinery gives its generous form a lasting lightness.',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Warm modern living room with handcrafted wood furniture',
  },
  {
    slug: 'still-bed',
    name: 'Still Bed',
    category: 'Bedroom',
    collection: 'Bedroom',
    price: 215000,
    material: 'Solid European oak',
    finish: 'Natural oil',
    finishes: ['Natural oil', 'Smoked oak'],
    dimensions: 'King: 198 × 214 × 94 cm',
    description:
      'A quiet, grounded frame with a gently rounded headboard. Designed to make the bedroom feel like a little more room to breathe.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Serene bedroom with natural wood and soft neutral bedding',
    tag: 'Made to order',
  },
  {
    slug: 'slope-lounge-chair',
    name: 'Slope Lounge Chair',
    category: 'Living',
    collection: 'Living Room',
    price: 124000,
    material: 'Solid American walnut',
    finish: 'Natural oil',
    finishes: ['Natural oil', 'Smoked walnut'],
    dimensions: '72 × 78 × 74 cm',
    description:
      'A relaxed silhouette, shaped to invite you to stay. The solid frame pairs with a choice of naturally textured upholstery.',
    image:
      'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1200&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Timber-framed lounge chair in a calm interior',
  },
  {
    slug: 'line-console',
    name: 'Line Console',
    category: 'Tables',
    collection: 'Accent Tables',
    price: 98000,
    material: 'Solid teak',
    finish: 'Clear matte',
    finishes: ['Clear matte', 'Natural oil'],
    dimensions: '140 × 38 × 82 cm',
    description:
      'A simple, enduring line for the spaces between. Handmade with an eye for the quiet details that make a piece feel just right.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85',
    imageAlt: 'Architectural interior with a natural wood console',
  },
  {
    slug: 'channapatna-lacquered-toy',
    name: 'Channapatna Lacquered Toy',
    category: 'Channapatna Toys',
    collection: 'Wooden Decor',
    price: 1500,
    material: 'Turned wood and lacquer',
    finish: 'Bright natural pigments',
    finishes: ['Bright natural pigments'],
    dimensions: 'Approx. 18 cm long',
    description:
      'A playful wooden object inspired by the lacquered toy-making tradition of Channapatna. Confirm materials and child-safety standards with the maker before any sale.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Channapatna_toys26.jpg/960px-Channapatna_toys26.jpg',
    galleryImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Channapatna_toys26.jpg/960px-Channapatna_toys26.jpg',
    imageAlt: 'Colorful handmade Channapatna wooden toys',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Channapatna_toys26.jpg',
  },
  {
    slug: 'jaipur-blue-pottery-vase',
    name: 'Jaipur Blue Pottery Vase',
    category: 'Blue Pottery',
    collection: 'Blue Pottery',
    price: 3200,
    material: 'Glazed ceramic',
    finish: 'Cobalt and ivory',
    finishes: ['Cobalt and ivory', 'Indigo floral'],
    dimensions: 'Approx. 24 cm high',
    description:
      'A decorative vessel inspired by Jaipur’s vivid blue pottery tradition. Each piece is a sample listing; dimensions and maker details should be confirmed before sale.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Blue_Pottery_Jaipur_Collection.jpg/960px-Blue_Pottery_Jaipur_Collection.jpg',
    galleryImage:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Blue_Pottery%2C_Jaipur_School_of_Art.jpg/960px-Blue_Pottery%2C_Jaipur_School_of_Art.jpg',
    imageAlt: 'A collection of Jaipur blue pottery vessels',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Blue_Pottery_Jaipur_Collection.jpg',
  },
  {
    slug: 'dhokra-owl-figure',
    name: 'Dhokra Owl Figure',
    category: 'Dhokra Metalwork',
    collection: 'Dhokra Metalwork',
    price: 5800,
    material: 'Cast brass',
    finish: 'Antique brass',
    finishes: ['Antique brass'],
    dimensions: 'Approx. 18 cm high',
    description:
      'A small sculptural study inspired by the lost-wax Dhokra metalwork of eastern India. This is illustrative sample content, not a verified artisan-made item.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/God_astride_an_owl%2C_Dhokra_%28Dokra%29_craftsmen%2C_Bankura%2C_West_Bengal%2C_19th_century%2C_lost-wax_cast_brass%2C_HAA.JPG/960px-God_astride_an_owl%2C_Dhokra_%28Dokra%29_craftsmen%2C_Bankura%2C_West_Bengal%2C_19th_century%2C_lost-wax_cast_brass%2C_HAA.JPG',
    galleryImage:
      'https://upload.wikimedia.org/wikipedia/commons/4/43/Bidriware_cup_and_lid%2C_ca_1850_V%26A_Museum.jpg',
    imageAlt: 'A traditional lost-wax cast brass figure from Dhokra craft',
    imageSource: 'https://commons.wikimedia.org/wiki/File:God_astride_an_owl,_Dhokra_(Dokra)_craftsmen,_Bankura,_West_Bengal,_19th_century,_lost-wax_cast_brass,_HAA.JPG',
  },
  {
    slug: 'bagru-block-print-runner',
    name: 'Bagru Block-Print Runner',
    category: 'Block Printing',
    collection: 'Block Printing',
    price: 2600,
    material: 'Hand-printed cotton',
    finish: 'Natural indigo',
    finishes: ['Natural indigo', 'Madder red'],
    dimensions: 'Approx. 180 × 35 cm',
    description:
      'A table textile concept shaped by the rhythm of carved printing blocks and repeat pattern. Final fabric, print, and maker information are configurable sample details.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Little_world%2C_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg/960px-Little_world%2C_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Traditional Indian textile printing blocks displayed together',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Little_world,_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg',
  },
  {
    slug: 'kutch-mirrorwork-cushion',
    name: 'Kutch Mirrorwork Cushion',
    category: 'Kutch Embroidery',
    collection: 'Kutch Embroidery',
    price: 2400,
    material: 'Cotton and mirrorwork embroidery',
    finish: 'Earth and indigo',
    finishes: ['Earth and indigo', 'Ivory and rust'],
    dimensions: '45 × 45 cm cover',
    description:
      'A soft furnishing concept informed by the bright threads and reflective details of Kutch embroidery. Exact origin and maker details must be supplied by the seller.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/fa/Stamp_of_India_-_2019_-_Colnect_924646_-_Kutch_Embroidery.jpeg',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Indian postage stamp depicting Kutch embroidery patterns',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Stamp_of_India_-_2019_-_Colnect_924646_-_Kutch_Embroidery.jpeg',
  },
  {
    slug: 'cane-bamboo-vessel',
    name: 'Cane & Bamboo Vessel',
    category: 'Cane & Bamboo',
    collection: 'Cane & Bamboo',
    price: 1800,
    material: 'Cane and bamboo',
    finish: 'Natural',
    finishes: ['Natural', 'Smoked'],
    dimensions: 'Approx. 28 cm high',
    description:
      'A woven form referencing the functional basketry and material traditions found across India. Prototype listing; local craft details are placeholders.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts%2C_which_often_include_replicas_of_traditional_fishing_traps.jpg/960px-The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts%2C_which_often_include_replicas_of_traditional_fishing_traps.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A collection of Indian cane and bamboo handicrafts',
    imageSource: 'https://commons.wikimedia.org/wiki/File:The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts,_which_often_include_replicas_of_traditional_fishing_traps.jpg',
  },
  {
    slug: 'agra-marble-inlay-tray',
    name: 'Agra Marble Inlay Tray',
    category: 'Marble Inlay',
    collection: 'Marble Inlay',
    price: 4600,
    material: 'White marble and stone inlay',
    finish: 'Polished',
    finishes: ['Polished'],
    dimensions: 'Approx. 30 cm wide',
    description:
      'A tabletop object inspired by the careful stone-on-stone detail of Agra inlay work. This configurable sample does not imply a verified origin or artisan.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/48/Marbleworks-1.jpg/960px-Marbleworks-1.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Marble craftwork in progress',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Marbleworks-1.jpg',
  },
  {
    slug: 'terracotta-hatima-putul',
    name: 'Hatima Putul Figure',
    category: 'Terracotta',
    collection: 'Terracotta',
    price: 2100,
    material: 'Fired terracotta',
    finish: 'Natural clay',
    finishes: ['Natural clay'],
    dimensions: 'Approx. 22 cm high',
    description:
      'A sculptural terracotta figure representing a regional folk-art form. Seller-provided details should replace this sample description before launch.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/99/Hatima_Putul_%2C_a_traditional_Indian_terracotta_art_DSC_4721_1.jpg/960px-Hatima_Putul_%2C_a_traditional_Indian_terracotta_art_DSC_4721_1.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Traditional Indian terracotta Hatima Putul folk art',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Hatima_Putul_,_a_traditional_Indian_terracotta_art_DSC_4721_1.jpg',
  },
  {
    slug: 'bidriware-vessel',
    name: 'Bidriware Lidded Vessel',
    category: 'Bidriware',
    collection: 'Bidriware',
    price: 6400,
    material: 'Blackened zinc alloy with inlay',
    finish: 'Black and silver',
    finishes: ['Black and silver'],
    dimensions: 'Approx. 13 cm high',
    description:
      'A small vessel inspired by Bidar’s distinctive dark metalwork and fine inlay. Image depicts a historic museum object; this listing is sample content, not a sale claim.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/4/43/Bidriware_cup_and_lid%2C_ca_1850_V%26A_Museum.jpg',
    galleryImage:
      'https://upload.wikimedia.org/wikipedia/commons/4/43/Bidriware_cup_and_lid%2C_ca_1850_V%26A_Museum.jpg',
    imageAlt: 'Historic Bidriware cup and lid from the Victoria and Albert Museum',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Bidriware_cup_and_lid,_ca_1850_V%26A_Museum.jpg',
  },
  {
    slug: 'kalamkari-wall-panel',
    name: 'Kalamkari Wall Panel',
    category: 'Kalamkari',
    collection: 'Kalamkari',
    price: 5200,
    material: 'Hand-painted cotton textile',
    finish: 'Natural dyes',
    finishes: ['Natural dyes'],
    dimensions: 'Approx. 70 × 90 cm',
    description:
      'A textile wall-art concept inspired by the narrative hand-painted Kalamkari tradition. Design, dimensions, and origin are sample details pending maker confirmation.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Kalamkari_painting_of_Lord_Vishnu_on_serpent_Ananta.jpg/960px-Kalamkari_painting_of_Lord_Vishnu_on_serpent_Ananta.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Kalamkari painting on cloth depicting a traditional narrative scene',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Kalamkari_painting_of_Lord_Vishnu_on_serpent_Ananta.jpg',
  },
  {
    slug: 'turned-frame-lounge-chair',
    name: 'Turned-Frame Lounge Chair',
    category: 'Living',
    collection: 'Living Room',
    price: 124000,
    material: 'Carved wood and upholstery',
    finish: 'Dark polished wood',
    finishes: ['Dark polished wood'],
    dimensions: 'Sample dimensions to be confirmed',
    description:
      'A softly upholstered seat on a sculptural timber frame. This configurable sample listing should be updated with confirmed dimensions, wood species, and upholstery options.',
    image:
      'https://images.unsplash.com/photo-1598300056393-4aac492f4344?auto=format&fit=crop&w=1200&q=85',
    galleryImage:
      'https://images.unsplash.com/photo-1601366533287-5ee4c763ae4e?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'A sculptural lounge chair with warm wood legs',
  },
  {
    slug: 'woven-cotton-throw',
    name: 'Handwoven Cotton Throw',
    category: 'Handwoven Textiles',
    collection: 'Handwoven Textiles',
    price: 3800,
    material: 'Handwoven cotton',
    finish: 'Undyed and indigo',
    finishes: ['Undyed and indigo', 'Rust and cream'],
    dimensions: 'Approx. 200 × 140 cm',
    description:
      'A soft textile concept celebrating the varied handloom traditions of India. Weave, fiber source, and artisan attribution are configurable sample details.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Little_world%2C_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg/960px-Little_world%2C_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Traditional Indian textile printing blocks as a handloom reference',
    imageSource: 'https://commons.wikimedia.org/wiki/File:Little_world,_Aichi_prefecture_-_Main_exhibition_hall_-_Textile_printing_blocks_-_Indian_%26_Iranian.jpg',
  },
  {
    slug: 'jute-storage-basket',
    name: 'Jute Storage Basket',
    category: 'Jute & Natural Fibre',
    collection: 'Jute & Natural Fibre',
    price: 1250,
    material: 'Jute and natural fibre',
    finish: 'Natural',
    finishes: ['Natural'],
    dimensions: 'Approx. 35 cm high',
    description:
      'A simple, useful basket concept in a natural fibre palette. Production method, material origin, and cooperative details are sample content awaiting verification.',
    image:
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts%2C_which_often_include_replicas_of_traditional_fishing_traps.jpg/960px-The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts%2C_which_often_include_replicas_of_traditional_fishing_traps.jpg',
    galleryImage:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Indian cane and bamboo handicraft forms',
    imageSource: 'https://commons.wikimedia.org/wiki/File:The_items_shown_are_a_collection_of_traditional_Indian_cane_and_bamboo_handicrafts,_which_often_include_replicas_of_traditional_fishing_traps.jpg',
  },
]

export const furnitureCollections = [
  { name: 'Living Room', number: '01', image: products[1].image, count: '02 pieces' },
  { name: 'Dining', number: '02', image: products[0].image, count: '01 piece' },
  { name: 'Bedroom', number: '03', image: products[3].image, count: '01 piece' },
  { name: 'Cabinets & Storage', number: '04', image: products[2].image, count: '01 piece' },
  {
    name: 'Accent Tables',
    number: '05',
    image: products[5].image,
    count: '01 piece',
  },
  {
    name: 'Wooden Decor',
    number: '06',
    image: products[6].image,
    count: '01 object',
  },
  {
    name: 'Bespoke Furniture',
    number: '07',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85',
    count: '02 made to order',
  },
]

export const handicraftCollections = [
  { name: 'Channapatna Toys', number: '01', image: products[6].image, count: 'Lacquered wood' },
  { name: 'Blue Pottery', number: '02', image: products[7].image, count: 'Jaipur ceramics' },
  { name: 'Dhokra Metalwork', number: '03', image: products[8].image, count: 'Cast metal objects' },
  { name: 'Block Printing', number: '04', image: products[9].image, count: 'Printed textiles' },
  { name: 'Kutch Embroidery', number: '05', image: products[10].image, count: 'Embroidered textiles' },
  { name: 'Cane & Bamboo', number: '06', image: products[11].image, count: 'Woven forms' },
  { name: 'Marble Inlay', number: '07', image: products[12].image, count: 'Stone inlay' },
  { name: 'Terracotta', number: '08', image: products[13].image, count: 'Fired clay' },
  { name: 'Bidriware', number: '09', image: products[14].image, count: 'Inlaid metalwork' },
  { name: 'Kalamkari', number: '10', image: products[15].image, count: 'Painted textiles' },
  { name: 'Handwoven Textiles', number: '11', image: products[17].image, count: 'Woven by hand' },
  { name: 'Jute & Natural Fibre', number: '12', image: products[18].image, count: 'Natural fibres' },
]

export const collections = [...furnitureCollections, ...handicraftCollections]
