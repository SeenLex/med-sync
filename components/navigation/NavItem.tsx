'use client';

import React, { useState } from "react";
import Link from "next/link";
import DropdownMenu from "./DropdownMenu";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItemProps {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

export default function NavItem({ label, href, dropdown }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {dropdown ? (
        <button
          className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {label}
          {isOpen && <DropdownMenu items={dropdown} />}
        </button>
      ) : (
        <Link href={href} className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">
          {label}
        </Link>
      )}
    </div>
  );
}
