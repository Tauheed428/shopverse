// src/components/product/ProductGrid.jsx
// Step 7: Products ka grid + animated filtering + empty state

import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onReset }) {
  // Koi product match na kare to "No products found" dikhao
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 py-20 text-center dark:border-gray-700"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
          <SearchX className="h-8 w-8" />
        </span>
        <h3 className="mt-4 text-lg font-semibold">No products found</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          Try a different search word or pick another category.
        </p>
        <button
          onClick={onReset}
          className="mt-5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
        >
          Clear filters
        </button>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {/* AnimatePresence: jo card hat raha hai, uski exit animation chalne deta hai */}
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </div>
  );
}