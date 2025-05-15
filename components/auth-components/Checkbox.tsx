import React from "react";

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  required = false,
}) => (
  <div className="flex items-center mb-4">
    <input
      id={id}
      name={id}
      type="checkbox"
      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
      checked={checked}
      onChange={onChange}
      required={required}
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
      {label}
    </label>
  </div>
);

export default Checkbox;
