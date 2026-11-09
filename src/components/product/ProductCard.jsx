// src/components/product/ProductCard.jsx
// Step 9 update: image ya naam par click karne se details modal khulta hai

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ImageOff, ShoppingCart, Star } from "lucide-react";
import { categories, getDiscount } from "../../data/mockData";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/format";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, openProduct } = useShop();
  const [imgFailed, setImgFailed] = useState(false); // image toot jaye to fallback

  const liked = isInWishlist(product.id);
  const discount = getDiscount(product.price, product.originalPrice);
  const categoryName = categories.find((c) => c.id === product.category)?.name;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card group flex flex-col overflow-hidden"
    >
      {/* ---------- IMAGE AREA (click = details modal) ---------- */}
      <div
        onClick={() => openProduct(product)}
        className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-10 w-10" />
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
              product.inStock ? "" : "opacity-60 grayscale"
            }`}
          />
        )}

        {/* Top-left: discount / out of stock tag */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {discount > 0 && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* Top-right: wishlist heart
            stopPropagation: heart dabane par modal na khule */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow backdrop-blur dark:bg-slate-900/80"
        >
          <motion.span
            key={String(liked)} // liked badalne par chhota pop animation
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 12 }}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                liked
                  ? "fill-rose-500 text-rose-500"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            />
          </motion.span>
        </motion.button>

        {/* Bottom: quick Add to Cart overlay
            Desktop par hover karne par neeche se upar aata hai.
            Mobile par hover nahi hota, isliye wahan hamesha dikhta hai. */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-0 bottom-0 p-3 transition-all duration-300 md:translate-y-full md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
              product.inStock
                ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700"
                : "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* ---------- DETAILS ---------- */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          {categoryName}
        </span>

        <h3 className="min-h-[2.75rem]">
          <button
            onClick={() => openProduct(product)}
            className="line-clamp-2 w-full text-left font-semibold leading-snug transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          >
            {product.name}
          </button>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-slate-500 dark:text-slate-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}