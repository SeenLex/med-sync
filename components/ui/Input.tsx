'use client';

import React from "react";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  [x: string]: string | number | boolean | undefined;
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}{required && "*"}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  );
}
