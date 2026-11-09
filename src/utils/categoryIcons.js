// src/utils/categoryIcons.js
// mockData.js mein icon ka sirf naam (string) hai, jaise "Smartphone".
// Ye file us naam ko asli Lucide icon se jorti hai.
// Navbar (Step 4) aur CategoryPills (Step 5) dono isse use karenge.

import {
  LayoutGrid,
  Smartphone,
  Shirt,
  Gamepad2,
  House,
  BookOpen,
} from "lucide-react";

export const categoryIcons = {
  LayoutGrid,
  Smartphone,
  Shirt,
  Gamepad2,
  Home: House, // mockData mein naam "Home" hai, Lucide mein icon ka naam "House"
  BookOpen,
};