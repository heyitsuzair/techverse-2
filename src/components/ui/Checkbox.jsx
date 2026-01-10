export function Checkbox({
  label,
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
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-primary border-zinc-300 rounded focus:outline-none focus:ring-0 cursor-pointer accent-primary"
        {...props}
      />
      {label && <span className="text-sm text-zinc-700">{label}</span>}
    </label>
  );
}

export function CheckboxGroup({
  label,
  options = [],
  values = [],
  onChange,
  className = "",
  error,
  helperText,
  required = false,
}) {
  const handleChange = (optionValue, checked) => {
    if (checked) {
      onChange?.([...values, optionValue]);
    } else {
      onChange?.(values.filter((v) => v !== optionValue));
    }
  };

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
          <Checkbox
            key={option.value}
            label={option.label}
            checked={values.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
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
