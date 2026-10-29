import { Tabs } from "@/shared/components/Tabs";
import { SITE } from "@/shared/constants/site";
import { formatPrice } from "@/shared/utils/format.utils";
import type { Product } from "@/types/productTypes";

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[10rem_1fr] gap-4 border-b border-slate-100 py-3 last:border-0">
    <dt className="font-semibold text-navy">{label}</dt>
    <dd>{value}</dd>
  </div>
);

export const ProductTabs = ({ product }: { product: Product }) => (
  <Tabs
    label="Product information"
    tabs={[
      {
        id: "description",
        label: "Description",
        content: (
          <div className="max-w-3xl space-y-4 leading-relaxed">
            <h2 className="text-xl font-bold text-navy">{product.name}</h2>
            <p>{product.description}</p>
            <p>
              Every product is new, sealed and covered by the manufacturer warranty. Need help choosing? Call us
              at {SITE.phone}.
            </p>
          </div>
        ),
      },
      {
        id: "information",
        label: "Information",
        content: (
          <dl className="max-w-xl">
            <InfoRow label="Weight" value={`${product.weightKg} kg`} />
            <InfoRow label="Dimensions" value={product.dimensions} />
            <InfoRow label="Product year" value={String(product.year)} />
            <InfoRow label="Product manual" value={product.manual} />
            <InfoRow label="Refundable" value={product.refundPolicy} />
          </dl>
        ),
      },
      {
        id: "shipping",
        label: "Shipping & Returns",
        content: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Free shipping on orders over {formatPrice(SITE.freeShippingFrom)}, otherwise {formatPrice(SITE.shippingFee)}.</li>
            <li>Orders placed before 2 pm ship the same day.</li>
            <li>Easy returns: {product.refundPolicy.toLowerCase()} after delivery.</li>
          </ul>
        ),
      },
    ]}
  />
);
