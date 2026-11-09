// src/components/checkout/PaymentPreview.jsx
// Step 12: Payment UI preview (live card visual + Card / Cash on Delivery)
// NOTE: Ye sirf demo hai. Card ka koi data save ya kahin bheja nahi jata.

import { useState } from "react";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Info,
  Loader2,
  Lock,
} from "lucide-react";
import Field from "./Field";
import { formatPrice } from "../../utils/format";

const METHODS = [
  { id: "card", label: "Credit / Debit card", icon: CreditCard },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

// Typing ke dauran input ko sahi shakal dena
const formatters = {
  number: (v) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(),
  expiry: (v) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  },
  cvv: (v) => v.replace(/\D/g, "").slice(0, 4),
  name: (v) => v,
};

function validateCard(card) {
  const errors = {};

  if (card.number.replace(/\s/g, "").length !== 16)
    errors.number = "Enter a 16-digit card number";

  if (card.name.trim().length < 3) errors.name = "Enter the name on the card";

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
    errors.expiry = "Use MM/YY format";
  } else {
    const [month, year] = card.expiry.split("/").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.expiry = "This card has expired";
    }
  }

  if (!/^\d{3,4}$/.test(card.cvv)) errors.cvv = "Enter 3 or 4 digits";

  return errors;
}

// Card ki shakal jo type karte waqt live badalti hai
function CardVisual({ card }) {
  const brand = card.number.startsWith("4")
    ? "VISA"
    : /^[52]/.test(card.number)
    ? "Mastercard"
    : "";

  return (
    <div className="relative mx-auto aspect-[1.586/1] w-full max-w-sm overflow-hidden rounded-2xl bg-linear-to-br from-brand-600 via-brand-700 to-slate-900 p-5 text-white shadow-xl shadow-brand-500/25">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full bg-white/5" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="h-8 w-11 rounded-md bg-linear-to-br from-amber-200 to-amber-400" />
          <span className="text-sm font-bold italic tracking-wide">{brand}</span>
        </div>

        <p className="font-mono text-xl tracking-widest sm:text-2xl">
          {card.number || "•••• •••• •••• ••••"}
        </p>

        <div className="flex items-end justify-between text-xs">
          <div className="min-w-0">
            <p className="text-[10px] uppercase text-white/60">Card holder</p>
            <p className="truncate text-sm font-medium uppercase">
              {card.name || "Your Name"}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-white/60">Expires</p>
            <p className="text-sm font-medium">{card.expiry || "MM/YY"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPreview({
  method,
  onMethodChange,
  card,
  onCardChange,
  onBack,
  onPlaceOrder,
  processing,
  total,
}) {
  const [touched, setTouched] = useState({});
  const errors = method === "card" ? validateCard(card) : {};

  const fieldProps = (name) => ({
    name,
    value: card[name],
    onChange: (e) => onCardChange(name, formatters[name](e.target.value)),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: touched[name] ? errors[name] : undefined,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (processing) return;

    if (Object.keys(errors).length > 0) {
      setTouched({ number: true, name: true, expiry: true, cvv: true });
      return;
    }
    onPlaceOrder();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-5 sm:p-6">
      <h2 className="text-xl font-bold">Payment</h2>

      {/* Demo notice */}
      <div className="flex gap-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Demo only: don’t enter real card details. Nothing is charged or saved.
          For testing, use <span className="font-mono">4242 4242 4242 4242</span>.
        </p>
      </div>

      {/* Payment method */}
      <div className="grid gap-3 sm:grid-cols-2">
        {METHODS.map(({ id, label, icon: Icon }) => {
          const active = method === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onMethodChange(id)}
              aria-pressed={active}
              className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left text-sm font-semibold transition-colors ${
                active
                  ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  : "border-gray-200 hover:border-brand-400 dark:border-gray-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </div>

      {method === "card" ? (
        <>
          <CardVisual card={card} />

          <Field
            label="Card number"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            autoComplete="off"
            {...fieldProps("number")}
          />
          <Field
            label="Name on card"
            placeholder="As printed on the card"
            autoComplete="off"
            {...fieldProps("name")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Expiry date"
              inputMode="numeric"
              placeholder="MM/YY"
              autoComplete="off"
              {...fieldProps("expiry")}
            />
            <Field
              label="CVV"
              type="password"
              inputMode="numeric"
              placeholder="•••"
              autoComplete="off"
              {...fieldProps("cvv")}
            />
          </div>
        </>
      ) : (
        <p className="rounded-xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Pay in cash when your order arrives. Please keep the exact amount ready.
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          disabled={processing}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 text-sm font-semibold transition-colors hover:border-brand-400 hover:text-brand-600 disabled:opacity-50 dark:border-gray-800 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={processing}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              {method === "card" ? `Pay ${formatPrice(total)}` : "Place Order"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}