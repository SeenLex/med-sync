import React from "react";
import Link from "next/link";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownMenuProps {
  items: DropdownItem[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1">
        {items.map((item) => (
          <Link 
            key={item.label} 
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
