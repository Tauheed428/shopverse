// src/components/checkout/ShippingForm.jsx
// Step 12: Shipping details form (validation ke saath)

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Field from "./Field";

const COUNTRIES = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
  "Australia",
];

// Har field ko check karta hai, galat field ka message wapas deta hai
function validateShipping(v) {
  const errors = {};
  if (v.fullName.trim().length < 3) errors.fullName = "Enter your full name";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
    errors.email = "Enter a valid email address";
  if (!/^\+?[0-9\s-]{10,15}$/.test(v.phone.trim()))
    errors.phone = "Enter a valid phone number (10-15 digits)";
  if (v.address.trim().length < 5) errors.address = "Enter your street address";
  if (v.city.trim().length < 2) errors.city = "Enter your city";
  if (!/^[A-Za-z0-9\s-]{4,10}$/.test(v.postalCode.trim()))
    errors.postalCode = "Enter a valid postal code";
  if (!v.country) errors.country = "Select your country";
  return errors;
}

export default function ShippingForm({ values, onChange, onNext }) {
  // touched: jis field ko user chhoo chuka ho, error sirf usi ka dikhao
  const [touched, setTouched] = useState({});
  const errors = validateShipping(values);

  // Har field ke liye common props (value, onChange, onBlur, error)
  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: (e) => onChange(name, e.target.value),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    error: touched[name] ? errors[name] : undefined,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      // Submit par saare fields ko "touched" maan lo, taake sab ke errors dikhein
      setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
      return;
    }
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-5 sm:p-6">
      <h2 className="text-xl font-bold">Shipping details</h2>

      <Field
        label="Full name"
        placeholder="e.g. Ali Khan"
        autoComplete="name"
        {...fieldProps("fullName")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...fieldProps("email")}
        />
        <Field
          label="Phone"
          type="tel"
          placeholder="+92 300 1234567"
          autoComplete="tel"
          {...fieldProps("phone")}
        />
      </div>

      <Field
        label="Street address"
        placeholder="House / street / area"
        autoComplete="street-address"
        {...fieldProps("address")}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Field
          label="City"
          placeholder="City"
          autoComplete="address-level2"
          {...fieldProps("city")}
        />
        <Field
          label="Postal code"
          placeholder="Postal code"
          autoComplete="postal-code"
          {...fieldProps("postalCode")}
        />
        <Field
          label="Country"
          options={COUNTRIES}
          placeholder="Select country"
          autoComplete="country-name"
          {...fieldProps("country")}
        />
      </div>

      <button
        type="submit"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-colors hover:bg-brand-700"
      >
        Continue to payment
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}