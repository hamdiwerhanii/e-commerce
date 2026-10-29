import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { PROMOS } from "@/modules/home/consts/home.constants";
import { ButtonLink } from "@/shared/components/Button";

export const PromoBanners = () => (
  <section aria-label="Offers" className="mx-4 my-24 grid gap-6 sm:mx-10 lg:grid-cols-2">
    {PROMOS.map((promo) => (
      <article
        key={promo.id}
        className={cn("flex items-center justify-between overflow-hidden rounded-3xl py-8 pl-8 sm:py-12 sm:pl-12", promo.tone)}
      >
        <div className="max-w-60">
          <p className="text-sm font-bold tracking-wide text-white uppercase">{promo.tag}</p>
          <h3 className="mt-4 text-2xl font-bold text-white sm:text-4xl">{promo.title}</h3>
          <p className="mt-5 mb-6 text-sm text-slate-200 sm:text-base">{promo.text}</p>
          <ButtonLink to={promo.to} variant="light" className="pr-3 pl-6">
            Buy Now
            <span className="grid size-8 place-items-center rounded-full bg-brand text-white">
              <Play aria-hidden className="size-4 fill-current" />
            </span>
            <span className="sr-only">: {promo.title}</span>
          </ButtonLink>
        </div>
        <img src={promo.image} alt="" loading="lazy" width={320} height={400} className="w-36 sm:w-64 lg:w-56 xl:w-72" />
      </article>
    ))}
  </section>
);
