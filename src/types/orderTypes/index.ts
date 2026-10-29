import type { CartLine, CartTotals } from "@/types/cartTypes";

export type ShippingDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: "card-on-delivery" | "cash-on-delivery";
};

export type Order = {
  number: string;
  placedAt: string;
  shipping: ShippingDetails;
  lines: CartLine[];
  totals: CartTotals;
};

export type OrderState = {
  lastOrder: Order | null;
};
