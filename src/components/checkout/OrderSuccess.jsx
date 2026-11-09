// src/components/checkout/OrderSuccess.jsx
// Step 12: Order complete hone ke baad ki screen

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { formatPrice } from "../../utils/format";

export default function OrderSuccess({ order, onDone }) {
  const firstName = order.name.split(" ")[0];
  const isCard = order.method === "card";

  const rows = [
    { label: "Order number", value: order.id },
    {
      label: isCard ? "Total paid" : "Total to pay on delivery",
      value: formatPrice(order.total),
    },
    { label: "Payment method", value: isCard ? "Card" : "Cash on Delivery" },
    { label: "Items", value: order.itemCount },
    { label: "Ship to", value: order.address },
    { label: "Estimated delivery", value: order.delivery },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto mt-8 max-w-xl text-center"
    >
      {/* Animated check */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30"
      >
        <Check className="h-10 w-10" strokeWidth={3} />
      </motion.span>

      <h2 className="mt-6 text-3xl font-bold tracking-tight">Order placed!</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Thank you, {firstName}! This is a demo order, so no email is sent and
        nothing is charged.
      </p>

      {/* Order details */}
      <dl className="card mt-8 divide-y divide-gray-100 text-left dark:divide-gray-800">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-6 px-5 py-3.5 text-sm">
            <dt className="shrink-0 text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="text-right font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        onClick={onDone}
        className="mt-8 h-12 rounded-xl bg-brand-600 px-8 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
      >
        Continue shopping
      </button>
    </motion.div>
  );
}