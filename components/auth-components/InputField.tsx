import React from "react";

interface InputFieldProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  required?: boolean;
  fullWidth?: boolean;
  extraClasses?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  required = false,
  fullWidth = false,
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
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`block w-full ${fullWidth ? "w-full" : ""} pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 ${extraClasses}`}
      />
    </div>
  </div>
);

export default InputField;
