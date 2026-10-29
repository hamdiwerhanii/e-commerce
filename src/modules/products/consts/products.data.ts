import androidPhone from "@/assets/images/products/android-phone.jpg";
import blackSportsWatch from "@/assets/images/products/black-sports-watch.jpg";
import chromeWatch from "@/assets/images/products/chrome-watch.png";
import iphone from "@/assets/images/products/iphone-14-pro.jpg";
import playstation5 from "@/assets/images/products/playstation-5.jpg";
import playstationHeadset from "@/assets/images/products/playstation-headset.jpg";
import silverLaptop from "@/assets/images/products/silver-laptop.jpg";
import tablet from "@/assets/images/products/tablet-x5.jpg";
import vrHeadset from "@/assets/images/products/vr-headset.jpg";
import whiteLaptop from "@/assets/images/products/white-laptop.jpg";
import wirelessController from "@/assets/images/products/wireless-controller.jpg";
import xboxOne from "@/assets/images/products/xbox-one.jpg";
import type { Product } from "@/types/productTypes";

const STANDARD = {
  year: 2024,
  manual: "Included in the package",
  refundPolicy: "Up to 14 days",
};

export const PRODUCTS: Product[] = [
  {
    ...STANDARD,
    id: "1",
    name: "Android Phone",
    description:
      "A fast 5G Android phone with a bright edge-to-edge display, all-day battery and a triple camera that shines in low light.",
    category: "smart-phones",
    image: androidPhone,
    price: 599,
    rating: 4.3,
    tags: ["5G", "Silver", "Wi-Fi"],
    sku: "SKU_198",
    stock: 24,
    weightKg: 0.19,
    dimensions: "15.8 × 7.4 × 0.8 cm",
  },
  {
    ...STANDARD,
    id: "2",
    name: "iPhone 14 Pro",
    description:
      "The iPhone 14 Pro brings the Dynamic Island, a 48 MP main camera and the A16 Bionic chip in a deep purple finish.",
    category: "smart-phones",
    image: iphone,
    price: 1599,
    oldPrice: 1699,
    rating: 4.8,
    tags: ["5G", "Purple", "Wi-Fi"],
    sku: "SKU_203",
    stock: 12,
    weightKg: 0.21,
    dimensions: "14.8 × 7.2 × 0.8 cm",
  },
  {
    ...STANDARD,
    id: "3",
    name: "Black Sports Watch",
    description:
      "A light sports smartwatch with heart-rate tracking, GPS workouts and a week of battery life on a single charge.",
    category: "smart-watches",
    image: blackSportsWatch,
    price: 399,
    oldPrice: 499,
    rating: 4.5,
    tags: ["GPS", "Black", "Waterproof"],
    sku: "SKU_40",
    stock: 30,
    weightKg: 0.05,
    dimensions: "4.4 × 3.8 × 1.1 cm",
  },
  {
    ...STANDARD,
    id: "4",
    name: "PlayStation Headset",
    description:
      "Wireless gaming headset with 3D audio, noise-cancelling microphones and soft cushions for long gaming sessions.",
    category: "headphones",
    image: playstationHeadset,
    price: 599,
    rating: 4.4,
    tags: ["Wireless", "Gaming", "White"],
    sku: "SKU_1192",
    stock: 18,
    weightKg: 0.3,
    dimensions: "20 × 18 × 9 cm",
  },
  {
    ...STANDARD,
    id: "5",
    name: "VR Gaming Headset",
    description:
      "An all-in-one virtual reality headset with sharp lenses, hand tracking and a huge library of games and apps.",
    category: "headphones",
    image: vrHeadset,
    price: 790,
    rating: 4.2,
    tags: ["VR", "Gaming"],
    sku: "SKU_201",
    stock: 9,
    weightKg: 0.5,
    dimensions: "19 × 10 × 14 cm",
  },
  {
    ...STANDARD,
    id: "6",
    name: "Silver Laptop",
    description:
      "A thin and quiet 14-inch laptop with a full-day battery, a crisp display and enough power for work and study.",
    category: "laptops",
    image: silverLaptop,
    price: 2399,
    rating: 4.6,
    tags: ["14 inch", "Silver", "Wi-Fi 6"],
    sku: "SKU_22",
    stock: 7,
    weightKg: 1.3,
    dimensions: "31 × 22 × 1.6 cm",
  },
  {
    ...STANDARD,
    id: "7",
    name: "White Laptop Pro",
    description:
      "A powerful 16-inch laptop for creators, with a fast processor, a color-accurate screen and plenty of ports.",
    category: "laptops",
    image: whiteLaptop,
    price: 2799,
    oldPrice: 2999,
    rating: 4.7,
    tags: ["16 inch", "White", "Wi-Fi 6"],
    sku: "SKU_197",
    stock: 5,
    weightKg: 2.1,
    dimensions: "35.6 × 24.8 × 1.7 cm",
  },
  {
    ...STANDARD,
    id: "8",
    name: "PlayStation 5",
    description:
      "Next-generation console with ultra-fast loading, ray-traced graphics and the DualSense controller included.",
    category: "gaming",
    image: playstation5,
    price: 899,
    oldPrice: 999,
    rating: 4.9,
    tags: ["Console", "White"],
    sku: "SKU_1196",
    stock: 11,
    weightKg: 4.5,
    dimensions: "39 × 26 × 10.4 cm",
  },
  {
    ...STANDARD,
    id: "9",
    name: "Xbox One",
    description:
      "A reliable home console with a large game library, 4K video streaming and online multiplayer.",
    category: "gaming",
    image: xboxOne,
    price: 499,
    oldPrice: 599,
    rating: 4.4,
    tags: ["Console", "Black"],
    sku: "SKU_199",
    stock: 14,
    weightKg: 3.2,
    dimensions: "29 × 24 × 6 cm",
  },
  {
    ...STANDARD,
    id: "10",
    name: "Wireless Controller",
    description:
      "An ergonomic wireless controller with textured grips, responsive triggers and up to 40 hours of play.",
    category: "gaming",
    image: wirelessController,
    price: 399,
    rating: 4.1,
    tags: ["Wireless", "White"],
    sku: "SKU_200",
    stock: 40,
    weightKg: 0.28,
    dimensions: "16 × 11 × 6 cm",
  },
  {
    ...STANDARD,
    id: "11",
    name: "Tablet X5",
    description:
      "A 10-inch tablet for reading, streaming and drawing, with a long-lasting battery and fast 5G connectivity.",
    category: "tablets",
    image: tablet,
    price: 699,
    rating: 4.3,
    tags: ["10 inch", "5G", "White"],
    sku: "SKU_1194",
    stock: 16,
    weightKg: 0.47,
    dimensions: "24.8 × 17.9 × 0.6 cm",
  },
  {
    ...STANDARD,
    id: "12",
    name: "Chrome Watch",
    description:
      "A classic stainless-steel smartwatch with an always-on display, notifications and contactless payments.",
    category: "smart-watches",
    image: chromeWatch,
    price: 399,
    rating: 4.0,
    tags: ["Steel", "Modern"],
    sku: "SKU_1198",
    stock: 20,
    weightKg: 0.06,
    dimensions: "4.5 × 3.8 × 1.0 cm",
  },
];
