// src/components/checkout/OrderSummary.jsx
// Step 12: Checkout ke saath wala Order summary (items + totals)

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/format";
import CartSummary from "../cart/CartSummary";

// Ek chhoti line (thumbnail, naam, variant, qty, total)
function SummaryItem({ item }) {
  const [imgFailed, setImgFailed] = useState(false);
  const variant = [item.color, item.size].filter(Boolean).join(" · ");

  return (
    <li className="flex items-center gap-3 py-3">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-5 w-5" />
          </div>
        ) : (
          <img
            src={item.images[0]}
            alt={item.name}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-bl-lg bg-slate-900/80 px-1 text-[11px] font-bold text-white">
          {item.qty}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
        {variant && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{variant}</p>
        )}
      </div>

      <span className="text-sm font-semibold">
        {formatPrice(item.price * item.qty)}
      </span>
    </li>
  );
}

export default function OrderSummary() {
  const { cart, cartTotal } = useShop();

  return (
    <aside className="card p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold">Order summary</h2>

      <ul className="mt-2 divide-y divide-gray-100 dark:divide-gray-800">
        {cart.map((item) => (
          <SummaryItem key={item.key} item={item} />
        ))}
      </ul>

      <div className="mt-3 border-t border-gray-200 pt-4 dark:border-gray-800">
        <CartSummary subtotal={cartTotal} />
      </div>
    </aside>
  );
}