import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md";
  
  const variantStyles = {
    primary: "shadow-sm text-white bg-emerald-600 hover:bg-emerald-700",
    secondary: "text-emerald-600 bg-white hover:bg-gray-50 border-emerald-600",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  };
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
