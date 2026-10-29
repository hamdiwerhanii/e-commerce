import { zodResolver } from "@hookform/resolvers/zod";
import { type InputHTMLAttributes, useId } from "react";
import { useForm, type FieldError, type UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { checkoutSchema, type CheckoutFormValues } from "@/modules/checkout/schemas/checkoutSchema";
import { Button } from "@/shared/components/Button";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

const Field = ({ label, error, registration, className, ...props }: FieldProps) => {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-2xl border bg-white px-4 text-navy focus-visible:outline-2 focus-visible:outline-brand",
          error ? "border-red-500" : "border-slate-200",
        )}
        {...registration}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error.message}
        </p>
      )}
    </div>
  );
};

type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormValues) => void;
};

export const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "card-on-delivery" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-xl font-bold text-navy">Shipping details</legend>
        <Field label="Full name" autoComplete="name" registration={register("fullName")} error={errors.fullName} className="sm:col-span-2" />
        <Field label="Email" type="email" autoComplete="email" registration={register("email")} error={errors.email} />
        <Field label="Phone" type="tel" autoComplete="tel" registration={register("phone")} error={errors.phone} />
        <Field label="Street address" autoComplete="street-address" registration={register("address")} error={errors.address} className="sm:col-span-2" />
        <Field label="City" autoComplete="address-level2" registration={register("city")} error={errors.city} />
        <Field label="Postal code" autoComplete="postal-code" registration={register("postalCode")} error={errors.postalCode} />
      </fieldset>

      <fieldset>
        <legend className="mb-4 text-xl font-bold text-navy">Payment</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: "card-on-delivery", label: "Card on delivery" },
            { value: "cash-on-delivery", label: "Cash on delivery" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 has-checked:border-brand has-checked:bg-blue-50"
            >
              <input type="radio" value={option.value} {...register("paymentMethod")} className="size-4 accent-brand" />
              <span className="font-medium text-navy">{option.label}</span>
            </label>
          ))}
        </div>
        {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>}
        <p className="mt-3 text-sm text-slate-500">
          This is a demo store: no payment is taken and nothing is shipped.
        </p>
      </fieldset>

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        Place order
      </Button>
    </form>
  );
};
