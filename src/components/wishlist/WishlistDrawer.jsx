// src/components/wishlist/WishlistDrawer.jsx
// Step 11: Right se slide hone wala Wishlist drawer

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ImageOff, ShoppingCart, Star, Trash2, X } from "lucide-react";
import { getDiscount, products } from "../../data/mockData";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/format";

// ---------- Wishlist ki ek line ----------
function WishlistItem({ product }) {
  const { addToCart, toggleWishlist, closePanel, openProduct } = useShop();
  const [imgFailed, setImgFailed] = useState(false);
  const discount = getDiscount(product.price, product.originalPrice);

  // Drawer band karo, phir details modal kholo
  const showDetails = () => {
    closePanel();
    openProduct(product);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4"
    >
      {/* Thumbnail */}
      <button
        onClick={showDetails}
        aria-label={`View ${product.name}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800"
      >
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-6 w-6" />
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover ${
              product.inStock ? "" : "opacity-60 grayscale"
            }`}
          />
        )}
      </button>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            <button
              onClick={showDetails}
              className="text-left transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              {product.name}
            </button>
          </h3>
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={`Remove ${product.name} from wishlist`}
            className="shrink-0 text-slate-400 transition-colors hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-slate-500 dark:text-slate-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-bold">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-xs font-semibold text-rose-500">
                -{discount}%
              </span>
            </>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className={`mt-auto flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors ${
            product.inStock
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
          }`}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </motion.li>
  );
}

// ---------- Wishlist drawer ----------
export default function WishlistDrawer() {
  const { wishlist, activePanel, closePanel } = useShop();
  const open = activePanel === "wishlist";

  // Wishlist mein sirf ids hain, yahan unse poore products nikalte hain.
  // reverse(): jo sabse baad mein add hua wo sabse upar.
  const saved = [...wishlist]
    .reverse()
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  // Drawer khula ho to: Escape se band ho, aur peeche ka page scroll na ho
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, closePanel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePanel}
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
        />
      )}

      {open && (
        <motion.aside
          key="panel"
          role="dialog"
          aria-label="Wishlist"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-bold">
              Wishlist{" "}
              {saved.length > 0 && (
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  ({saved.length} {saved.length === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
            <button
              onClick={closePanel}
              aria-label="Close wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {saved.length === 0 ? (
            /* Empty state */
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 dark:bg-rose-500/15">
                <Heart className="h-8 w-8" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">
                Your wishlist is empty
              </h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                Tap the heart on any product to save it here for later.
              </p>
              <button
                onClick={closePanel}
                className="mt-5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence initial={false}>
                  {saved.map((product) => (
                    <WishlistItem key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}