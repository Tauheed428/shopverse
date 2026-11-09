// src/components/checkout/Field.jsx
// Step 12: Form ka ek field (label + input/select + error message)

export default function Field({
  label,
  error,
  options, // diya jaye to <select> banega, warna <input>
  placeholder,
  className = "",
  ...inputProps
}) {
  const fieldClass = `h-11 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:ring-4 dark:bg-slate-900 dark:placeholder:text-slate-500 ${
    error
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15"
      : "border-gray-200 focus:border-brand-500 focus:ring-brand-500/15 dark:border-gray-800"
  }`;

  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>

      {options ? (
        <select
          {...inputProps}
          aria-invalid={Boolean(error)}
          className={`${fieldClass} dark:[color-scheme:dark]`}
        >
          <option value="">{placeholder ?? "Select..."}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...inputProps}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={fieldClass}
        />
      )}

      {error && <span className="mt-1 block text-xs text-rose-500">{error}</span>}
    </label>
  );
}