export function Radio({
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <label
      className={`
        flex items-center gap-2 cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-primary border-zinc-300 focus:outline-none focus:ring-0 cursor-pointer accent-primary"
        {...props}
      />
      {label && <span className="text-sm text-zinc-700">{label}</span>}
    </label>
  );
}

export function RadioGroup({
  label,
  name,
  options = [],
  value,
  onChange,
  className = "",
  error,
  helperText,
  required = false,
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
        ))}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
