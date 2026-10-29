import { Check, CircleCheck, ShoppingCart } from "lucide-react";
import { useState } from "react";

import { categoriesApi } from "@/api/products.api";
import { QuantityStepper } from "@/modules/cart/components/QuantityStepper";
import { useCart } from "@/modules/cart/hooks/useCart";
import { PriceTag } from "@/modules/products/components/PriceTag";
import { Rating } from "@/modules/products/components/Rating";
import { discountPercent } from "@/modules/products/utils/products.utils";
import { WishlistButton } from "@/modules/wishlist/components/WishlistButton";
import { Button } from "@/shared/components/Button";
import { SITE } from "@/shared/constants/site";
import { formatPrice } from "@/shared/utils/format.utils";
import type { Product } from "@/types/productTypes";

const PERKS = [
  `Free shipping on all orders over ${formatPrice(SITE.freeShippingFrom)}`,
  "14 days easy refund & returns",
  "Product taxes and customs duties included",
];

export const ProductDetails = ({ product }: { product: Product }) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const discount = discountPercent(product);
  const category = categoriesApi.getBySlug(product.category);

  return (
    <section className="mx-4 mt-16 grid gap-10 sm:mx-10 md:grid-cols-2 md:gap-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200">
        {discount > 0 && (
          <span className="absolute top-4 left-4 z-10 grid size-12 place-items-center rounded-full bg-brand text-sm font-bold text-white">
            -{discount}%
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          width={640}
          height={640}
          className="aspect-square w-full object-contain transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="text-center md:text-start">
        <h1 className="text-3xl font-bold text-brand md:text-4xl">{product.name}</h1>
        <div className="mt-3 flex flex-col items-center gap-2 md:items-start">
          <Rating value={product.rating} />
          <PriceTag product={product} large />
        </div>
        <p className="my-6 leading-relaxed text-slate-500">{product.description}</p>

        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity of ${product.name}`} />
          <Button onClick={() => cart.add(product, quantity)}>
            <ShoppingCart aria-hidden className="size-5" />
            Add to cart
          </Button>
          <WishlistButton product={product} className="bg-slate-100" />
        </div>

        <dl className="my-8 space-y-2 border-y border-slate-200 py-8 text-left">
          {[
            ["Brand", "XTRA"],
            ["SKU", product.sku],
            ["Category", category?.name ?? product.category],
            ["Tags", product.tags.join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <dt className="w-24 font-bold text-navy">{label}</dt>
              <dd className="text-slate-500">{value}</dd>
            </div>
          ))}
          <div className="flex gap-4">
            <dt className="w-24 font-bold text-navy">Status</dt>
            <dd className="flex items-center gap-2 text-slate-500">
              {product.stock} in stock <Check aria-hidden className="size-4 text-green-600" />
            </dd>
          </div>
        </dl>

        <ul className="space-y-2 text-left text-slate-500">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-3">
              <CircleCheck aria-hidden className="size-5 shrink-0" />
              {perk}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
