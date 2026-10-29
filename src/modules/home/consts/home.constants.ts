import slide1 from "@/assets/images/hero/slide-1.png";
import slide2 from "@/assets/images/hero/slide-2.png";
import slide3 from "@/assets/images/hero/slide-3.png";
import news1 from "@/assets/images/news/news-1.jpg";
import news2 from "@/assets/images/news/news-2.jpg";
import news3 from "@/assets/images/news/news-3.jpg";
import news4 from "@/assets/images/news/news-4.jpg";
import news5 from "@/assets/images/news/news-5.jpg";
import ipadAir from "@/assets/images/promos/ipad-air.png";
import appleWatch from "@/assets/images/promos/apple-watch.png";

export const HERO_SLIDES = [
  { id: "iphone", image: slide1, alt: "iPhone 14 Pro in deep purple" },
  { id: "headphones", image: slide2, alt: "Wireless over-ear headphones" },
  { id: "gadgets", image: slide3, alt: "A selection of smart gadgets" },
];

export const HERO_INTERVAL_MS = 5000;

export const PROMOS = [
  {
    id: "ipad",
    tag: "Tablets",
    title: "Apple iPad Air",
    text: "A thin and light tablet with a vivid display and all-day battery, made for creativity and play.",
    image: ipadAir,
    to: "/products/11",
    tone: "bg-brand",
  },
  {
    id: "watch",
    tag: "Smart watches",
    title: "Apple Watch",
    text: "Fitness tracking, health insights and notifications, right on your wrist.",
    image: appleWatch,
    to: "/products/3",
    tone: "bg-navy",
  },
];

export const NEWS = [
  { id: "1", image: news1, title: "How to choose your next laptop", date: "2024-06-10" },
  { id: "2", image: news2, title: "Five gadgets that make home office easier", date: "2024-06-18" },
  { id: "3", image: news3, title: "Is 5G worth it in 2024?", date: "2024-07-02" },
  { id: "4", image: news4, title: "Getting started with VR gaming", date: "2024-07-21" },
  { id: "5", image: news5, title: "Smartwatch features you should actually use", date: "2024-08-05" },
];
