import React from "react";

interface SelectFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  extraClasses?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  value,
  onChange,
  icon,
  required = false,
  fullWidth = false,
  options,
  placeholder,
  extraClasses = "",
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700" />
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        className={`block w-full ${fullWidth ? "w-full" : ""} pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white appearance-none ${extraClasses}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

export default SelectField;
