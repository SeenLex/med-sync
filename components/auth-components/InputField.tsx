import React from "react";

interface InputFieldProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  extraClasses?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightIcon,
  required = false,
  fullWidth = false,
  extraClasses = "",
}) => (
  <div>
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required}
      </label>
    )}
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`block w-full ${fullWidth ? "w-full" : ""} pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${extraClasses}`}
      />
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {rightIcon}
        </div>
      )}
    </div>
  </div>
);

export default InputField;
