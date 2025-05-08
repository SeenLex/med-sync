import React from "react";

interface ServiceItemProps {
  children: React.ReactNode;
}

export default function ServiceItem({ children }: ServiceItemProps) {
  return (
    <li className="flex items-start">
      <svg
        className="h-6 w-6 text-emerald-500 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}