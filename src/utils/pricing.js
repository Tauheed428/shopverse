// src/utils/pricing.js
// Step 10: Shipping, tax aur total ka hisaab (Cart aur Checkout dono yehi use karenge)

export const FREE_SHIPPING_THRESHOLD = 100; // is se upar free shipping
export const SHIPPING_FEE = 9.99;
export const TAX_RATE = 0.08; // 8% dummy tax

// Paison ko 2 decimals tak round karta hai (0.1 + 0.2 jaisi float ki galtiyon se bachne ke liye)
const round2 = (n) => Math.round(n * 100) / 100;

export function getOrderTotals(subtotal) {
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + shipping + tax);

  return { subtotal, shipping, tax, total };
}