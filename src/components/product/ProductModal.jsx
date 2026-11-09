// src/components/product/ProductModal.jsx
// Step 9: Product details modal (gallery + color/size + quantity + reviews)

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  ImageOff,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { categories, getDiscount } from "../../data/mockData";
import { getRatingBreakdown, getReviews } from "../../data/reviews";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/format";

const MAX_QTY = 10; // ShopContext wali limit ke barabar

// ---------- 1. STARS ----------
function Stars({ value, className = "h-4 w-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${
            n <= Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300 dark:text-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

// ---------- 2. IMAGE GALLERY ----------
function Gallery({ product }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({}); // { 0: true } = pehli image toot gayi
  const total = product.images.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const markFailed = (i) => setFailed((f) => ({ ...f, [i]: true }));

  const arrowClass =
    "absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow backdrop-blur transition-opacity hover:text-brand-600 md:opacity-0 md:group-hover:opacity-100 dark:bg-slate-900/80 dark:text-slate-200";

  return (
    <div>
      {/* Badi image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            {failed[index] ? (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <ImageOff className="h-12 w-12" />
              </div>
            ) : (
              <img
                src={product.images[index]}
                alt={`${product.name} - view ${index + 1}`}
                onError={() => markFailed(index)}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image" className={`left-3 ${arrowClass}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Next image" className={`right-3 ${arrowClass}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-3">
        {product.images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={`aspect-square w-20 overflow-hidden rounded-xl border-2 bg-slate-100 transition-all dark:bg-slate-800 ${
              i === index
                ? "border-brand-600"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            {failed[i] ? (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <ImageOff className="h-5 w-5" />
              </div>
            ) : (
              <img
                src={src}
                alt=""
                onError={() => markFailed(i)}
                className="h-full w-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- 3. COLOR / SIZE SELECTOR ----------
function OptionPills({ label, options, selected, onSelect }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">
        {label}:{" "}
        <span className="font-normal text-slate-500 dark:text-slate-400">
          {selected}
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option === selected;

          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                  : "border-gray-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- 4. MODAL KA ANDAR WALA HISSA ----------
function ModalBody({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  const [color, setColor] = useState(product.colors[0] ?? null);
  const [size, setSize] = useState(product.sizes[0] ?? null);
  const [qty, setQty] = useState(1);

  const liked = isInWishlist(product.id);
  const discount = getDiscount(product.price, product.originalPrice);
  const saved = product.originalPrice - product.price;
  const categoryName = categories.find((c) => c.id === product.category)?.name;
  const sizeLabel =
    product.category === "fashion"
      ? "Size"
      : product.category === "books"
      ? "Format"
      : "Option";

  const reviews = getReviews(product);
  const breakdown = getRatingBreakdown(product.rating);

  return (
    <>
      <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2">
        <Gallery product={product} />

        {/* Info column */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
              {categoryName}
            </span>
            <h2 className="mt-1 text-2xl font-bold leading-tight tracking-tight">
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <Stars value={product.rating} />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 dark:text-slate-400">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                  -{discount}%
                </span>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  You save {formatPrice(saved)}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          {product.inStock ? (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              <Check className="h-3.5 w-3.5" /> In stock
            </span>
          ) : (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
              <X className="h-3.5 w-3.5" /> Out of stock
            </span>
          )}

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {product.description}
          </p>

          {/* Selectors (sirf wahi dikhte hain jo product ke paas hain) */}
          {product.colors.length > 0 && (
            <OptionPills
              label="Color"
              options={product.colors}
              selected={color}
              onSelect={setColor}
            />
          )}
          {product.sizes.length > 0 && (
            <OptionPills
              label={sizeLabel}
              options={product.sizes}
              selected={size}
              onSelect={setSize}
            />
          )}

          {/* Quantity + Add to cart + Wishlist */}
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <div className="flex h-12 items-center rounded-xl border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty === 1}
                aria-label="Decrease quantity"
                className="flex h-full w-11 items-center justify-center rounded-l-xl transition-colors hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
                disabled={qty === MAX_QTY}
                aria-label="Increase quantity"
                className="flex h-full w-11 items-center justify-center rounded-r-xl transition-colors hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, { color, size, qty })}
              disabled={!product.inStock}
              className={`flex h-12 min-w-40 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors ${
                product.inStock
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700"
                  : "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock
                ? `Add to Cart · ${formatPrice(product.price * qty)}`
                : "Out of Stock"}
            </button>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => toggleWishlist(product)}
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={liked}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 transition-colors hover:border-rose-400 dark:border-gray-800"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  liked ? "fill-rose-500 text-rose-500" : "text-slate-600 dark:text-slate-300"
                }`}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ---------- REVIEWS ---------- */}
      <section className="border-t border-gray-200 px-5 pb-8 pt-6 dark:border-gray-800 sm:px-8">
        <h3 className="text-lg font-bold">Customer reviews</h3>

        <div className="mt-5 grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Summary */}
          <div>
            <p className="text-5xl font-bold">{product.rating.toFixed(1)}</p>
            <div className="mt-2">
              <Stars value={product.rating} className="h-5 w-5" />
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Based on {product.reviewCount.toLocaleString()} reviews
            </p>

            <div className="mt-4 space-y-1.5">
              {breakdown.map(({ star, percent }) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="flex w-6 items-center gap-0.5">
                    {star}
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-slate-500 dark:text-slate-400">
                    {percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review list */}
          <ul className="space-y-5">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="border-b border-gray-100 pb-5 last:border-0 dark:border-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                    {r.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3" /> Verified purchase
                    </p>
                  </div>
                  <span className="ml-auto text-xs text-slate-400">
                    {r.daysAgo} days ago
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Stars value={r.rating} className="h-3.5 w-3.5" />
                  <span className="text-sm font-semibold">{r.title}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {r.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// ---------- 5. MAIN MODAL ----------
export default function ProductModal() {
  const { selectedProduct, closeProduct } = useShop();
  const open = Boolean(selectedProduct);

  // Modal khula ho to: Escape se band ho, aur peeche ka page scroll na ho
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closeProduct();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, closeProduct]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProduct}
          className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm"
        />
      )}

      {open && (
        <motion.div
          key="wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[61] flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
          >
            <button
              onClick={closeProduct}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow backdrop-blur transition-colors hover:text-slate-900 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <ModalBody product={selectedProduct} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}