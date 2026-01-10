"use client";

import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(
  ({ value, onClick, placeholder, error, iconType = "calendar" }, ref) => {
    const CalendarIcon = () => (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    );

    const ClockIcon = () => (
      <svg
        className="w-5 h-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );

    return (
      <div className="relative">
        <input
          ref={ref}
          value={value || ""}
          onClick={onClick}
          readOnly
          placeholder={placeholder}
          className={`
          w-full px-4 py-2.5 pr-10 rounded-lg border
          bg-white
          text-zinc-900
          border-zinc-300
          placeholder:text-zinc-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
          cursor-pointer
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {iconType === "clock" ? <ClockIcon /> : <CalendarIcon />}
        </div>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export function DatePickerInput({
  label,
  error,
  helperText,
  className = "",
  required = false,
  selected,
  onChange,
  placeholder = "Select date",
  minDate,
  maxDate,
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        selected={selected}
        onChange={onChange}
        customInput={<CustomInput error={error} placeholder={placeholder} />}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="MM/dd/yyyy"
        className="w-full"
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}

export function TimePickerInput({
  label,
  error,
  helperText,
  className = "",
  required = false,
  selected,
  onChange,
  placeholder = "Select time",
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={
          <CustomInput
            error={error}
            placeholder={placeholder}
            iconType="clock"
          />
        }
        className="w-full"
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}

export function DateTimePickerInput({
  label,
  error,
  helperText,
  className = "",
  required = false,
  selected,
  onChange,
  placeholder = "Select date and time",
  minDate,
  maxDate,
  ...props
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeIntervals={15}
        dateFormat="MM/dd/yyyy h:mm aa"
        customInput={<CustomInput error={error} placeholder={placeholder} />}
        minDate={minDate}
        maxDate={maxDate}
        className="w-full"
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
