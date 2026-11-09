// src/components/cart/CartDrawer.jsx
// Step 10: Right se slide hone wala Cart drawer

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    activePanel,
    openPanel,
    closePanel,
    clearCart,
  } = useShop();

  const open = activePanel === "cart";

  // Drawer khula ho to: Escape se band ho, aur peeche ka page scroll na ho
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, closePanel]);

    const handleCheckout = () => openPanel("checkout");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePanel}
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm"
        />
      )}

      {open && (
        <motion.aside
          key="panel"
          role="dialog"
          aria-label="Shopping cart"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-slate-900"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
            <h2 className="text-lg font-bold">
              Your Cart{" "}
              {cartCount > 0 && (
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  ({cartCount} {cartCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
            <button
              onClick={closePanel}
              aria-label="Close cart"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            /* Empty state */
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                <ShoppingBag className="h-8 w-8" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
              <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                Looks like you haven’t added anything yet.
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
              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5">
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <CartItem key={item.key} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              {/* Footer */}
              <div className="space-y-4 border-t border-gray-200 p-5 dark:border-gray-800">
                <CartSummary subtotal={cartTotal} />

                <button
                  onClick={handleCheckout}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="flex w-full items-center justify-center gap-2 text-sm text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear cart
                </button>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}