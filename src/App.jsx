import { useMemo, useState } from "react";
import { ChevronDown, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import CategoryPills from "./components/layout/CategoryPills";
import Footer from "./components/layout/Footer";
import ProductGrid from "./components/product/ProductGrid";
import FilterDrawer from "./components/product/FilterDrawer";
import ProductModal from "./components/product/ProductModal";
import WishlistDrawer from "./components/wishlist/WishlistDrawer";
import CartDrawer from "./components/cart/CartDrawer";
import CheckoutPage from "./components/checkout/CheckoutPage";
import BackToTop from "./components/ui/BackToTop";
import Toast from "./components/ui/Toast";
import { categories, products } from "./data/mockData";
import {
  DEFAULT_FILTERS,
  SORT_OPTIONS,
  applyFilters,
  countActiveFilters,
} from "./utils/filters";

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(
    () => applyFilters(products, { search, category, filters, sort }),
    [search, category, filters, sort]
  );

  const activeCategory = categories.find((c) => c.id === category);
  const activeCount = countActiveFilters(filters);

  const resetAll = () => {
    setSearch("");
    setCategory("all");
    setFilters(DEFAULT_FILTERS);
  };

  // ---------- Scroll helpers (Hero aur Footer ke buttons ke liye) ----------
  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTopDeals = () => {
    resetAll();
    setSort("discount");
    scrollToProducts();
  };

  const handleCategorySelect = (id) => {
    setCategory(id);
    scrollToProducts();
  };

  return (
    <div className="min-h-screen">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
      />

      <Hero onShopNow={scrollToProducts} onTopDeals={handleTopDeals} />

      <CategoryPills category={category} onCategoryChange={setCategory} />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-2 sm:px-6">
        {/* id="products": Hero ke "Shop now" ka scroll target */}
        <div
          id="products"
          className="mb-5 flex scroll-mt-32 flex-wrap items-end justify-between gap-3"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {category === "all" ? "All Products" : activeCategory.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
              {search.trim() && ` for "${search.trim()}"`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="h-10 appearance-none rounded-full border border-gray-200 bg-white pl-10 pr-9 text-sm font-medium outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-gray-800 dark:bg-slate-900 dark:[color-scheme:dark]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              onClick={() => setFilterOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:hover:text-brand-400"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <ProductGrid products={filtered} onReset={resetAll} />
      </main>

      <Footer onCategorySelect={handleCategorySelect} />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        resultCount={filtered.length}
      />

      <WishlistDrawer />
      <CartDrawer />
      <ProductModal />
      <CheckoutPage />
      <BackToTop />
      <Toast />
    </div>
  );
}