import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Heart, X } from "lucide-react";
import { useShop } from "../../context/ShopContext";

const toastStyles = {
  success: { icon: CheckCircle2, color: "text-emerald-400" },
  error: { icon: XCircle, color: "text-rose-400" },
  wishlist: { icon: Heart, color: "text-pink-400" },
};

export default function Toast() {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { icon: Icon, color } =
            toastStyles[toast.type] ?? toastStyles.success;

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-xl shadow-brand-500/10 backdrop-blur-md dark:border-gray-800 dark:bg-slate-900/90 dark:text-white"
            >
              <Icon className={`h-5 w-5 shrink-0 ${color}`} />
              <p className="flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}