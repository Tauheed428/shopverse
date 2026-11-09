// src/components/layout/Footer.jsx
// Step 13: Footer (perks, category links, account links)

import {
  Headphones,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { categories } from "../../data/mockData";
import { useShop } from "../../context/ShopContext";
import { FREE_SHIPPING_THRESHOLD } from "../../utils/pricing";
import { formatPrice } from "../../utils/format";

const YEAR = new Date().getFullYear();

const perks = [
  {
    icon: Truck,
    title: "Free shipping",
    text: `On orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
  },
  { icon: RotateCcw, title: "Easy returns", text: "30-day return policy" },
  { icon: ShieldCheck, title: "Secure checkout", text: "Your data stays protected" },
  { icon: Headphones, title: "24/7 support", text: "We’re here to help" },
];

// Footer ke links ki common styling
const linkClass =
  "text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400";

export default function Footer({ onCategorySelect }) {
  const { openPanel, cartCount, wishlistCount } = useShop();

  return (
    <footer className="mt-8 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-slate-900">
      {/* Perks strip */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Shop<span className="text-brand-600 dark:text-brand-400">verse</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            A modern demo storefront with filters, cart, wishlist and a full
            checkout flow. No real orders are placed here.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Shop</h3>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id}>
                <button onClick={() => onCategorySelect(c.id)} className={linkClass}>
                  {c.id === "all" ? "All products" : c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Your account</h3>
          <ul className="space-y-2">
            <li>
              <button onClick={() => openPanel("wishlist")} className={linkClass}>
                Wishlist ({wishlistCount})
              </button>
            </li>
            <li>
              <button onClick={() => openPanel("cart")} className={linkClass}>
                Cart ({cartCount})
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-500 dark:text-slate-400 sm:flex-row sm:px-6">
          <p>© {YEAR} Shopverse. All rights reserved.</p>
          <p>Built with React, Tailwind CSS and Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}