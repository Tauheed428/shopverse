// src/utils/format.js
// Step 10 update: poori raqam ho to "$249", paise hon to "$29.43" (hamesha 2 decimals)

const wholeFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const centsFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPrice = (amount) =>
  Number.isInteger(amount)
    ? wholeFormatter.format(amount)
    : centsFormatter.format(amount);