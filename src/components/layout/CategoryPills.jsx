import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { categories, products } from "../../data/mockData";
import { categoryIcons } from "../../utils/categoryIcons";

const counts = products.reduce(
  (acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  },
  { all: products.length }
);

export default function CategoryPills({ category, onCategoryChange }) {
  const containerRef = useRef(null);
  const itemRefs = useRef({});

  // Active pill ko strip ke beech mein scroll karo
  useEffect(() => {
    const container = containerRef.current;
    const item = itemRefs.current[category];
    if (!container || !item) return;

    container.scrollTo({
      left: item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2,
      behavior: "smooth",
    });
  }, [category]);

  return (
    <nav aria-label="Product categories" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div
        ref={containerRef}
        className="no-scrollbar relative flex snap-x gap-2 overflow-x-auto py-3"
      >
        {categories.map((c) => {
          const Icon = categoryIcons[c.icon];
          const isActive = c.id === category;

          return (
            <motion.button
              key={c.id}
              ref={(el) => {
                itemRefs.current[c.id] = el;
              }}
              onClick={() => onCategoryChange(c.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex shrink-0 snap-center items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive
                  ? "border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                  : "border-gray-200 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              {c.name}
              <span className="text-xs opacity-70">{counts[c.id]}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}