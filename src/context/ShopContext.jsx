// src/context/ShopContext.jsx
// Step 10 update: activePanel (cart / wishlist / checkout mein se ek time par ek hi khula)

import { createContext, useContext, useEffect, useState } from "react";

const ShopContext = createContext(null);

const MAX_QTY = 10; // ek item ki max quantity

// Same product ke alag color/size alag cart items hain, isliye har item ki apni "key"
const makeKey = (id, color, size) => `${id}|${color ?? ""}|${size ?? ""}`;

// Purane saved cart items (jin mein key nahi thi) ko bhi theek kar do
const withKey = (item) => ({
  ...item,
  key: item.key ?? makeKey(item.id, item.color, item.size),
});

// localStorage se data parhne ka safe helper (refresh par data bacha rahe)
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  // ---------- STATE ----------
  // cart item = { ...product, key, color, size, qty }
  const [cart, setCart] = useState(() =>
    loadFromStorage("shopverse-cart", []).map(withKey)
  );
  // wishlist = sirf product ids ki list  ->  [1, 6, 12]
  const [wishlist, setWishlist] = useState(() =>
    loadFromStorage("shopverse-wishlist", [])
  );
  // toast = { id, message, type }
  const [toasts, setToasts] = useState([]);
  // Jo product details modal mein khula hai (null = modal band)
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Kaunsa panel khula hai: null | "cart" | "wishlist" | "checkout"
  const [activePanel, setActivePanel] = useState(null);

  // ---------- SAVE TO LOCALSTORAGE ----------
  useEffect(() => {
    localStorage.setItem("shopverse-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shopverse-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ---------- TOASTS ----------
  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  // type: "success" | "error" | "wishlist"
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 2500); // 2.5 sec baad khud hat jaye
  };

  // ---------- PRODUCT MODAL ----------
  const openProduct = (product) => setSelectedProduct(product);
  const closeProduct = () => setSelectedProduct(null);

  // ---------- PANELS (cart / wishlist / checkout) ----------
  const openPanel = (name) => setActivePanel(name);
  const closePanel = () => setActivePanel(null);

  // ---------- CART ACTIONS ----------
  // options = { color, size, qty }  (na diye jayein to pehla color/size aur qty 1)
  const addToCart = (product, options = {}) => {
    if (!product.inStock) {
      showToast(`${product.name} is out of stock`, "error");
      return;
    }

    const color = options.color ?? product.colors[0] ?? null;
    const size = options.size ?? product.sizes[0] ?? null;
    const qty = options.qty ?? 1;
    const key = makeKey(product.id, color, size);

    const existing = cart.find((item) => item.key === key);

    if (existing && existing.qty >= MAX_QTY) {
      showToast(`Maximum ${MAX_QTY} units allowed per item`, "error");
      return;
    }

    setCart((prev) =>
      existing
        ? prev.map((item) =>
            item.key === key
              ? { ...item, qty: Math.min(item.qty + qty, MAX_QTY) }
              : item
          )
        : [...prev, { ...product, key, color, size, qty: Math.min(qty, MAX_QTY) }]
    );
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (key) => {
    const item = cart.find((i) => i.key === key);
    setCart((prev) => prev.filter((i) => i.key !== key));
    if (item) showToast(`${item.name} removed from cart`, "error");
  };

  const increaseQty = (key) => {
    const item = cart.find((i) => i.key === key);
    if (!item) return;
    if (item.qty >= MAX_QTY) {
      showToast(`Maximum ${MAX_QTY} units allowed per item`, "error");
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decreaseQty = (key) => {
    const item = cart.find((i) => i.key === key);
    if (!item) return;
    if (item.qty === 1) {
      removeFromCart(key); // qty 1 se kam ho to item hata do
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: i.qty - 1 } : i))
    );
  };

  const clearCart = () => setCart([]); // checkout ke baad bhi kaam aayega

  // ---------- WISHLIST ACTIONS ----------
  const isInWishlist = (id) => wishlist.includes(id);

  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist((prev) =>
      exists ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
    showToast(
      exists ? "Removed from wishlist" : `${product.name} added to wishlist`,
      exists ? "error" : "wishlist"
    );
  };

  // ---------- DERIVED VALUES (state se nikalne wali values) ----------
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const wishlistCount = wishlist.length;

  const value = {
    // data
    cart,
    wishlist,
    toasts,
    cartCount,
    cartTotal,
    wishlistCount,
    selectedProduct,
    activePanel,
    // actions
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    toggleWishlist,
    isInWishlist,
    showToast,
    removeToast,
    openProduct,
    closeProduct,
    openPanel,
    closePanel,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

// Custom hook: kisi bhi component mein  const { cart } = useShop();
// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside <ShopProvider>");
  }
  return context;
}