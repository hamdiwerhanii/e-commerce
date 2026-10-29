import { ProductCard } from "@/modules/products/components/ProductCard";
import type { Product } from "@/types/productTypes";

type ProductGridProps = {
  products: Product[];
  headingLevel?: 2 | 3;
};

export const ProductGrid = ({ products, headingLevel }: ProductGridProps) => (
  <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} headingLevel={headingLevel} />
      </li>
    ))}
  </ul>
);
