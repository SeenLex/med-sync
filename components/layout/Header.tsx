"use client"

import React from "react";
import Link from "next/link";
import NavItem from "../navigation/NavItem";
import Button from "../ui/Button";

interface NavItemType {
  label: string;
  href: string;
  dropdown?: Array<{
    label: string;
    href: string;
  }>;
}

export default function Header() {
  const navItems: NavItemType[] = [
    {
      label: "Doctors",
      href: "/doctors",
      dropdown: [
        { label: "Find a Doctor", href: "/doctors/find" },
        { label: "By Specialty", href: "/doctors/specialties" },
        { label: "Doctor Reviews", href: "/doctors/reviews" },
      ],
    },
    {
      label: "Network",
      href: "/network",
      dropdown: [
        { label: "Hospitals", href: "/network/hospitals" },
        { label: "Clinics", href: "/network/clinics" },
        { label: "Partners", href: "/network/partners" },
      ],
    },
    {
      label: "Centers",
      href: "/centers",
      dropdown: [
        { label: "Locations", href: "/centers/locations" },
        { label: "Services", href: "/centers/services" },
        { label: "Working Hours", href: "/centers/hours" },
      ],
    },
    {
      label: "Specialties",
      href: "/specialties",
      dropdown: [
        { label: "Cardiology", href: "/specialties/cardiology" },
        { label: "Neurology", href: "/specialties/neurology" },
        { label: "All Specialties", href: "/specialties/all" },
      ],
    },
    { label: "Packages & Pricing", href: "/packages" },
    { label: "Education", href: "/education" },
    { label: "Shop", href: "/shop" },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-emerald-600">
              MedSync
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                dropdown={item.dropdown}
              />
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-emerald-600 text-sm font-medium"
            >
              Contact: 021 9268
            </Link>

            <Button href="/appointment" variant="primary">
              Book Appointment
            </Button>

            <Link 
              href="/results"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Test Results
            </Link>

            <Link 
              href="/account"
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
