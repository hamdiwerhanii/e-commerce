import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

import { useCart } from "@/modules/cart/hooks/useCart";
import { PriceTag } from "@/modules/products/components/PriceTag";
import { Rating } from "@/modules/products/components/Rating";
import { discountPercent } from "@/modules/products/utils/products.utils";
import { WishlistButton } from "@/modules/wishlist/components/WishlistButton";
import { Button } from "@/shared/components/Button";
import type { Product } from "@/types/productTypes";

type ProductCardProps = {
  product: Product;
  headingLevel?: 2 | 3;
};

export const ProductCard = ({ product, headingLevel = 3 }: ProductCardProps) => {
  const cart = useCart();
  const discount = discountPercent(product);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-card">
      {discount > 0 && (
        <span className="absolute top-4 left-4 z-10 grid size-12 place-items-center rounded-full bg-brand text-sm font-bold text-white">
          -{discount}%
        </span>
      )}
      <WishlistButton product={product} className="absolute top-3 right-3 z-10 shadow-card" />

      <Link to={`/products/${product.id}`} className="block" tabIndex={-1} aria-hidden>
        <img
          src={product.image}
          alt=""
          loading="lazy"
          width={240}
          height={240}
          className="mx-auto aspect-square w-full max-w-60 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <Heading className="mt-3 text-lg font-semibold tracking-tight text-navy">
        <Link to={`/products/${product.id}`} className="hover:text-brand">
          {product.name}
        </Link>
      </Heading>
      <Rating value={product.rating} className="my-2" />
      <PriceTag product={product} />

      <Button size="sm" className="mt-4 w-full" onClick={() => cart.add(product)}>
        <ShoppingCart aria-hidden className="size-4" />
        Add to cart
        <span className="sr-only">: {product.name}</span>
      </Button>
    </article>
  );
};
