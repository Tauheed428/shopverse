// src/components/checkout/CheckoutPage.jsx
// Step 12: Poori screen wala Checkout (Shipping -> Payment -> Success)

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ShoppingBag, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { getOrderTotals } from "../../utils/pricing";
import ShippingForm from "./ShippingForm";
import PaymentPreview from "./PaymentPreview";
import OrderSummary from "./OrderSummary";
import OrderSuccess from "./OrderSuccess";

const STEPS = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "success", label: "Done" },
];

const emptyShipping = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

const emptyCard = { number: "", name: "", expiry: "", cvv: "" };

// ---------- Upar ka step indicator ----------
function Stepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);

  return (
    <ol className="mx-auto flex max-w-md items-center">
      {STEPS.map((step, i) => {
        const done = i < currentIndex || current === "success";
        const active = i === currentIndex;

        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  done || active
                    ? "bg-brand-600 text-white"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`text-sm font-medium ${
                  done || active ? "" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={`mx-3 h-0.5 flex-1 rounded transition-colors ${
                  done ? "bg-brand-600" : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ---------- Checkout ka poora flow ----------
// Ye component sirf tab bante hai jab checkout khule, isliye har baar form khali se shuru hota hai
function CheckoutFlow() {
  const { cart, cartTotal, cartCount, clearCart, openPanel, closePanel } =
    useShop();

  const [step, setStep] = useState("shipping");
  const [shipping, setShipping] = useState(emptyShipping);
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState(emptyCard);
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);

  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  const total = getOrderTotals(cartTotal).total;

  // Checkout khula ho to peeche ka page scroll na ho
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Step badle to upar scroll karo
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Component hatne par timer saaf karo
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const updateShipping = (field, value) =>
    setShipping((prev) => ({ ...prev, [field]: value }));
  const updateCard = (field, value) =>
    setCard((prev) => ({ ...prev, [field]: value }));

  // Order place karne ka nakli process (1.5 second ka intezar)
  const handlePlaceOrder = () => {
    setProcessing(true);

    timerRef.current = setTimeout(() => {
      const delivery = new Date();
      delivery.setDate(delivery.getDate() + 5);

      // Order ki photo (snapshot): cart khali hone ke baad bhi success screen ko ye chahiye
      setOrder({
        id: `SV-${Math.floor(100000 + Math.random() * 900000)}`,
        total,
        itemCount: cartCount,
        method,
        name: shipping.fullName.trim(),
        address: `${shipping.address.trim()}, ${shipping.city.trim()}, ${shipping.country}`,
        delivery: delivery.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      });
      clearCart();
      setProcessing(false);
      setStep("success");
    }, 1500);
  };

  const showEmpty = step !== "success" && cart.length === 0;

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[62] overflow-y-auto bg-slate-50 dark:bg-slate-950"
    >
      {/* Header */}
      <header className="glass sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">
              Shop<span className="text-brand-600 dark:text-brand-400">verse</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {step !== "success" && (
              <button
                onClick={() => openPanel("cart")}
                className="flex h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:hover:text-brand-400"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to cart</span>
              </button>
            )}
            <button
              onClick={closePanel}
              aria-label="Close checkout"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {showEmpty ? (
          <div className="mx-auto mt-16 max-w-sm text-center">
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Add some products before checking out.
            </p>
            <button
              onClick={closePanel}
              className="mt-5 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <Stepper current={step} />

            {step === "success" ? (
              <OrderSuccess order={order} onDone={closePanel} />
            ) : (
              <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_400px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step === "shipping" ? (
                      <ShippingForm
                        values={shipping}
                        onChange={updateShipping}
                        onNext={() => setStep("payment")}
                      />
                    ) : (
                      <PaymentPreview
                        method={method}
                        onMethodChange={setMethod}
                        card={card}
                        onCardChange={updateCard}
                        onBack={() => setStep("shipping")}
                        onPlaceOrder={handlePlaceOrder}
                        processing={processing}
                        total={total}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <OrderSummary />
              </div>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
}

// ---------- Wrapper: activePanel === "checkout" ho tabhi dikhao ----------
export default function CheckoutPage() {
  const { activePanel } = useShop();

  return (
    <AnimatePresence>
      {activePanel === "checkout" && <CheckoutFlow key="checkout" />}
    </AnimatePresence>
  );
}