// src/data/mockData.js
// Step 1: Dummy data for Shopverse

// Helper: Unsplash image URL banane ke liye (chhota code, baar baar repeat nahi)
const img = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

// ---------- CATEGORIES ----------
// "icon" ka naam Lucide icon se match karta hai (Step 5 mein use hoga)
export const categories = [
  { id: "all", name: "All", icon: "LayoutGrid" },
  { id: "electronics", name: "Electronics", icon: "Smartphone" },
  { id: "fashion", name: "Fashion", icon: "Shirt" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
  { id: "home", name: "Home Appliances", icon: "Home" },
  { id: "books", name: "Books", icon: "BookOpen" },
];

// ---------- PRODUCTS ----------
export const products = [
  // ===== ELECTRONICS (5) =====
  {
    id: 1,
    name: "Aurora Pro Wireless Headphones",
    category: "electronics",
    price: 249,
    originalPrice: 329,
    rating: 4.7,
    reviewCount: 1284,
    description:
      "Active noise cancellation, 40-hour battery life and studio-grade sound in a lightweight foldable design.",
    images: [img("1505740420928-5e560c06d30e"), img("1484704849700-f032a568e944"), img("1546435770-a3e426bf472b")],
    colors: ["Black", "Silver", "Navy"],
    sizes: [],
    inStock: true,
  },
  {
    id: 2,
    name: "Nova X Smartphone 256GB",
    category: "electronics",
    price: 699,
    originalPrice: 799,
    rating: 4.6,
    reviewCount: 2310,
    description:
      "6.7-inch OLED display, triple camera system and all-day battery with 65W fast charging.",
    images: [img("1511707171634-5f897ff02aa9"), img("1592899677977-9c10ca588bbd"), img("1598327105666-5b89351aff97")],
    colors: ["Graphite", "Ocean Blue", "Pearl"],
    sizes: ["128GB", "256GB", "512GB"],
    inStock: true,
  },
  {
    id: 3,
    name: "UltraBook Air 14 Laptop",
    category: "electronics",
    price: 1099,
    originalPrice: 1299,
    rating: 4.8,
    reviewCount: 876,
    description:
      "Thin and light 14-inch laptop with 16GB RAM, 512GB SSD and a stunning 2.8K display.",
    images: [img("1496181133206-80ce9b88a853"), img("1517336714731-489689fd1ca8"), img("1525547719571-a2d4ac8945e2")],
    colors: ["Space Gray", "Silver"],
    sizes: ["8GB/256GB", "16GB/512GB"],
    inStock: true,
  },
  {
    id: 4,
    name: "Pulse Smartwatch Series 5",
    category: "electronics",
    price: 199,
    originalPrice: 249,
    rating: 4.4,
    reviewCount: 954,
    description:
      "Heart-rate, sleep and GPS tracking with a bright always-on AMOLED display and 7-day battery.",
    images: [img("1523275335684-37898b6baf30"), img("1546868871-7041f2a55e12"), img("1508685096489-7aacd43bd3b1")],
    colors: ["Black", "Rose Gold", "Blue"],
    sizes: ["40mm", "44mm"],
    inStock: true,
  },
  {
    id: 5,
    name: "ProShot Mirrorless Camera",
    category: "electronics",
    price: 1499,
    originalPrice: 1699,
    rating: 4.9,
    reviewCount: 412,
    description:
      "24MP full-frame sensor, 4K video and lightning-fast autofocus for creators and travellers.",
    images: [img("1516035069371-29a1b244cc32"), img("1502920917128-1aa500764cbd"), img("1526170375885-4d8ecf77b99f")],
    colors: ["Black"],
    sizes: [],
    inStock: false,
  },

  // ===== FASHION (5) =====
  {
    id: 6,
    name: "Velocity Running Sneakers",
    category: "fashion",
    price: 129,
    originalPrice: 160,
    rating: 4.5,
    reviewCount: 1840,
    description:
      "Breathable knit upper with responsive foam cushioning, built for daily runs and street style.",
    images: [img("1542291026-7eec264c27ff"), img("1549298916-b41d501d3772"), img("1460353581641-37baddab0fa2")],
    colors: ["Red", "White", "Black"],
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true,
  },
  {
    id: 7,
    name: "Urban Denim Jacket",
    category: "fashion",
    price: 89,
    originalPrice: 119,
    rating: 4.3,
    reviewCount: 642,
    description:
      "Classic mid-wash denim jacket with a modern fit. Durable, comfortable and easy to layer.",
    images: [img("1551028719-00167b16eac5"), img("1576995853123-5a10305d93c0"), img("1523381210434-271e8be1f52b")],
    colors: ["Light Blue", "Dark Blue", "Black"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 8,
    name: "Aviator Polarized Sunglasses",
    category: "fashion",
    price: 59,
    originalPrice: 79,
    rating: 4.2,
    reviewCount: 389,
    description:
      "UV400 polarized lenses with a lightweight metal frame. A timeless look for every face shape.",
    images: [img("1572635196237-14b3f281503f"), img("1511499767150-a48a237f0083"), img("1473496169904-658ba7c44d8a")],
    colors: ["Gold/Green", "Silver/Blue", "Black"],
    sizes: [],
    inStock: true,
  },
  {
    id: 9,
    name: "Nomad Leather Backpack",
    category: "fashion",
    price: 149,
    originalPrice: 189,
    rating: 4.6,
    reviewCount: 521,
    description:
      "Full-grain leather backpack with padded 15-inch laptop sleeve and weather-resistant lining.",
    images: [img("1553062407-98eeb64c6a62"), img("1548036328-c9fa89d128fa"), img("1491637639811-60e2756cc1c7")],
    colors: ["Tan", "Brown", "Black"],
    sizes: [],
    inStock: true,
  },
  {
    id: 10,
    name: "Essential Cotton Hoodie",
    category: "fashion",
    price: 49,
    originalPrice: 65,
    rating: 4.4,
    reviewCount: 1120,
    description:
      "Heavyweight 100% cotton fleece hoodie with a relaxed fit and soft brushed interior.",
    images: [img("1556821840-3a63f95609a7"), img("1578768079052-aa76e52ff62e"), img("1620799140408-edc6dcb6d633")],
    colors: ["Charcoal", "Violet", "Olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },

  // ===== GAMING (5) =====
  {
    id: 11,
    name: "Phantom Wireless Controller",
    category: "gaming",
    price: 69,
    originalPrice: 89,
    rating: 4.6,
    reviewCount: 1530,
    description:
      "Ergonomic wireless controller with hall-effect sticks, adaptive triggers and 30-hour battery.",
    images: [img("1606144042614-b2417e99c4e3"), img("1600080972464-8e5f35f63d08"), img("1592840496694-26d035b52b48")],
    colors: ["Midnight", "White", "Crimson"],
    sizes: [],
    inStock: true,
  },
  {
    id: 12,
    name: "Striker RGB Mechanical Keyboard",
    category: "gaming",
    price: 119,
    originalPrice: 149,
    rating: 4.7,
    reviewCount: 986,
    description:
      "Hot-swappable mechanical switches, per-key RGB lighting and a durable aluminium frame.",
    images: [img("1587829741301-dc798b83add3"), img("1595225476474-87563907a212"), img("1541140532154-b024d705b90a")],
    colors: ["Black", "White"],
    sizes: ["Red Switch", "Blue Switch", "Brown Switch"],
    inStock: true,
  },
  {
    id: 13,
    name: "Viper 12K Gaming Mouse",
    category: "gaming",
    price: 59,
    originalPrice: 79,
    rating: 4.5,
    reviewCount: 1275,
    description:
      "Ultra-light 58g wireless mouse with a 12,000 DPI sensor and 70-hour battery life.",
    images: [img("1527864550417-7fd91fc51a46"), img("1615663245857-ac93bb7c39e7"), img("1563297007-0686b7003af7")],
    colors: ["Black", "White"],
    sizes: [],
    inStock: true,
  },
  {
    id: 14,
    name: "Titan Gaming Headset 7.1",
    category: "gaming",
    price: 99,
    originalPrice: 129,
    rating: 4.3,
    reviewCount: 702,
    description:
      "7.1 surround sound, detachable noise-cancelling mic and plush memory-foam ear cushions.",
    images: [img("1618366712010-f4ae9c647dcb"), img("1599669454699-248893623440"), img("1583394838336-acd977736f90")],
    colors: ["Black/Red", "Black/Blue"],
    sizes: [],
    inStock: true,
  },
  {
    id: 15,
    name: "Apex Pro Gaming Monitor 27\"",
    category: "gaming",
    price: 329,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 348,
    description:
      "27-inch QHD IPS panel with 165Hz refresh rate, 1ms response time and HDR support.",
    images: [img("1527443224154-c4a3942d3acf"), img("1593640408182-31c70c8268f5"), img("1547394765-185e1e68f34e")],
    colors: ["Black"],
    sizes: ['24"', '27"', '32"'],
    inStock: false,
  },

  // ===== HOME APPLIANCES (5) =====
  {
    id: 16,
    name: "BrewMaster Espresso Machine",
    category: "home",
    price: 279,
    originalPrice: 349,
    rating: 4.7,
    reviewCount: 604,
    description:
      "15-bar pump espresso machine with built-in grinder and steam wand for barista-style coffee.",
    images: [img("1517668808822-9ebb02f2a0e6"), img("1495474472287-4d71bcdd2085"), img("1510017803434-a899398421b3")],
    colors: ["Stainless Steel", "Matte Black"],
    sizes: [],
    inStock: true,
  },
  {
    id: 17,
    name: "BlendX Power Blender 1200W",
    category: "home",
    price: 89,
    originalPrice: 119,
    rating: 4.4,
    reviewCount: 835,
    description:
      "1200W motor with 6 stainless blades. Crushes ice and blends smoothies in seconds.",
    images: [img("1570222094114-d054a817e56b"), img("1585515320310-259814833e62"), img("1622480916113-9000ac49b79d")],
    colors: ["Black", "Red"],
    sizes: ["1.5L", "2L"],
    inStock: true,
  },
  {
    id: 18,
    name: "AirFry Digital Air Fryer 5L",
    category: "home",
    price: 99,
    originalPrice: 139,
    rating: 4.6,
    reviewCount: 2105,
    description:
      "Cook crispy meals with up to 90% less oil. 8 presets, digital touch screen, dishwasher-safe basket.",
    images: [img("1626509653291-18d9a934b9db"), img("1585515320310-259814833e62"), img("1556910103-1c02745aae4d")],
    colors: ["Black", "White"],
    sizes: ["3.5L", "5L", "7L"],
    inStock: true,
  },
  {
    id: 19,
    name: "RoboClean Smart Vacuum",
    category: "home",
    price: 249,
    originalPrice: 329,
    rating: 4.5,
    reviewCount: 1432,
    description:
      "Laser navigation, app control and 3000Pa suction. Vacuums and mops on a single charge.",
    images: [img("1558317374-067fb5f30001"), img("1527515637462-cff94eecc1ac"), img("1585771724684-38269d6639fd")],
    colors: ["White", "Graphite"],
    sizes: [],
    inStock: true,
  },
  {
    id: 20,
    name: "Lumina Smart LED Lamp",
    category: "home",
    price: 39,
    originalPrice: 55,
    rating: 4.3,
    reviewCount: 468,
    description:
      "Wi-Fi smart lamp with 16 million colors, voice control and customizable lighting scenes.",
    images: [img("1507473885765-e6ed057f782c"), img("1513506003901-1e6a229e2d15"), img("1540932239986-30128078f3c5")],
    colors: ["White", "Black", "Brass"],
    sizes: [],
    inStock: true,
  },

  // ===== BOOKS (4) =====
  {
    id: 21,
    name: "The Pragmatic Developer",
    category: "books",
    price: 34,
    originalPrice: 45,
    rating: 4.8,
    reviewCount: 3120,
    description:
      "Practical, timeless advice on writing clean code, learning faster and growing as a software engineer.",
    images: [img("1544947950-fa07a98d237f"), img("1512820790803-83ca734da794"), img("1481627834876-b7833e8f5570")],
    colors: [],
    sizes: ["Paperback", "Hardcover", "E-book"],
    inStock: true,
  },
  {
    id: 22,
    name: "Atomic Habits Mindset",
    category: "books",
    price: 18,
    originalPrice: 26,
    rating: 4.9,
    reviewCount: 8450,
    description:
      "A proven framework for building good habits and breaking bad ones, one small change at a time.",
    images: [img("1589829085413-56de8ae18c73"), img("1495446815901-a7297e633e8d"), img("1497633762265-9d179a990aa6")],
    colors: [],
    sizes: ["Paperback", "Hardcover", "E-book"],
    inStock: true,
  },
  {
    id: 23,
    name: "Deep Work: Focus in a Noisy World",
    category: "books",
    price: 22,
    originalPrice: 30,
    rating: 4.6,
    reviewCount: 2760,
    description:
      "Rules for focused success. Learn to master hard things quickly and produce at an elite level.",
    images: [img("1516979187457-637abb4f9353"), img("1543002588-bfa74002ed7e"), img("1524995997946-a1c2e315a42f")],
    colors: [],
    sizes: ["Paperback", "E-book"],
    inStock: true,
  },
  {
    id: 24,
    name: "Midnight Library Collection",
    category: "books",
    price: 29,
    originalPrice: 39,
    rating: 4.5,
    reviewCount: 1890,
    description:
      "A bestselling box set of three novels exploring choices, regrets and the lives we might have lived.",
    images: [img("1507842217343-583bb7270b66"), img("1519682337058-a94d519337bc"), img("1476275466078-4007374efbbe")],
    colors: [],
    sizes: ["Box Set", "E-book"],
    inStock: true,
  },
];

// ---------- HELPERS ----------
// Discount % nikalne ke liye (ProductCard ke tag mein use hoga)
export const getDiscount = (price, originalPrice) =>
  originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;