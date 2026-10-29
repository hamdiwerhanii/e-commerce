const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const formatPrice = (value: number): string => currency.format(value);

export const formatDate = (iso: string): string => longDate.format(new Date(iso));
