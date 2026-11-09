// src/components/product/FilterDrawer.jsx
// Step 8: Right se slide hone wala filter panel (price range + rating)

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  RATING_OPTIONS,
} from "../../utils/filters";
import { formatPrice } from "../../utils/format";

export default function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  resultCount,
}) {
  // Drawer khula ho to: Escape se band ho, aur peeche ka page scroll na ho
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Min kabhi Max se bara na ho, aur Max kabhi Min se chhota na ho
  const setMin = (value) =>
    onChange({ ...filters, minPrice: Math.min(Number(value), filters.maxPrice) });
  const setMax = (value) =>
    onChange({ ...filters, maxPrice: Math.max(Number(value), filters.minPrice) });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
        />
      )}

      {open && (
        <motion.aside
          key="panel"
          role="dialog"
          aria-label="Filters"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 space-y-8 overflow-y-auto p-5">
            {/* Price range */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Price range</h3>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
                </span>
              </div>

              <label className="text-xs text-slate-500 dark:text-slate-400">
                Minimum
              </label>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filters.minPrice}
                onChange={(e) => setMin(e.target.value)}
                className="mb-4 w-full accent-brand-600"
              />

              <label className="text-xs text-slate-500 dark:text-slate-400">
                Maximum
              </label>
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filters.maxPrice}
                onChange={(e) => setMax(e.target.value)}
                className="w-full accent-brand-600"
              />
            </section>

            {/* Rating */}
            <section>
              <h3 className="mb-3 font-semibold">Minimum rating</h3>
              <div className="flex flex-wrap gap-2">
                {RATING_OPTIONS.map((option) => {
                  const active = filters.minRating === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        onChange({ ...filters, minRating: option.value })
                      }
                      className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                          : "border-gray-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
                      }`}
                    >
                      {option.value > 0 && (
                        <Star className="h-3.5 w-3.5 fill-current" />
                      )}
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-gray-200 p-5 dark:border-gray-800">
            <button
              onClick={onReset}
              className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:hover:text-brand-400"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-[2] rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
            >
              Show {resultCount} {resultCount === 1 ? "result" : "results"}
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}