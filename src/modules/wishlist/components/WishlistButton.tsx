import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { useWishlist } from "@/modules/wishlist/hooks/useWishlist";
import type { Product } from "@/types/productTypes";

type WishlistButtonProps = {
  product: Product;
  className?: string;
};

export const WishlistButton = ({ product, className }: WishlistButtonProps) => {
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);

  return (
    <button
      type="button"
      onClick={() => wishlist.toggle(product)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      className={cn(
        "grid size-11 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        saved ? "bg-pink-50 text-pink-600" : "bg-white text-navy hover:text-pink-600",
        className,
      )}
    >
      <Heart aria-hidden className={cn("size-5", saved && "fill-current")} />
    </button>
  );
};
