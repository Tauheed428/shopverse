// src/components/layout/Hero.jsx
// Step 13: Upar ka bara banner (headline, buttons, stats, floating images)

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import { categories, products } from "../../data/mockData";
import { FREE_SHIPPING_THRESHOLD } from "../../utils/pricing";
import { formatPrice } from "../../utils/format";

const stats = [
  { value: `${products.length}+`, label: "Products" },
  { value: categories.length - 1, label: "Categories" },
  { value: formatPrice(FREE_SHIPPING_THRESHOLD), label: "Free shipping over" },
];

// Banner ke side mein float karne wali 3 images (headphones, sneakers, controller)
const showcase = [
  { product: products[0], position: "left-0 top-2 h-44 w-36 -rotate-6", delay: 0 },
  { product: products[5], position: "right-0 top-24 h-48 w-40 rotate-3", delay: 0.6 },
  { product: products[10], position: "left-10 top-56 h-36 w-44 -rotate-3", delay: 1.2 },
];

export default function Hero({ onShopNow, onTopDeals }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-brand-700 to-slate-900 px-6 py-12 text-white shadow-xl shadow-brand-500/20 sm:px-12 sm:py-16">
        {/* Peeche ke roshan gole */}
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              New season deals are live
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Discover products you’ll love
            </h1>
            <p className="mt-4 max-w-md text-base text-white/80">
              Electronics, fashion, gaming, home essentials and books, all in one
              place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                onClick={onShopNow}
                className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand-700 shadow-lg transition-transform hover:scale-105"
              >
                Shop now
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onTopDeals}
                className="flex h-12 items-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <Tag className="h-4 w-4" />
                Top deals
              </button>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-2xl font-bold">{s.value}</dt>
                  <dd className="text-xs text-white/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Floating images (sirf badi screen par) */}
          <div className="relative mx-auto hidden h-96 w-80 lg:block">
            {showcase.map(({ product, position, delay }) => (
              <motion.div
                key={product.id}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
                className={`absolute overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur ${position}`}
              >
                <img
                  src={product.images[0]}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}