import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(3, "Enter your full name").max(80, "Name is too long"),
  email: z.email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{8,20}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your street address").max(120, "Address is too long"),
  city: z.string().trim().min(2, "Enter your city").max(60, "City is too long"),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9\s-]{3,10}$/, "Enter a valid postal code"),
  paymentMethod: z.enum(["card-on-delivery", "cash-on-delivery"], {
    error: "Choose a payment method",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
