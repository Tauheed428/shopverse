// src/components/cart/CartItem.jsx
// Step 10: Cart ki ek line (image, naam, variant, +/- , total, remove)

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageOff, Minus, Plus, Trash2 } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { formatPrice } from "../../utils/format";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useShop();
  const [imgFailed, setImgFailed] = useState(false);

  // "Silver · 256GB" (jo bhi maujood ho)
  const variant = [item.color, item.size].filter(Boolean).join(" · ");

  const stepperButton =
    "flex h-8 w-8 items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-4"
    >
      {/* Thumbnail */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <ImageOff className="h-6 w-6" />
          </div>
        ) : (
          <img
            src={item.images[0]}
            alt={item.name}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
            {item.name}
          </h3>
          <button
            onClick={() => removeFromCart(item.key)}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 text-slate-400 transition-colors hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {variant && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {variant}
          </p>
        )}
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {formatPrice(item.price)} each
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity stepper */}
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => decreaseQty(item.key)}
              aria-label="Decrease quantity"
              className={stepperButton}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.qty}
            </span>
            <button
              onClick={() => increaseQty(item.key)}
              aria-label="Increase quantity"
              className={stepperButton}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Line total */}
          <span className="font-bold">{formatPrice(item.price * item.qty)}</span>
        </div>
      </div>
    </motion.li>
  );
}