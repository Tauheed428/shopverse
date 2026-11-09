// src/utils/filters.js
// Step 8: Filter + sort ka saara logic ek jagah (pure functions, UI se alag)

import { getDiscount, products } from "../data/mockData";

// ---------- PRICE SLIDER LIMITS ----------
// Sabse mehnge product ke hisaab se max nikalta hai (1499 -> 1500)
const highestPrice = Math.max(...products.map((p) => p.price));
export const PRICE_MIN = 0;
export const PRICE_MAX = Math.ceil(highestPrice / 100) * 100;
export const PRICE_STEP = 10;

// ---------- RATING OPTIONS ----------
export const RATING_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 4, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
  { value: 4.7, label: "4.7+" },
];

// ---------- SORT OPTIONS ----------
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

// Filters ki default (reset wali) halat
export const DEFAULT_FILTERS = {
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  minRating: 0,
};

// Kitne filters lage hue hain (Filters button ke badge ke liye)
export function countActiveFilters(filters) {
  let count = 0;
  if (filters.minPrice !== PRICE_MIN || filters.maxPrice !== PRICE_MAX) count++;
  if (filters.minRating > 0) count++;
  return count;
}

// Search + category + price + rating ka filter, phir sort
export function applyFilters(list, { search, category, filters, sort }) {
  const term = search.trim().toLowerCase();

  const result = list.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(term) &&
      p.price >= filters.minPrice &&
      p.price <= filters.maxPrice &&
      p.rating >= filters.minRating
  );

  // filter() ne nayi array banayi hai, isliye isko sort karna safe hai
  switch (sort) {
    case "price-asc":
      return result.sort((a, b) => a.price - b.price);
    case "price-desc":
      return result.sort((a, b) => b.price - a.price);
    case "rating":
      // rating barabar ho to jis ke reviews zyada hon wo pehle
      return result.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount
      );
    case "discount":
      return result.sort(
        (a, b) =>
          getDiscount(b.price, b.originalPrice) -
          getDiscount(a.price, a.originalPrice)
      );
    default:
      return result; // "featured": mockData wali asli tarteeb
  }
}