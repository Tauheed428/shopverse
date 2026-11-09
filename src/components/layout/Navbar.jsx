// src/components/layout/Navbar.jsx
// Step 4: Sticky glass Navbar (search + category dropdown + badges)

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { categories } from "../../data/mockData";
import { categoryIcons } from "../../utils/categoryIcons";
import { useShop } from "../../context/ShopContext";
import ThemeToggle from "../ui/ThemeToggle";

// Cart / Wishlist icon buttons ki common styling
const iconButtonClass =
  "relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-brand-400";

// ---------- 1. BADGE (live counter) ----------
function Badge({ count }) {
  if (count === 0) return null;

  return (
    <motion.span
      key={count} // count badalne par naya element banta hai, isliye animation dobara chalti hai
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white ring-2 ring-white dark:ring-slate-900"
    >
      {count > 99 ? "99+" : count}
    </motion.span>
  );
}

// ---------- 2. SEARCH BAR ----------
function SearchBar({ value, onChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="h-10 w-full rounded-full border border-gray-200 bg-white/80 pl-10 pr-10 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-gray-800 dark:bg-slate-900/80 dark:placeholder:text-slate-500"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// ---------- 3. CATEGORY DROPDOWN ----------
function CategoryDropdown({ category, onCategoryChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Bahar click karne ya Escape dabane par dropdown band ho jaye
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const active = categories.find((c) => c.id === category) ?? categories[0];
  const ActiveIcon = categoryIcons[active.icon];

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:border-brand-400 dark:border-gray-800 dark:bg-slate-900"
      >
        <ActiveIcon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        {active.id === "all" ? "All Categories" : active.name}
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-12 w-56 overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl shadow-brand-500/10 dark:border-gray-800 dark:bg-slate-900"
          >
            {categories.map((c) => {
              const Icon = categoryIcons[c.icon];
              const isActive = c.id === category;

              return (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      onCategoryChange(c.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1">{c.name}</span>
                    {isActive && <Check className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------- 4. MAIN NAVBAR ----------
export default function Navbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}) {
  const { cartCount, wishlistCount, openPanel } = useShop();

  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight">
            Shop<span className="text-brand-600 dark:text-brand-400">verse</span>
          </span>
        </a>

        {/* Category dropdown + Search (desktop) */}
        <CategoryDropdown
          category={category}
          onCategoryChange={onCategoryChange}
        />
        <SearchBar
          value={search}
          onChange={onSearchChange}
          className="mx-2 hidden flex-1 md:block"
        />

        {/* Right side: theme, wishlist, cart */}
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />

          <button aria-label="Wishlist" onClick={() => openPanel("wishlist")} className={iconButtonClass}>
            <Heart className="h-5 w-5" />
            <Badge count={wishlistCount} />
          </button>

          <button aria-label="Cart" onClick={() => openPanel("cart")} className={iconButtonClass}>
            <ShoppingCart className="h-5 w-5" />
            <Badge count={cartCount} />
          </button>
        </div>
      </div>

      {/* Search bar (mobile par neeche alag row mein) */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar value={search} onChange={onSearchChange} />
      </div>
    </header>
  );
}