import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import heroBackground from "@/assets/images/brand/hero-background.jpeg";
import { cn } from "@/lib/utils";
import { HERO_INTERVAL_MS, HERO_SLIDES } from "@/modules/home/consts/home.constants";
import { ButtonLink } from "@/shared/components/Button";

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % HERO_SLIDES.length), HERO_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured devices"
      style={{ backgroundImage: `url(${heroBackground})` }}
      className="mx-4 my-8 overflow-hidden rounded-3xl bg-navy bg-cover p-8 text-center sm:mx-10 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-20 lg:pr-0 lg:pl-20 lg:text-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="lg:w-[34rem]">
        <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl">
          Get <span className="text-blue-500">Best Device</span> With Lowest Price.
        </h1>
        <p className="mx-auto my-8 max-w-md leading-8 text-slate-400 lg:mx-0">
          Phones, laptops, watches and consoles from the brands you love, with free shipping and easy 14-day returns.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
          <ButtonLink to="/shop" className="pr-3 pl-8">
            Explore Now
            <span className="grid size-8 place-items-center rounded-full bg-brand-dark">
              <Play aria-hidden className="size-4 fill-current" />
            </span>
          </ButtonLink>
          <ButtonLink to="/shop?deals=1" variant="light" className="pr-3 pl-8">
            Today&rsquo;s deals
          </ButtonLink>
        </div>
      </div>

      <div className="relative mt-10 w-full lg:mt-0 lg:w-1/2">
        <div className="relative mx-auto aspect-[6/5.5] w-full max-w-[36rem]">
          {HERO_SLIDES.map((slide, slideIndex) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.alt}
              aria-hidden={slideIndex !== index}
              width={600}
              height={550}
              className={cn(
                "absolute inset-0 size-full object-contain transition-all duration-700 ease-in-out",
                slideIndex === index ? "scale-100 opacity-100" : "scale-95 opacity-0",
              )}
            />
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
          {HERO_SLIDES.map((slide, slideIndex) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setIndex(slideIndex)}
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index}
              className={cn(
                "size-4 cursor-pointer rounded-full transition-colors",
                slideIndex === index ? "bg-green-300" : "bg-white hover:bg-slate-300",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
