import headphones from "@/assets/images/products/playstation-headset.jpg";
import laptops from "@/assets/images/products/white-laptop.jpg";
import gaming from "@/assets/images/products/playstation-5.jpg";
import phones from "@/assets/images/products/android-phone.jpg";
import tablets from "@/assets/images/products/tablet-x5.jpg";
import watches from "@/assets/images/products/black-sports-watch.jpg";
import type { Category } from "@/types/productTypes";

export const CATEGORIES: Category[] = [
  { slug: "headphones", name: "Headphones", image: headphones },
  { slug: "smart-phones", name: "Smart Phones", image: phones },
  { slug: "laptops", name: "Laptops", image: laptops },
  { slug: "smart-watches", name: "Smart Watches", image: watches },
  { slug: "tablets", name: "Tablets", image: tablets },
  { slug: "gaming", name: "Gaming", image: gaming },
];
