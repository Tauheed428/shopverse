// src/components/cart/CartSummary.jsx
// Step 10: Subtotal, shipping, tax aur total (Checkout mein bhi dobara use hoga)

import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import { formatPrice } from "../../utils/format";
import {
  FREE_SHIPPING_THRESHOLD,
  TAX_RATE,
  getOrderTotals,
} from "../../utils/pricing";

export default function CartSummary({ subtotal }) {
  const { shipping, tax, total } = getOrderTotals(subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="space-y-4">
      {/* Free shipping progress */}
      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
        <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <Truck className="h-4 w-4" />
          You’ve unlocked free shipping
        </p>
      ) : (
        <div>
          <p className="text-sm">
            Add{" "}
            <span className="font-semibold">
              {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)}
            </span>{" "}
            more for free shipping
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-full bg-brand-600"
            />
          </div>
        </div>
      )}

      {/* Price rows */}
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">Shipping</dt>
          <dd className="font-medium">
            {shipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500 dark:text-slate-400">
            Estimated tax ({TAX_RATE * 100}%)
          </dt>
          <dd className="font-medium">{formatPrice(tax)}</dd>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 text-base dark:border-gray-800">
          <dt className="font-semibold">Total</dt>
          <dd className="text-lg font-bold">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}